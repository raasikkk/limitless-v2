import { Router } from "express";
import { isLogged, login, logout, register } from "../controllers/authController.js";
import {passport as GooglePassport} from '../services/passport.js';
import jwt from "jsonwebtoken";
import { limiter, loginLimiter, logoutLimiter, registerLimiter } from "../middleware/limiter.js";

const JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : 'best_secret_2025';

export const authRoute = Router();

authRoute.post('/api/register', registerLimiter, register);
authRoute.post('/api/login', loginLimiter, login);
authRoute.get('/api/logout', logoutLimiter, logout);
authRoute.get('/api/isLogged', limiter, isLogged);


// google oauth2
authRoute.get('/auth/google', loginLimiter, GooglePassport.authenticate('google',{
    scope: ['profile', 'email'],
    session: false
  })
)

authRoute.get('/auth/google/callback', loginLimiter,
GooglePassport.authenticate('google',{
  failureRedirect: `${process.env.FRONTEND_BASE_URL}/login`, session: false}), 
(req,res) => {
  if (!req.user) return res.status(401).json({ message: 'Authentication failed' });
  const token = jwt.sign(req.user, JWT_SECRET);
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: sevenDays,
    sameSite: process.env.NODE_ENV === "production" ? 'none' : 'Lax'
  });
  res.redirect(`${process.env.FRONTEND_BASE_URL}`)
})