import { db } from "../db.js";
import { redisClient } from "../redis/client.js";
import cloudinary from "../utils/cloudinary.js";

export const getCompetitions = async (req,res) => {
  try {
    
    const competitions = await db.query("SELECT * FROM competitions WHERE private = FALSE");

    redisClient.setEx(`competitions:all`, 10 * 60, JSON.stringify(competitions.rows));
    res.json(competitions.rows)

  } catch (error) {
    console.log('Error at getCompetition:', error);
    res.status(500).send(error)
  }
}

export const getCompetitionsByCategory = async (req,res) => {
  try {

    const {category} = req.params;

    const competitions = await db.query("SELECT competitions.*, users.username, users.avatar FROM competitions JOIN users ON competitions.user_id = users.id LEFT JOIN categories ON categories.id = competitions.category WHERE LOWER(categories.name) = LOWER($1) AND private = FALSE", [category]);

    redisClient.setEx(`competitons:${category}:category`, 5 * 60, JSON.stringify(competitions.rows));
    res.json(competitions.rows)
    
  } catch (error) {
    console.log('Error at getCompetition:', error);
    res.status(500).send(error)
  }
}

export const getCompetitionById = async (req,res) => {
  try {

    const {id} = req.params;

    const competition = await db.query("SELECT competitions.*, categories.name AS category, users.username, users.avatar FROM competitions JOIN users ON competitions.user_id = users.id LEFT JOIN categories ON categories.id = competitions.category WHERE competitions.id = $1", [id]);
    
    redisClient.setEx(`competitions:${id}`, 5 * 60, JSON.stringify(competition.rows[0]));
    res.json(competition.rows[0])
    
  } catch (error) {
    console.log('Error at getCompetition:', error);
    res.status(500).send(error)
  }
}

export const createCompetition = async (req,res) => {
  try {

    const userId = req.user.id;
    const {title, description, category, isPrivate, startDate, endDate} = req.body;

    let categoryId = category == 0 ? null : category

    if (!title || !description || !startDate || !endDate ) {
      return res.status(400).json({
        message: "Fill all the fields."
      })
    }

    const cover = [
      'https://res.cloudinary.com/dtsdbjvgg/image/upload/v1745997365/blue-pattern_yk4jeg.jpg',
      'https://res.cloudinary.com/dtsdbjvgg/image/upload/v1745997365/green-pattern_jfmxgg.jpg',
      'https://res.cloudinary.com/dtsdbjvgg/image/upload/v1745997365/white-pattern_rcpdp0.jpg',
      'https://res.cloudinary.com/dtsdbjvgg/image/upload/v1745997365/pink-pattern_o4laz2.jpg'
    ]
    const randomElement = cover[Math.floor(Math.random() * cover.length)];

    const competition = await db.query("INSERT INTO competitions (user_id, title, description, category, private, start_date, end_date, cover) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [userId, title, description, categoryId, isPrivate, startDate, endDate, randomElement]);
    res.json({
      message: "Succesfully created.",
      id: competition.rows[0].id
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

    const categories = await db.query("SELECT id, cover, name FROM categories");

    redisClient.setEx(`categories`, 3600 * 5, JSON.stringify(categories.rows));
    res.json(categories.rows);

  } catch (error) {
    console.log('Error at getCategories:', error);
    res.status(500).send(error)
  }
}

export const joinCompetition = async (req,res) => {
  try {
    const user_id = req.user.id;
    const {competition_id, code} = req.body;

    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competition_id]);
    
    const isPrivate = competition.rows[0].private;
    if (isPrivate) {
      if (competition.rows[0].code != code || !code) {
        return res.status(400).json({
          message: "Incorrect code."
        })
      }
    }
    const getParticipants = await db.query("SELECT * FROM participants WHERE competition_id = $1", [competition_id]);
    if (getParticipants.rows.length >= competition.rows[0].max_participants) {
      return res.status(400).json({
        message: "Cannot join. Competition is full."
      })
    }

    const checkUser = await db.query("SELECT participants.user_id FROM participants WHERE user_id = $1 AND competition_id = $2", [user_id, competition_id]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({
        message: "Already participating in the competition."
      })
    }

    const inserted = await db.query(`
      WITH inserted_participant AS (
        INSERT INTO participants (user_id, competition_id)
        VALUES ($1, $2)
        RETURNING *
      )
      SELECT inserted_participant.*, users.avatar, users.username
      FROM inserted_participant
      JOIN users ON users.id = inserted_participant.user_id
    `, [user_id, competition_id]);
    
    
    redisClient.setEx(`competitions:${competition_id}:participants`, 5 * 60, JSON.stringify(inserted.rows[0]));
    res.json(competition.rows[0])
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
    const user_id = req.user.id;
    const {competition_id} = req.params;

    const checkUser = await db.query("SELECT user_id FROM participants WHERE user_id = $1 AND competition_id = $2", [user_id, competition_id]);

    if (checkUser.rows.length <= 0) {
      return res.status(400).json({
        message: "User is not participant of the competition"
      })
    }

    const deleted = await db.query(`
      WITH deleted_participant AS (
        DELETE FROM participants
        WHERE user_id = $1 AND competition_id = $2
        RETURNING *
      )
      SELECT deleted_participant.*, users.avatar, users.username
      FROM deleted_participant
      JOIN users ON users.id = deleted_participant.user_id
    `, [user_id, competition_id]);

    redisClient.setEx(`competitions:${competition_id}:participant`, 5 * 60, JSON.stringify(deleted.rows[0]));
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
    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competition_id]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Competition doesn't exist"
      })
    }
    const participants = await db.query(`SELECT participants.*, users.avatar, users.username FROM participants JOIN users ON users.id = participants.user_id WHERE participants.competition_id = $1`, [competition_id]);
    
    redisClient.setEx(`competitions:${competition_id}:participants`, 2 * 60, JSON.stringify(participants.rows));
    res.json(participants.rows);
  } catch (error) {
    console.log('Error at getParticipants:', error);
    res.status(500).send(error)
  }
}

