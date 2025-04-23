import { Router } from "express";
import { createCompetition, getCategories, getCompetitionById, getCompetitions } from "../controllers/competitionController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const competitionRoute = Router();


competitionRoute.post('/competitions', checkAuth, createCompetition);
competitionRoute.get('/competitions', getCompetitions);
competitionRoute.get('/competitions/:id', getCompetitionById);
competitionRoute.get("/categories", getCategories);