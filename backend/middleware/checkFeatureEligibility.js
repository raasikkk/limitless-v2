import jwt from "jsonwebtoken";
import { db } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET
  ? process.env.JWT_SECRET
  : "best_secret_2025";

export const llmGradingEligibility = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded_token = jwt.decode(token);
    const user_id = decoded_token.id;

    const result = await db.query(
      "SELECT llm_use_at FROM users WHERE id = $1",
      [user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];
    const now = new Date();

    if (!user.llm_use_at) {
      await db.query("UPDATE users SET llm_use_at = NOW() WHERE id=$1", [
        user_id,
      ]);
      req.canUseLlmGrading = true;
      return next();
    }

    const lastUseTime = new Date(user.llm_use_at);
    const timeDifference = now.getTime() - lastUseTime.getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (timeDifference >= twentyFourHours) {
      await client.query(
        "UPDATE users SET llmgrading_last_use = NOW() WHERE id = $1",
        [user_id]
      );
      req.canUseLlmGrading = true;
      return next();
    } else {
      const remainingMilliseconds = twentyFourHours - timeDifference;
      const remainingHours = Math.ceil(
        remainingMilliseconds / (1000 * 60 * 60)
      );
      return res.status(403).json({
        error: `You can use LLM grading again in approximately ${remainingHours} hours.`,
      });
    }
  } catch (error) {
    console.log(`Error checking feature (llmGrading) eligibility: ${error}`);
    return {
      eligibity: false,
      message: "Something went wrong",
    };
  }
};
