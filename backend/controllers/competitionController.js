import { db } from "../db.js";

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

    const {userId, title, description, categoryId, isPrivate, startDate, endDate} = req.body;

    if (!title || !description || !categoryId || !startDate || !endDate) {
      return res.status(400).json({
        message: "Fill all the fields."
      })
    }

    await db.query("INSERT INTO competitions (user_id, title, description, category_id, private, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7)", [userId, title, description, categoryId, isPrivate, startDate, endDate]);

    res.json({
      message: "Succesfully created."
    })

  } catch (error) {
    console.log('Error at createCompetition:', error);
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

    const participants = await db.query(`
    SELECT users.id, users.avatar, users.username FROM competitions JOIN users ON users.id = competitions.user_id WHERE competitions.id = $1
    UNION
    SELECT users.id, users.avatar, users.username FROM participants JOIN users ON users.id = participants.user_id WHERE participants.competition_id = $1`, [competition_id]);

    res.json(participants.rows);
  } catch (error) {
    console.log('Error at getParticipants:', error);
    res.status(500).send(error)
  }
}