import { Router } from "express";
import { createCompetition, getCategories, getCompetitionById, getCompetitions, getParticipants, joinCompetition, quitCompetition } from "../controllers/competitionController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const competitionRoute = Router();


competitionRoute.post('/competitions', checkAuth, createCompetition);
competitionRoute.get('/competitions', getCompetitions);
competitionRoute.get('/competitions/:id', getCompetitionById);

competitionRoute.post('/competitions/join', checkAuth, joinCompetition);
competitionRoute.delete('/competitions/quit/:competition_id/:user_id', checkAuth, quitCompetition);
competitionRoute.get('/competitions/:competition_id/participants', getParticipants);

competitionRoute.get("/categories", getCategories);