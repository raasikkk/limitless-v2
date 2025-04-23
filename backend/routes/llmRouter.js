import { Router } from "express";
import { llmSuggestions, llmAnswerGrading } from "../controllers/llmController.js";
import { checkAuth } from "../middleware/checkAuth.js";

export const llmRouter = Router();

llmRouter.get("/llm/suggestions", checkAuth, llmSuggestions);
llmRouter.get("/llm/grading", checkAuth, llmSuggestions);
