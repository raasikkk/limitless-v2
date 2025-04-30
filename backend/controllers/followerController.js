import { db } from "../db.js";

export const followUser = async (req,res) => {
  try {

    const {follower_id, user_id} = req.body;

    const user = await db.query("SELECT * FROM users WHERE id = $1", [user_id]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }

    await db.query("INSERT INTO followers (user_id, follower_id) VALUES ($1, $2)", [user_id, follower_id]);

    res.json({
      message: "Succesfully followed"
    })

  } catch (error) {
    console.log('Error at followUser:', error);
    res.status(500).send(error)
  }
}

export const unfollowUser = async (req,res) => {
  try {

    const {follower_id, user_id} = req.params;

    const user = await db.query("SELECT * FROM users WHERE id = $1", [user_id]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }

    await db.query("DELETE FROM followers WHERE user_id = $1 AND follower_id = $2", [user_id, follower_id]);

    res.json({
      message: "Succesfully unfollowed"
    })

  } catch (error) {
    console.log('Error at unfollowUser:', error);
    res.status(500).send(error)
  }
}

export const getUserFollowersById = async (req,res) => {
  try {

    const {user_id} = req.params;

    const user = await db.query("SELECT * FROM users WHERE id = $1", [user_id]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }

    const followers = await db.query("SELECT users.id, users.avatar, users.username, followers.follower_id FROM followers JOIN users ON users.id = followers.follower_id WHERE followers.user_id = $1 ", [user_id]);

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

    const following = await db.query("SELECT users.id, users.avatar, users.username, followers.follower_id FROM followers JOIN users ON users.id = followers.user_id WHERE followers.follower_id = $1", [user_id]);

    res.json(following.rows)
  } catch (error) {
    console.log('Error at getUserFollowingById:', error);
    res.status(500).send(error)
  }
}