import { Router } from "express";
import { getUserFollowersById, getUserFollowingById } from "../controllers/followerController.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const followerRoute = Router();

followerRoute.get('/followers/:user_id', checkAuth, getUserFollowersById);
followerRoute.get('/following/:user_id', checkAuth, getUserFollowingById);