import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import { chatRoute } from "./routes/chatRoute.js";
import cookieParser from "cookie-parser";
import { db } from "../db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.SERVER_PORT;

const server = http.createServer(app);

app.use("/api", chatRoute);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_BASE_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User with id ${socket.id} has connected`);

  socket.on("join_room", (data) => {
    console.log(`join_room: ${data}`);
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", async (data) => {
    const { room, user_id, message } = data;
    console.log(`send_message:`);
    console.log(data);
    const messageQueery = await db.query(
      "INSERT INTO messages (user_id, chat_id, message) VALUES ($1, $2, $3)",
      [user_id, room, message]
    );
    socket.to(data.room).emit("receive_message", data);
    console.log(`Data has been sent ${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnect with id ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
