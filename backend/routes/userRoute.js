import { Router } from "express";
import { editUserById, getUserByUsername, editUserAvatar, getUserByUserId } from "../controllers/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { uploadImage } from "../middleware/uploadImage.js";

export const userRoute = Router();

userRoute.patch('/users/:id/avatar', uploadImage.single('avatar'), editUserAvatar);
userRoute.get('/users/:username', checkAuth, getUserByUsername);
userRoute.get('/users/:id', checkAuth, getUserByUserId);
userRoute.put('/users/:id', checkAuth, editUserById)