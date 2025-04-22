import { db } from "../db.js";
import cloudinary from "../utils/cloudinary.js";

export const getUserByUsername = async (req,res) => {
  try {
    const {username} = req.params;

    const user = await db.query("SELECT id, email, username, avatar, bio, created_at FROM users WHERE username = $1", [username]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect username or user doesn't exist"
      })
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.log('Error at getUserByUsername:', error);
    res.status(500).send(error)
  }
}

export const editUserById = async (req,res) => {
  try {

    const {id} = req.params;
    const {email, username, bio} = req.body;

    const user = await db.query("SELECT id, email, username, avatar, bio, created_at FROM users WHERE id = $1", [id]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }

    if (!email || !username || !bio) {
      return res.json({
        message: "Provide at least one field to change."
      })
    }

    await db.query("UPDATE users SET email = $1, username = $2, bio = $3 WHERE id = $4", [email, username, bio, id])
    res.json({
      message: "Succesfully changed."
    })
  } catch (error) {
    console.log('Error at editUserById:', error);
    res.status(500).send(error)
  }
}

export const editUserAvatar = async (req,res) => {
  try {
    const {id} = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No image provided"
      })
    }
    const user = await db.query("SELECT id, email, username, avatar, bio, created_at FROM users WHERE id = $1", [id]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }

    const publicId = `avatars/user_${user.rows[0].id}_avatar`;

    if (user.rows[0].avatar !== null) {
      await cloudinary.uploader.destroy(publicId);
    }

    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: 'avatars',
        public_id: publicId,
        overwrite: true
      },
      async (err, res) => {
        if (err) return res?.status(500).json({ error: 'Cloudinary upload failed' });


        await db.query("UPDATE users SET avatar = $1 WHERE id = $2", [res?.secure_url, id])
      }
    )

    res.json({
      message: "Succesfully updated user avatar"
    })
    
  } catch (error) {
    console.log('Error at uploadUserAvatar:', error);
    res.status(500).send(error)
  }
}