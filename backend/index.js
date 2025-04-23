import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";

import { authRoute } from "./routes/authRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { followerRoute } from "./routes/followerRoute.js";
import { llmRouter } from "./routes/llmRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [`${process.env.FRONTEND_BASE_URL}`],
  credentials: true
};
app.use(cors(corsOptions));
app.use(passport.initialize());


app.use('/', authRoute);
app.use('/api', userRoute);
app.use('/api', followerRoute);
app.use(llmRouter);

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> console.log('Server is 200 running'))