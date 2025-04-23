import { Router } from "express";
import { getCategories } from "../controllers/competitionController.js";


export const competitionRoute = Router();

competitionRoute.get("/categories", getCategories);