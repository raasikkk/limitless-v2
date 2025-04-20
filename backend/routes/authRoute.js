import { Router } from "express";
import { login } from "../controllers/authController.js";

export const authRoute = Router();

authRoute.post('/register', ()=> {});
authRoute.post('/login', login);
authRoute.get('/logout', ()=> {});
authRoute.get('/isLogged', ()=> {});