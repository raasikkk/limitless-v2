import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MeiliSearch } from "meilisearch";
import { searchRouter } from "./routes/searchRoute";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 7000;

app.use("/api", searchRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
