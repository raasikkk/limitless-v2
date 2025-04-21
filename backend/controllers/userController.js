import { db } from "../db.js";

export const getUserByUsername = async (req,res) => {
  try {
    const {username} = req.params;

    if (!username) {
      return res.status(400).json({
        message: "Incorrect username or user doesn't exist"
      })
    }

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

    if (!id) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }
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