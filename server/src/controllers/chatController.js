import { db } from "../../db.js";

export const createChat = async (req, res) => {
  try {
    const { user_id, supervisor_id } = req.body;

    const chatQuery = await db.query(
      "INSERT INTO chats (user_id, supervisor_id) VALUES ($1, $2)",
      [user_id, supervisor_id]
    );

    return res.status(200).send({
      message: "Chat created succesfully",
      chatQuery,
    });
  } catch (error) {
    console.log(`Error occured at createChat(): ${error}`);
    return res.status(500).send({
      error_message: error,
    });
  }
};

export const getChatMessagesById = async (req, res) => {
  try {
    const { chat_id } = req.params;

    const chatQuery = await db.query(
      "SELECT * FROM messages WHERE chat_id=$1",
      [chat_id]
    );

    return res.status(200).send({
      content: chatQuery.rows,
    });
  } catch (error) {
    console.log(`Error occured at getChat(): ${error}`);
    return res.status(500).send({
      error_message: error,
    });
  }
};
