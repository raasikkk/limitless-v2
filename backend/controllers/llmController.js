import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const llmSuggestions = async (req, res) => {
  try {
    const requestTopic = req.body.topic;

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
    console.log(`Error at occured at route '/llm/suggestions': ${error}`);
    res.status(500).send({ error_message: error });
  }
};
