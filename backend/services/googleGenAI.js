import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const suggestions = async (user_prompt) => {
  const llmResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Hello, we are Limitless - a platform for students trying to improve their knowledge on certain topics 
        by competing with others through competitions where they can submit answers that we call "submissions". 
        We need to give our user 1 suggestion for the description and rules for the competition according to the user's prompt.
        Please put the description and rules on seperate parameters in JSON, without any additional text or formatting.
        Also please use tags for rich text editor\n
        The user prompt: ${user_prompt}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            description: {
              type: Type.STRING,
              description: "Description of the competition",
              nullable: false,
            },
            rules: {
              type: Type.STRING,
              description: "Rules of the competition",
              nullable: false,
            },
          },
          required: ["description", "rules"],
        },
      },
    },
  });

  const content = JSON.parse(llmResponse.candidates[0].content.parts[0].text);

  return content;
};

export const noImageGrading = async (
  description,
  rules,
  submission_id,
  explanation
) => {
  const llmResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `A user on our platform submitted a submission for a competition.
          Your task is to rate this submission with a boolean value:
          - true for upvote
          - false for downvote
          Please respond with only the boolean value, without any additional text or formatting.\n
          Description: ${description}
          Rules: ${rules}\n
          Submission: ${explanation}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            vote: {
              type: Type.BOOLEAN,
              description: "true or false",
            },
          },
          required: ["vote"],
        },
      },
    },
  });

  const content = JSON.parse(llmResponse.candidates[0].content.parts[0].text);

  return {
    submission_id,
    content,
  };
};

export const noTextGrading = async (
  description,
  rules,
  submission_id,
  image_url
) => {
  const imageResponse = await fetch(image_url);
  const imageArrayBuffer = await imageResponse.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

  const llmResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageData,
        },
      },
      {
        text: `A user on our platform submitted a submission for a competition.
          Your task is to rate this submission with a boolean value:
          - true for upvote
          - false for downvote
          Please respond with only the boolean value, without any additional text or formatting.\n
          Description: ${description}
          Rules: ${rules}\n`,
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            vote: {
              type: Type.BOOLEAN,
              description: "true or false",
            },
          },
          required: ["vote"],
        },
      },
    },
  });

  const content = JSON.parse(llmResponse.candidates[0].content.parts[0].text);

  return {
    submission_id,
    content,
  };
};

export const grading = async (
  description,
  rules,
  submission_id,
  explanation,
  image_url
) => {
  const imageResponse = await fetch(image_url);
  const imageArrayBuffer = await imageResponse.arrayBuffer();
  const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");

  const llmResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageData,
        },
      },
      {
        text: `A user on our platform submitted a submission for a competition.
          Your task is to rate this submission with a boolean value:
          - true for upvote
          - false for downvote
          Please respond with only the boolean value, without any additional text or formatting.\n
          Description: ${description}
          Rules: ${rules}\n
          Submission: ${explanation}`,
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            vote: {
              type: Type.BOOLEAN,
              description: "true or false",
            },
          },
          required: ["vote"],
        },
      },
    },
  });

  const content = JSON.parse(llmResponse.candidates[0].content.parts[0].text);

  return {
    submission_id,
    content,
  };
};
