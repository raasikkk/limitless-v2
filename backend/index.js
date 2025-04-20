import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

import { authRoute } from "./routes/authRoute.js";
import { llmRouter } from "./routes/llmRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [`${process.env.FRONTEND_BASE_URL}`],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", authRoute);
app.use("/api", llmRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server is 200 running"));
