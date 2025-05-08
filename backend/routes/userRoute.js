import { Router } from "express";
import { editUserById, getUserByUsername, editUserAvatar, getUserByUserId, search, getUserCompetitions, editUsername, sendFeedback } from "../controllers/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { feedbackLimiter, limiter, updateLimiter } from "../middleware/limiter.js";

export const userRoute = Router();

userRoute.patch('/users/avatar', updateLimiter, checkAuth, uploadImage.single('avatar'), editUserAvatar);
// userRoute.get('/users/:username', checkAuth, getUserByUsername);
userRoute.get('/users/:id', limiter, checkAuth, getUserByUserId);
userRoute.get('/search', limiter, search);
userRoute.get('/users/:id/competitions', limiter, checkAuth, getUserCompetitions);
userRoute.patch('/users/', updateLimiter, checkAuth, editUserById);
userRoute.patch('/users/username', updateLimiter, checkAuth, editUsername);

userRoute.post('/feedback', feedbackLimiter, checkAuth, sendFeedback)