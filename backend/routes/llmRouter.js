import { Router } from "express";
import { llmSuggestions } from "../controllers/llmController.js";
import { isLogged } from "../controllers/authController.js";

export const llmRouter = Router();

llmRouter.get("/llm/suggestions", isLogged, llmSuggestions);
