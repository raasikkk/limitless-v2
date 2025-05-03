import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const suggestions = async (promptContext) => {
  const llmResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Hello, we are Sheksiz - a platform for students trying to improve their knowledge on certain topics 
        by competing with others through competitions where they can submit answers that we call "submissions". 
        We need to enhance the title and description (refactor the description completely), and generate rules for the competition according to the competition title and description.
        Please put the title, description and rules on seperate parameters in JSON, without any additional text or formatting.
        It also mandatory use tags for javascript richtexteditor\n
        Title: ${promptContext.rows[0].title}\n
        Description: ${promptContext.rows[0].description}\n
        If possible try to use this often: AlignCenter,
        AlignLeft,
        AlignRight,
        Bold,
        Heading2,
        Heading3,
        Highlighter,
        Italic,
        List,
        ListOrdered,
        Strikethrough,
        Link,
        Underline`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "Title of the competition",
              nullable: false,
            },
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

export const filtering = async (request) => {
  const llmResponse = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Please analyse this request from our user\n
        This might a profile bio, a comment, or a submission.\n
        Check if the request does not contain anything 
        racist, fascist, nazi, discrimintating, inappropriate and etc (anything negative, the platform is family-friendly).\n
        Return boolean true if the request is good to go, and boolean false if it is not\n
        Request: ${request}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            isValid: {
              type: Type.BOOLEAN,
              description: "true/false, is the content valid",
              nullable: false,
            },
          },
          required: ["isValid"],
        },
      },
    },
  });

  const content = JSON.parse(llmResponse.candidates[0].content.parts[0].text);

  return content;
};
