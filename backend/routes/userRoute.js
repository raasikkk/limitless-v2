import { Router } from "express";
import { editUserById, getUserByUsername } from "../controllers/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";


export const userRoute = Router();

userRoute.get('/users/:username', checkAuth, getUserByUsername);
userRoute.put('/users/:id', checkAuth, editUserById)