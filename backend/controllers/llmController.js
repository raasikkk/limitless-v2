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
    const { user_prompt } = req.body;

    if (!user_prompt) {
      res.status(400).send({
        message: "user_prompt must be provided",
      });
    }

    const response = await suggestions(user_prompt);

    res.status(200).send({ response: response });
  } catch (error) {
    console.log(`Error occured at route '/llm/suggestions': ${error}`);
    res.status(500).send({ error_message: error });
  }
};

export const llmGradingParticipants = async (req, res) => {
  try {
    const { competition_id } = req.params;

    const promptContext = await db.query(
      "SELECT description, rules FROM competitions WHERE id=$1",
      [competition_id]
    );

    const submission = await db.query(
      "SELECT id, explanation, image FROM submissions WHERE competition_id=$1",
      [competition_id]
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

    console.log(result);
    console.log(result.length);

    res.status(200).send({
      result,
    });
  } catch (error) {
    console.log(`Error occured at llmGradingParticipants(): ${error}`);
    return res.status(500).send({
      error_message: error,
    });
  }
};