export const getLeaderboard = async (req,res) => {
  try {
    const {competitionId} = req.params;
    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competitionId]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Competition doesn't exist"
      })
    }
    const checkParticipant = await db.query("SELECT 1 FROM participants WHERE competition_id = $1 AND user_id = $2", [competitionId, req.user.id]);
    if (competition.rows[0].private && checkParticipant.rows.length <= 0) {
      return res.status(403).json({
        message: "Private competition"
      })
    }
    
    const leaderboard = await db.query(`
    SELECT
      ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(v.score), 0) DESC) AS place,
      u.id AS user_id,
      u.username,
      u.avatar,
      COALESCE(SUM(v.score), 0) AS score
    FROM users u
    JOIN submissions s ON s.participant_id = u.id
    LEFT JOIN (
      SELECT 
        submission_id,
        COUNT(*) FILTER (WHERE vote_type = true) -
        COUNT(*) FILTER (WHERE vote_type = false) AS score
      FROM votes
      GROUP BY submission_id
    ) v ON s.id = v.submission_id
    WHERE s.competition_id = $1
    GROUP BY u.id, u.username, u.avatar
    ORDER BY score DESC;

    `, [competitionId])

    redisClient.setEx(`competitions:${competitionId}:leaderboard`, 60, JSON.stringify(leaderboard.rows));
    res.json(leaderboard.rows)
 
  } catch (error) {
    console.log('Error at getLeaderboard:', error);
    res.status(500).send(error)
  }
}

export const saveSettings = async (req,res) => {
  try {

    const {competitionId, maxParticipants, isPrivate, isAiBased, code, startDate, endDate } = req.body;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    if (start < today) {
      return res.status(400).json({
        message: "Starting date cannot be less that todays date"
      })
    }
    if (start > end) {
      return res.status(400).json({
        message: "Starting date cannot be greater that ending date"
      })
    }


    const competition = await db.query("SELECT * FROM competitions WHERE id = $1", [competitionId]);
    if (competition.rows.length <= 0) {
      return res.status(400).json({
        message: "Competition doesn't exist"
      })
    }

    if (req.user.id !== competition.rows[0].user_id) {
      return res.status(403).json({
        message: "You are not creator of the competition"
      })
    }

    if (maxParticipants >= 30) {
      return res.status(400).json({
        message: "Maximum amount of participants cannot be more than 30"
      })
    }

    if (code.length !== 4 && isPrivate) {
      return res.status(400).json({
        message: "Code should be 4 digits"
      })
    }

    const updated = await db.query(`
      WITH updated_competition AS (
        UPDATE competitions 
        SET max_participants = $1, 
            private = $2, 
            ai_based = $3, 
            code = $4, 
            start_date = $5, 
            end_date = $6 
        WHERE id = $7 
        RETURNING *
      )
      SELECT updated_competition.*, 
            categories.name AS category, 
            users.username, 
            users.avatar 
      FROM updated_competition
      JOIN users ON updated_competition.user_id = users.id
      LEFT JOIN categories ON categories.id = updated_competition.category
    `, [maxParticipants, isPrivate, isAiBased, code, startDate, endDate, competitionId]);
    redisClient.setEx(`competitions:${competitionId}`, 5 * 60, JSON.stringify(updated.rows[0]));
    res.json({
      message: "Succesfully saved settings"
    })

  } catch (error) {
    console.log('Error at saveSettings:', error);
    res.status(500).send(error)
  }
}

export const kickUser = async (req,res) => {
  try {

    const {id, user_id} = req.params;

    const participants = await db.query("SELECT * FROM participants WHERE competition_id = $1 AND user_id = $2", [id, user_id]);

    if (participants.rows.length <= 0) {
      return res.status(400).json({
        message: "User is not a participant"
      })
    }

    await db.query("DELETE FROM participants WHERE competition_id = $1 AND user_id = $2", [id, user_id]);
    res.json({
      message: "Kicked out succesfully"
    })
    
  } catch (error) {
    console.log('Error at kickUser:', error);
    res.status(500).send(error)
  }
}