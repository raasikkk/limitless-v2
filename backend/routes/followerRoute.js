import { Router } from "express";
import { followUser, getUserFollowersById, getUserFollowingById, unfollowUser } from "../controllers/followerController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { followLimiter, limiter } from "../middleware/limiter.js";

export const followerRoute = Router();


followerRoute.post('/follow', followLimiter, checkAuth, followUser);
followerRoute.delete('/unfollow/:user_id', followLimiter, checkAuth, unfollowUser);
followerRoute.get('/followers/:user_id', limiter, checkAuth, getUserFollowersById);
followerRoute.get('/following/:user_id', limiter, checkAuth, getUserFollowingById);