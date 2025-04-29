import { db } from "../db.js";
import cloudinary from "../utils/cloudinary.js";

export const getCompetitions = async (req,res) => {
  try {
    
    const competitions = await db.query("SELECT * FROM competitions WHERE private = FALSE");

    res.json(competitions.rows)

  } catch (error) {
    console.log('Error at getCompetition:', error);
    res.status(500).send(error)
  }
}

export const getCompetitionById = async (req,res) => {
  try {

    const {id} = req.params;

    const competition = await db.query("SELECT * FROM competitions WHERE private = FALSE AND id = $1", [id]);

    res.json(competition.rows[0])
    
  } catch (error) {
    console.log('Error at getCompetition:', error);
    res.status(500).send(error)
  }
}

export const createCompetition = async (req,res) => {
  try {

    const {userId, title, description, category, isPrivate, startDate, endDate} = req.body;

    if (!title || !description || !category || !startDate || !endDate ) {
      return res.status(400).json({
        message: "Fill all the fields."
      })
    }

    await db.query("INSERT INTO competitions (user_id, title, description, category, private, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [userId, title, description, category, isPrivate, startDate, endDate]);
    res.json({
      message: "Succesfully created."
    })

  } catch (error) {
    console.log('Error at createCompetition:', error);
    res.status(500).send(error)
  }
}

export const editTitle = async (req,res) => {
  try {

    const {id} = req.params;
    const {title} = req.body;

    if (!title) return res.status(400).json({
      message: "Provide title"
    });

    await db.query("UPDATE competitions SET title = $1 WHERE id = $2", [title, id]);
    res.json({
      message: "Succesfully changed title"
    })
    
  } catch (error) {
    console.log('Error at editTitle:', error);
    res.status(500).send(error)
  }
}

export const editDescription = async (req,res) => {
  try {

    const {id} = req.params;
    const {description} = req.body;

    if (!description) return res.status(400).json({
      message: "Provide description"
    });

    await db.query("UPDATE competitions SET description = $1 WHERE id = $2", [description, id]);
    res.json({
      message: "Succesfully changed description"
    })
    
  } catch (error) {
    console.log('Error at editDescription:', error);
    res.status(500).send(error)
  }
}

export const editRules = async (req,res) => {
  try {

    const {id} = req.params;
    const {rules} = req.body;

    if (!rules) return res.status(400).json({
      message: "Provide rules"
    });

    await db.query("UPDATE competitions SET rules = $1 WHERE id = $2", [rules, id]);
    res.json({
      message: "Succesfully changed rules"
    })
    
  } catch (error) {
    console.log('Error at editRules:', error);
    res.status(500).send(error)
  }
}


export const uploadCoverForCompetition = async (req,res) => {
  try {

    const {id} = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No image provided!"
      })
    }

    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [id]);

    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or competition doesn't exist"
      })
    }

    const publicId = `covers/competition_${id}_cover`;
    if (competition.rows[0].cover !== null) {
      await cloudinary.uploader.destroy(publicId);
    }

    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: 'competitions',
        public_id: publicId,
        overwrite: true
      },
      async (err, res) => {
        if (err) return res?.status(500).json({ error: 'Cloudinary upload failed' });


        await db.query("UPDATE competitions SET cover = $1 WHERE id = $2", [res?.secure_url, id])
      }
    )

    res.json({
      message: 'Succesfully updated.'
    })
    
  } catch (error) {
    console.log('Error at uploadCoverForCompetition:', error);
    res.status(500).send(error)
  }
}

export const getCategories = async (req,res) => {
  try {

    const categories = await db.query("SELECT cover, name FROM categories");

    res.json(categories.rows);

  } catch (error) {
    console.log('Error at getCategories:', error);
    res.status(500).send(error)
  }
}

export const joinCompetition = async (req,res) => {
  try {

    const {competition_id, user_id} = req.body;

    const competition = await db.query("SELECT private FROM competitions WHERE id = $1", [competition_id]);
    const isPrivate = competition.rows[0].private;
    if (isPrivate) {
      return res.status(400).json({
        message: "The competition is private."
      })
    }

    const checkIsUserCreator = await db.query("SELECT user_id FROM competitions WHERE id = $1 AND user_id = $2", [competition_id, user_id]);
    if (checkIsUserCreator.rows.length > 0) {
      return res.status(400).json({
        message: "Already participating in the competition."
      })
    }

    const checkUser = await db.query("SELECT participants.user_id FROM participants WHERE user_id = $1 AND competition_id = $2", [user_id, competition_id]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        message: "Already participating in the competition."
      })
    }


    await db.query("INSERT INTO participants (user_id, competition_id) VALUES ($1, $2)", [user_id, competition_id]);
    res.json({
      message: "Succesfully joined."
    })

  } catch (error) {
    console.log('Error at joinCompetition:', error);
    res.status(500).send(error)
  }
}

export const quitCompetition = async (req, res) => {
  try {
    const {competition_id, user_id} = req.params;

    const checkUser = await db.query("SELECT user_id FROM participants WHERE user_id = $1 AND competition_id = $2", [user_id, competition_id]);

    if (checkUser.rows.length <= 0) {
      return res.status(400).json({
        message: "User is not participant of the competition"
      })
    }

    await db.query("DELETE FROM participants WHERE user_id = $1 AND competition_id = $2", [user_id, competition_id]);
    res.json({
      message: "Succesfully quit."
    })
    
  } catch (error) {
    console.log('Error at quitCompetition:', error);
    res.status(500).send(error)
  }
}

export const getParticipants = async (req,res) => {
  try {
    const { competition_id } = req.params;

    const participants = await db.query(`SELECT users.id, users.avatar, users.username FROM participants JOIN users ON users.id = participants.user_id WHERE participants.competition_id = $1`, [competition_id]);

    res.json(participants.rows);
  } catch (error) {
    console.log('Error at getParticipants:', error);
    res.status(500).send(error)
  }
}