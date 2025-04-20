import express from "express";
import dotenv from "dotenv";
dotenv.config();


import { authRoute } from "./routes/authRoute.js";

const app = express();

app.use('/api', authRoute);


app.listen(8080, ()=> console.log('Server is 200 running'))