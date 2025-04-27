import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { db } from "../db.js";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const llmSuggestions = async (req, res) => {
  try {
    const requestTopic = req.body.topic;

    if (!requestTopic) {
      res.status(400).send({
        message: "requestTopic must be provided",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Hello, we are Limitless - a platform for students trying to improve their knowledge on certain topics by competing with their friends. We need to give our user 1 suggestion for a question in a quiz they are creating. Please put the question on the first row, and the answers from second to fifth row, on the sixth row mark correct answer with the index of the row do not put it in any brackets. Do not greet us, only give us the suggestions. The topic of the quiz is: ${requestTopic}`,
    });

    const responseArray = response.text.split("\n");

    if (responseArray[responseArray.length - 1] == "") {
      responseArray.pop();
    }

    res.status(200).send({ response: responseArray });
  } catch (error) {
    console.log(`Error occured at route '/llm/suggestions': ${error}`);
    res.status(500).send({ error_message: error });
  }
};

export const llmAnswerGrading = async (req, res) => {
  try {
    const { competition_id } = req.params
    const { img_url, text_content } = req.body;

    if (!img_url && !text_content) {
      return res.status(400).send({
        message: "img_url or text_content must be provided",
      });
    }

    if (!img_url) {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Do not greet the user, 
        this prompt is supposed to have a description for an answer
        for the following description and rules
        ${text_content}`,
      });

      return res.status(200).send({
        content: response.text,
      });
    }

    const response = await fetch(img_url);
    const imageArrayBuffer = await response.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

    if (!text_content) {
      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64ImageData,
            },
          },
          {
            text: "Analyse this image and respond however you want to",
          },
        ],
      });

      return res.status(200).send({
        content: result.candidates[0].content.parts[0].text,
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64ImageData,
          },
        },
        { text: `Do not greet the user, 
            this prompt is supposed to have a description for the image containing an answer
            for the following question
            ${text_content}` },
      ],
    });

    return res.status(200).send({
      content: result.candidates[0].content.parts[0].text,
    });
  } catch (error) {
    console.log(`Error occured at route '/llm/grading': ${error}`);
    return res.status(500).send({ error_message: error });
  }
};

export const llmGradingParticipants = async (req, res) => {

}
