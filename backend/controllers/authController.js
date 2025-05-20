import jwt from "jsonwebtoken";
import { db } from "../db.js";
import bcryptjs from "bcryptjs";
import validator from "validator";

const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'best_secret_2025';

export const login = async (req,res) => {
  try {
    
    const { userData, password} = req.body;

    if (!userData || !password) {
      return res.status(400).json({
        message: "Fields cannot be empty!"
      })
    }

    const checkUser = await db.query("SELECT * FROM users WHERE username = $1 OR email = $1", [userData]);

    if (checkUser.rows.length <= 0) {
      return res.status(401).json({
        message: "Incorrect username/email or password!"
      })
    }

    const checkUserPassword = await bcryptjs.compare(password, checkUser.rows[0].password);

    if (!checkUserPassword) {
      return res.status(401).json({
        message: "Incorrect username/email or password!"
      })
    }

    const payload = checkUser.rows[0];
    const token = jwt.sign(payload, JWT_SECRET);

    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sevenDays,
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'Lax'
    });

    res.json({
      message: "Succesfully logged in"
    })

  } catch (error) {
    console.log('Error at login:', error);
    res.status(500).send(error)
  }
}

export const register = async (req,res) => {
  try {

    const {email, username, password, repPassword} = req.body;

    if (!email || !username || !password || !repPassword) {
      return res.status(400).json({
        message: "Fields cannot be empty!"
      })
    }

    const checkUser = await db.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        message: "User with this email or username already exists."
      })
    }

    const isPasswordStrong = validator.isStrongPassword(password, {
      minLength: 6,
      minNumbers: 1
    })

    if (password !== repPassword) {
      return res.status(400).json({
        message: "Passwords are not matching!"
      })
    }

    if (!isPasswordStrong) {
      return res.status(400).json(
        {
          message: "Weak password!"
        }
      )
    }

    const genSalt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(password, genSalt);

    const defaulAvatar = `https://res.cloudinary.com/dtsdbjvgg/image/upload/t_default-avatar/v1745933665/ChatGPT_Image_29_%D0%B0%D0%BF%D1%80._2025_%D0%B3._18_35_39_o3vfxl.png`

    const newUser = await db.query("INSERT INTO users (email, username, password, avatar) VALUES ($1, $2, $3, $4) RETURNING id, email, username, avatar, bio, created_at", [email, username, hashPassword, defaulAvatar]);

    const payload = newUser.rows[0];
    const token = jwt.sign(payload, JWT_SECRET);

    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sevenDays,
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'Lax'
    });
    
    res.json({
      message: "User created succesfully."
    })
    
  } catch (error) {
    console.log('Error at register:', error);
    res.status(500).send(error)
  }
}

export const isLogged = async (req,res) => {
  try {

    const token = req.cookies.token;

    if (!token) return res.status(401).json({
      isLogged: false
    })

    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      user: decoded,
      isLogged: true
    });
    
  } catch (error) {
    console.log('Error at isLogged:', error);
    res.status(500).send(error)
  }
}

export const logout = async (req,res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expiresIn: new Date(0),
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'Lax'
  }).send()
}