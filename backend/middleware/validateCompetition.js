import { db } from "../db.js";

export const validateCompetition = async (req,res, next) => {
  const {id,competition_id} = req.params;
  try {
    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [id || competition_id]);

    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or competition doesn't exist"
      })
    }

    if (req.user.id !== competition.rows[0].user_id) {
      return res.status(403).json({
        message: "You are not creator of the competition"
      })
    }

    next();
  } catch (error) {
    console.log('Error at validateCompetition middleware', error);
    res.status(500).send(error)
  }
}