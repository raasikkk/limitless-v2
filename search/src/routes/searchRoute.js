import { Router } from "express";
import { search } from "../controllers/searchController.js";

export const searchRouter = Router();

searchRouter.get("/search", search);
