import { filtering } from "../services/googleGenAI.js";

export const submissionIsValid = async (req, res, next) => {
  try {
    const { explanation } = req.body;

    const response = await filtering(explanation);

    console.log(response);

    if (!response[0].isValid) {
      return res.status(400).send({
        error_message: "The request message seems to be inappropriate",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error,
    });
  }
};
