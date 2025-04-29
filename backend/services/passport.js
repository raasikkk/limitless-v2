import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();
import { db } from "../db.js";


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_BASE_URL}/auth/google/callback`,
  passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const checkUser = await db.query('SELECT id, email, username, avatar, bio, created_at FROM users WHERE email = $1', [profile.emails[0].value]);
      if (checkUser.rows.length > 0) {
        return done(null, checkUser.rows[0])
      }

      const newUser = await db.query("INSERT INTO users (email, username, avatar, google_id) VALUES ($1, $2, $3, $4) RETURNING id, email, username, avatar, bio, created_at", [profile.emails[0].value, 'google-user' + profile.displayName, profile.photos[0].value, profile.id]);
      return done(null, newUser.rows[0]);
    } catch (error) {
      console.log('Error at google oauth2:', error);
      return done(error)
    }
  }
))

export {passport}