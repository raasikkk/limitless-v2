import { Router } from "express";
import { createCompetition, editDescription, editRules, editTitle, getCategories, getCompetitionById, getCompetitions, getParticipants, joinCompetition, quitCompetition, uploadCoverForCompetition } from "../controllers/competitionController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { uploadImage } from "../middleware/uploadImage.js";

export const competitionRoute = Router();


competitionRoute.post('/competitions', checkAuth, createCompetition);
competitionRoute.put('/competitions/:id/cover', checkAuth, uploadImage.single('cover'), uploadCoverForCompetition);
competitionRoute.put('/competitions/:id/description', checkAuth, editDescription);
competitionRoute.put('/competitions/:id/rules', checkAuth, editRules); 
competitionRoute.put('/competitions/:id/title', checkAuth, editTitle); 
competitionRoute.get('/competitions', getCompetitions);
competitionRoute.get('/competitions/:id', getCompetitionById);

competitionRoute.post('/competitions/join', checkAuth, joinCompetition);
competitionRoute.delete('/competitions/quit/:competition_id/:user_id', checkAuth, quitCompetition);
competitionRoute.get('/competitions/:competition_id/participants', getParticipants);

competitionRoute.get("/categories", getCategories);