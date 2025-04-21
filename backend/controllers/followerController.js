import { db } from "../db.js";

export const getUserFollowersById = async (req,res) => {
  try {

    const {user_id} = req.params;

    const user = await db.query("SELECT * FROM users WHERE id = $1", [user_id]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }

    const followers = await db.query("SELECT users.avatar, users.email FROM followers JOIN users ON users.id = followers.id WHERE followers.user_id = $1", [user_id]);

    res.json(followers.rows)

  } catch (error) {
    console.log('Error at getUserFollowersById:', error);
    res.status(500).send(error)
  }
}

export const getUserFollowingById = async (req,res) => {
  try {
    const {user_id} = req.params;

    const user = await db.query("SELECT * FROM users WHERE id = $1", [user_id]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }

    const followers = await db.query("SELECT users.avatar, users.email FROM followers JOIN users ON users.id = followers.user_id WHERE followers.user_id = $1", [user_id]);

    res.json(followers.rows)
  } catch (error) {
    console.log('Error at getUserFollowingById:', error);
    res.status(500).send(error)
  }
}