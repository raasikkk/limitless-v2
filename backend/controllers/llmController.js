import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { db } from "../db.js";
import {
  noTextGrading,
  noImageGrading,
  grading,
  suggestions,
} from "../services/googleGenAI.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const llmSuggestions = async (req, res) => {
  try {
    const { competition_id } = req.params;

    if (!competition_id) {
      return res.status(400).send({
        message: "Bad Request, competition_id Must Be Provided",
      });
    }

    const promptContext = await db.query(
      "SELECT description, rules, ai_based FROM competitions WHERE id=$1",
      [competition_id]
    );

    const response = await suggestions(promptContext);

    const updateCompetition = await db.query(
      "UPDATE competitions SET title=$1, description=$2, rules=$3 WHERE id=$4",
      [
        response[0].title,
        response[0].description,
        response[0].rules,
        competition_id,
      ]
    );

    res.status(200).send({ response: response });
  } catch (error) {
    console.log(`Error occured at route '/llm/suggestions': ${error}`);
    res.status(500).send({ error_message: error });
  }
};

export const llmGradingParticipants = async (req, res) => {
  try {
    const { competition_id } = req.params;
    const today = new Date();

    const promptContext = await db.query(
      "SELECT description, rules, ai_based FROM competitions WHERE id=$1",
      [competition_id]
    );

    if (!promptContext.rows[0].ai_based) {
      return res.status(400).json({
        message: "Bad Request. AI based grading is disabled",
      });
    }

    const submission = await db.query(
      "SELECT id, explanation, image FROM submissions WHERE competition_id=$1 AND DATE(submited_date) = DATE($2)",
      [competition_id, today]
    );

    let content;
    let promises = [];

    for (let i = 0; i < submission.rows.length; i++) {
      if (!submission.rows[i].image && submission.rows[i].explanation) {
        content = noImageGrading(
          promptContext.rows[0].description,
          promptContext.rows[0].rules,
          submission.rows[i].id,
          submission.rows[i].explanation
        );

        promises.push(content);
        continue;
      }
      if (!submission.rows[i].explanation && submission.rows[i].image) {
        content = noTextGrading(
          promptContext.rows[0].description,
          promptContext.rows[0].rules,
          submission.rows[i].id,
          submission.rows[i].image
        );

        promises.push(content);
        continue;
      }
      if (submission.rows[i].explanation && submission.rows[i].image) {
        content = grading(
          promptContext.rows[0].description,
          promptContext.rows[0].rules,
          submission.rows[i].id,
          submission.rows[i].explanation,
          submission.rows[i].image
        );

        promises.push(content);
        continue;
      }
      if (!submission.rows[i].explanation && !submission.rows[i].image) {
        return res.status(400).send({
          error_message: "Neither explanation or image are provided",
        });
      }
    }

    const result = await Promise.all(promises);

    res.status(200).send({
      result,
    });
  } catch (error) {
    console.log(`Error occured at llmGradingParticipants(): ${error}`);
    console.log(error);
    return res.status(500).send({
      error,
    });
  }
};
