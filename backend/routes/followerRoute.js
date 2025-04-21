import { Router } from "express";
import { followUser, getUserFollowersById, getUserFollowingById, unfollowUser } from "../controllers/followerController.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const followerRoute = Router();


followerRoute.post('/follow', followUser);
followerRoute.delete('/unfollow/:user_id/:follower_id', unfollowUser);
followerRoute.get('/followers/:user_id', checkAuth, getUserFollowersById);
followerRoute.get('/following/:user_id', checkAuth, getUserFollowingById);