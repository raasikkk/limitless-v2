import jwt from "jsonwebtoken";
import { db } from "../db.js";
import bcryptjs from "bcryptjs";

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
    res.cookies('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sevenDays
    });

    res.json({
      message: "Succesfully logged in"
    })

  } catch (error) {
    console.log('Error at login:', error);
    res.status(500).send(error)
  }
}