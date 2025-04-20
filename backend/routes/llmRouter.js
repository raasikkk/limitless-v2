/*
  This file basically just uses Bearer-Authentication Token validation
  and provides routes that sends request to LLMs.

  That's pretty much it, nothing special.

  F1awless77 - 20.04.2025
*/

import { Router } from "express";
import { llmSuggestions } from "../controllers/llmController.js";
import { isLogged } from "../controllers/authController.js";

export const llmRouter = Router();

llmRouter.get("/llm/suggestions", llmSuggestions);
