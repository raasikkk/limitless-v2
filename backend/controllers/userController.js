import { db } from "../db.js";
import { redisClient } from "../redis/client.js";
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
export const getUserByUserId = async (req,res) => {
  try {
    const {id} = req.params;

    const user = await db.query("SELECT id, email, username, avatar, bio, created_at FROM users WHERE id = $1", [id]);
    if (user.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or user doesn't exist"
      })
    }
    await redisClient.setEx(`user:${id}`, 3600, JSON.stringify(user.rows[0]));
    res.json(user.rows[0]);
  } catch (error) {
    console.log('Error at getUserById:', error);
    res.status(500).send(error)
  }
}

export const editUserById = async (req,res) => {
  try {

    const {id} = req.user;
    const {bio} = req.body;

    if (!bio) {
      return res.json({
        message: "Provide at least one field to change."
      })
    }

    await db.query("UPDATE users SET bio = $1 WHERE id = $2", [bio, id])
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
    const {id, avatar} = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No image provided"
      })
    }

    const publicId = `user_${id}_avatar`;

    if (avatar !== null) {
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

export const search = async (req,res) => {
  try {
    const {q} = req.query;

    if (!q) return res.status(400).json({
      message: "Empty search value"
    })

    const competitionsResult = await db.query(`
    SELECT competitions.*, users.username, users.avatar FROM competitions JOIN users ON competitions.user_id = users.id WHERE LOWER(competitions.title) LIKE LOWER($1) OR LOWER(competitions.description) LIKE LOWER($1)
    `, [`%${q.toLowerCase()}%`])
    
    const usersResult = await db.query(`
      SELECT id, email, username, avatar, bio, created_at FROM users WHERE LOWER(username) LIKE LOWER($1) OR LOWER(email) LIKE LOWER($1)
    `, [`%${q.toLowerCase()}%`])

    redisClient.setEx(`user:${q.toLowerCase()}`, 2 * 60, JSON.stringify({
      competitions: competitionsResult.rows,
      users: usersResult.rows
    }));

    res.json({
      competitions: competitionsResult.rows,
      users: usersResult.rows
    })
  } catch (error) {
    console.log('Error at Search:', error);
    res.status(500).send(error)
  }
}

export const getUserCompetitions = async (req,res) => {
  try {

    const {id} = req.params;

    const competitions = await db.query(`
    SELECT DISTINCT competitions.*, users.username, users.avatar FROM competitions 
    LEFT JOIN participants ON participants.competition_id = competitions.id
    JOIN users ON competitions.user_id = users.id
    WHERE participants.user_id = $1 OR competitions.user_id = $1
    ORDER BY competitions.created_at DESC LIMIT 4
    `, [id])

    redisClient.setEx(`user:${id}:competitions`, 60 * 5, JSON.stringify(competitions.rows))
    res.json(competitions.rows)
  } catch (error) {
    console.log('Error at getUserCompetitions:', error);
    res.status(500).send(error)
  }
}

export const editUsername = async (req,res) => {
  try {
    const {id} = req.user;
    const {username} = req.body;

    const checkUsername = await db.query("SELECT 1 FROM users WHERE username = $1", [username]);
    if (checkUsername.rows.length > 0) {
      return res.status(400).json({
        message: "Username is not available"
      })
    }

    await db.query("UPDATE users SET username = $1 WHERE id = $2", [username, id]);
    res.json({
      message: "Succesfully changed"
    })
    
  } catch (error) {
    console.log('Error at editUsername:', error);
    res.status(500).send(error)
  }
}

export const sendFeedback = async (req,res) => {
  try {

    const {subject, message} = req.body;

    if (!subject || !message) {
      return res.status(400).json({
        message: "Fill all the fields"
      })
    }

    await db.query('INSERT INTO feedback (user_id, subject, message) VALUES ($1, $2, $3)', [req.user.id, subject, message]);
    res.json({
      message: "Succesfully sent"
    })
    
  } catch (error) {
    console.log('Error at editUsername:', error);
    res.status(500).send(error);
  }
}