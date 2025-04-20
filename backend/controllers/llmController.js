/*
    llmController.js

    This file contains a functions that send API requests to an LLM.
    Well for now it will be Gemini AI.

    llmSuggestions:
        The function takes a key called "topic" from the request and puts it in the requestTopic variable.
        Then with the ai object we send a request to the LLM with keys of "model" and "contents".
        "model" contains the name of the model we are sending our request to.
        "contents" contains all the content of the request we want the LLM to process.
        In the result the LLM response with a string that contains a question, possible answers and a number.
        The question, possible answer and a number are all separated with a new line charater \n.
        The number represents the index of the element in responseArray which should be the correct answer.

        So, just so you don't need to figure this out,
        to grab the question pick the element at the index of 0.
        Possible answers are at the indexes from 1 to 4.
        And finally the number that represents the correct answer as index 5.


    F1awless77 - 20.04.2025
*/

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
