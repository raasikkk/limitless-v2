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
import { competitionRoute } from "./routes/competitionRoute.js";
import { submissionRoute } from "./routes/submissionRoute.js";
import escapeHTML from "escape-html";
const html = escapeHTML('foo & bar');
import { connectToRedis } from "./redis/client.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [`${process.env.FRONTEND_BASE_URL}`],
  credentials: true
};

app.use(cors(corsOptions));
app.use(passport.initialize());

await connectToRedis();


app.use('/', authRoute);
app.use('/api', userRoute);
app.use('/api', followerRoute);
app.use('/api', competitionRoute);
app.use('/api', submissionRoute);
app.use(llmRouter);

const PORT = process.env.PORT || 8080

app.listen(PORT, ()=> console.log('Server is 200 running'))