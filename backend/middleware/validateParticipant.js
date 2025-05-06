import { db } from "../db.js";

export const validateParticipant = async (req,res,next) => {
  try {

    const {id} = req.user;
    const competitionId = req.body.competition_id || req.body.competitionId || req.params.competition_id || req.params.competitionId;

    if (!competitionId) return res.status(400).json({
      message: "Provide id"
    })

    const competition = await db.query("SELECT 1 FROM competitions WHERE id = $1", [competitionId]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or competition doesn't exist"
      })
    }

    const checkParticipant = await db.query("SELECT * FROM participants WHERE user_id = $1 AND competition_id = $2", [id, competitionId]);
    if (checkParticipant.rows.length <= 0) {
      return res.status(403).json({
        message: "Join the competition!"
      })
    }

    next()

  } catch (error) {
    console.log('Error at validateParticipant middleware:', error);
    res.status(500).send(error)
  }
}