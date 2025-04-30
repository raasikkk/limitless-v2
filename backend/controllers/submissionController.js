import { db } from "../db.js";
import cloudinary from "../utils/cloudinary.js";

export const sendSubmission = async (req,res) => {
  try {

    const {user_id, competition_id, explanation} = req.body;
    const date = new Date();

    if (!user_id || !competition_id || !explanation) {
      return res.status(400).json({
        message: "Provide all the fileds."
      })
    }

    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competition_id]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or competition doesn't exist"
      })
    }

    let image = null;
    const publicId = `submission_user-${user_id}_competition-${competition_id}_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    if (req.file) {
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: 'competitions/submissions',
          public_id: publicId,
          overwrite: true
        },
        async (err, res) => {
          if (err) return res?.status(500).json({ error: 'Cloudinary upload failed' });
  
          return image = res?.secure_url;
        }
      )
    }
    const checkSubmission = await db.query("SELECT submited_date FROM submissions WHERE participant_id = $1 AND competition_id = $2 AND DATE(submited_date) = DATE($3)", [user_id, competition_id, date]);
    if (checkSubmission.rows.length > 0) {
      return res.status(400).json({
        message: "Only one submission per day."
      })
    }

    await db.query("INSERT INTO submissions (participant_id, competition_id, image, explanation) VALUES ($1, $2, $3, $4)", [user_id, competition_id, image, explanation]);
    res.json({
      message: "Succesfully submited"
    })
    
  } catch (error) {
    console.log('Error at sendSubmission:', error);
    res.status(500).send(error)
  }
}

export const getSubmissions = async (req,res) => {
  try {
    const date = new Date();
    const {competitionId} = req.params;

    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competitionId]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or competition doesn't exist"
      })
    }

    const submissions = await db.query(`
      SELECT 
      s.*, 
      u.id AS user_id,
      u.username, 
      u.avatar,
      COALESCE(COUNT(v.*) FILTER (WHERE v.vote_type = TRUE), 0) AS likes,
      COALESCE(COUNT(v.*) FILTER (WHERE v.vote_type = FALSE), 0) AS dislikes
      FROM submissions s
      JOIN users u ON s.participant_id = u.id
      LEFT JOIN votes v ON s.id = v.submission_id
      WHERE s.competition_id = $1 AND DATE(s.submited_date) = DATE($2)
      GROUP BY s.id, u.username, u.avatar
      ORDER BY 
        COALESCE(COUNT(v.*) FILTER (WHERE v.vote_type = TRUE), 0) - 
        COALESCE(COUNT(v.*) FILTER (WHERE v.vote_type = FALSE), 0) DESC;
    `, [competitionId, date]);

    res.json(submissions.rows);
    
  } catch (error) {
    console.log('Error at getSubmissions:', error);
    res.status(500).send(error)
  }
}

export const editSubmissionImage = async (req,res) => {
  try {

    const {userId, competitionId} = req.params;
    const date = new Date();
    const file = req.file;
    if (!file) return res.status(400).json({
      message: "No image provided!"
    })

    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competitionId]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or competition doesn't exist"
      })
    }

    const submission = await db.query("SELECT * FROM submissions WHERE participant_id = $1 AND competition_id = $2 AND DATE(submited_date) = DATE($3)", [userId, competitionId, date]);
    if (submission.rows.length <= 0) {
      return res.status(400).json({
        message: "Only today's submissions can be edited"
      })
    }

    const publicId = `submission_user-${userId}_competition-${competitionId}_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    await cloudinary.uploader.destroy(publicId);

    await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: 'competitions/submissions',
        public_id: publicId,
        overwrite: true
      },
      async (err, res) => {
        if (err) return res?.status(500).json({ error: 'Cloudinary upload failed' });

        await db.query("UPDATE submissions SET image = $1 WHERE participant_id = $2 AND competition_id = $3", [res?.secure_url, userId, competitionId]);
      }
    )

    res.json({
      message: "Succesfully updated submission image"
    })
    
  } catch (error) {
    console.log('Error at editSubmissionImage:', error);
    res.status(500).send(error)
  }
}

export const editSubmissionText = async (req,res) => {
  try {
    const {userId, competitionId} = req.params;
    const {explanation} = req.body;
    const date = new Date();

    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competitionId]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or competition doesn't exist"
      })
    }

    await db.query("UPDATE submissions SET explanation = $1 WHERE participant_id = $2 AND competition_id = $3 AND DATE(submited_date) = DATE($4)", [explanation, userId, competitionId, date]);
    res.json({
      message: "Succesfully edited submission"
    })
  } catch (error) {
    console.log('Error at editSubmission:', error);
    res.status(500).send(error)
  }
}

export const deleteSubmission = async (req, res) => {
  try {

    const {userId, competitionId} = req.params;
    const date = new Date();

    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competitionId]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or competition doesn't exist"
      })
    }

    const submission = await db.query("SELECT * FROM submissions WHERE participant_id = $1 AND competition_id = $2 AND DATE(submited_date) = DATE($3)", [userId, competitionId, date]);

    if (submission.rows.length <= 0) {
      return res.json({
        message: "You can only delete today's submissions"
      })
    }

    const publicId = `competitions/submissions/submission_user-${userId}_competition-${competitionId}_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    await cloudinary.uploader.destroy(publicId);

    await db.query("DELETE FROM submissions WHERE participant_id = $1 AND competition_id = $2", [userId, competitionId]);
    res.json({
      message: "Succesfully deleted submission."
    })

    
  } catch (error) {
    console.log('Error at deleteSubmission:', error);
    res.status(500).send(error)
  }
}

export const vote = async (req,res) => {
  try {
    const {userId, submissionId, voteType, comment,competitionId} = req.body;
    const date = new Date();

    if (req.user.id === userId) return res.status(400).json({
      message: "You cannot vote yourself"
    });

    const checkIsParticipant = await db.query("SELECT * FROM participants WHERE user_id = $1 AND competition_id = $2", [userId, competitionId]);

    if (checkIsParticipant.rows.length <= 0) {
      return res.status(400).json({
        message: "Cannot find the participant"
      })
    }


    const checkSubmission = await db.query("SELECT * FROM submissions WHERE id = $1", [submissionId]);

    if (checkSubmission.rows.length <= 0) {
      return res.status(400).json({
        message: "Incorrect id or submission doesn't exist"
      })
    }

    const checkVote = await db.query("SELECT * FROM votes WHERE submission_id = $1 AND user_id = $2 AND DATE(created_at) = DATE($3)", [submissionId, userId, date]);

    if (checkVote.rows.length > 0) {
      const existingVote = checkVote.rows[0];

      if (existingVote.vote_type === voteType) {
        return res.status(400).json({ message: "You already voted this way today" });
      }
      await db.query(
        "UPDATE votes SET vote_type = $1 WHERE id = $2",
        [voteType, existingVote.id]
      );

      return res.json({ message: "Vote updated" });
    }

    await db.query("INSERT INTO votes (user_id, submission_id, vote_type, comment) VALUES ($1, $2, $3, $4)", [userId, submissionId, voteType, comment])
    res.json({
      message: "Succesfully voted"
    })
  } catch (error) {
    console.log('Error at upvote:', error);
    res.status(500).send(error)
  }
}