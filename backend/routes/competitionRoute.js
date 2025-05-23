import { Router } from "express";
import { createCompetition, editDescription, editRules, editTitle, getCategories, getCompetitionById, getCompetitions, getCompetitionsByCategory, getLeaderboard, getParticipants, joinCompetition, kickUser, quitCompetition, saveSettings, uploadCoverForCompetition } from "../controllers/competitionController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { validateCompetition } from "../middleware/validateCompetition.js";
import { createCompetitionLimiter, joinQuitLimiter, kickUserLimiter, limiter, updateLimiter } from "../middleware/limiter.js";
import { cacheCategories, cacheCategoryById, cacheCompetitionById, cacheCompetitionsList, cacheLeaderboard, cacheParticipants } from "../middleware/cache/cacheCompetition.js";

export const competitionRoute = Router();


competitionRoute.post('/competitions', createCompetitionLimiter, checkAuth, createCompetition);
competitionRoute.put('/competitions/:id/settings', updateLimiter, checkAuth, validateCompetition, saveSettings);
competitionRoute.patch('/competitions/:id/cover', updateLimiter, checkAuth, validateCompetition, uploadImage.single('cover'), uploadCoverForCompetition);
competitionRoute.patch('/competitions/:id/description', updateLimiter, checkAuth, validateCompetition, editDescription);
competitionRoute.patch('/competitions/:id/rules', updateLimiter, checkAuth, validateCompetition, editRules); 
competitionRoute.patch('/competitions/:id/title', updateLimiter, checkAuth, validateCompetition, editTitle); 
competitionRoute.get('/competitions', cacheCompetitionsList, limiter, getCompetitions);
competitionRoute.get('/competitions/:id', cacheCompetitionById, limiter, getCompetitionById);
competitionRoute.get('/competitions/category/:category', cacheCategoryById, limiter, getCompetitionsByCategory)
competitionRoute.delete('/competitions/:id/kick/:user_id', kickUserLimiter, checkAuth, validateCompetition, kickUser)

competitionRoute.post('/competitions/join', joinQuitLimiter, checkAuth, joinCompetition);
competitionRoute.delete('/competitions/quit/:competition_id', joinQuitLimiter, checkAuth, quitCompetition);
competitionRoute.get('/competitions/:competition_id/participants', cacheParticipants, limiter, getParticipants);
competitionRoute.get("/competitions/:competitionId/leaderboard", cacheLeaderboard, limiter,checkAuth, getLeaderboard);

competitionRoute.get("/categories", cacheCategories, limiter, getCategories);