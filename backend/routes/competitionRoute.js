import { Router } from "express";
import { createCompetition, editDescription, editRules, editTitle, getCategories, getCompetitionById, getCompetitions, getCompetitionsByCategory, getLeaderboard, getParticipants, joinCompetition, kickUser, quitCompetition, saveSettings, uploadCoverForCompetition } from "../controllers/competitionController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { validateCompetition } from "../middleware/validateCompetition.js";

export const competitionRoute = Router();


competitionRoute.post('/competitions', checkAuth, createCompetition);
competitionRoute.put('/competitions/:id/settings', checkAuth, validateCompetition, saveSettings);
competitionRoute.patch('/competitions/:id/cover', checkAuth, validateCompetition, uploadImage.single('cover'), uploadCoverForCompetition);
competitionRoute.patch('/competitions/:id/description', checkAuth, validateCompetition, editDescription);
competitionRoute.patch('/competitions/:id/rules', checkAuth, validateCompetition, editRules); 
competitionRoute.patch('/competitions/:id/title', checkAuth, validateCompetition, editTitle); 
competitionRoute.get('/competitions', getCompetitions);
competitionRoute.get('/competitions/:id', getCompetitionById);
competitionRoute.get('/competitions/category/:category', getCompetitionsByCategory)
competitionRoute.delete('/competitions/:id/kick/:user_id', checkAuth, validateCompetition, kickUser)

competitionRoute.post('/competitions/join', checkAuth, joinCompetition);
competitionRoute.delete('/competitions/quit/:competition_id', checkAuth, quitCompetition);
competitionRoute.get('/competitions/:competition_id/participants',checkAuth, getParticipants);
competitionRoute.get("/competitions/:competitionId/leaderboard",checkAuth, getLeaderboard);

competitionRoute.get("/categories", getCategories);
