import { Router } from "express";
import {
  createChat,
  getChatMessagesById,
} from "../controllers/chatController.js";

export const chatRoute = Router();

chatRoute.post("/chats/createchat", createChat);
chatRoute.get("/chats/:chat_id/getmessages", getChatMessagesById);
