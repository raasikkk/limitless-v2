import { Router } from "express";
import {
  llmSuggestions,
  llmGradingParticipants,
  llmAdvice,
} from "../controllers/llmController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { llmGradingEligibility } from "../middleware/checkFeatureEligibility.js";
import { validateCompetition } from "../middleware/validateCompetition.js";
import { llmLimiter } from "../middleware/limiter.js";

export const llmRouter = Router();

llmRouter.put("/llm/suggestions/:competition_id", llmLimiter, checkAuth, validateCompetition, llmSuggestions);
llmRouter.put(
  "/llm/grading/:competition_id",
  llmLimiter,
  checkAuth,
  validateCompetition,
  llmGradingParticipants
);
llmRouter.get("/llm/advice", llmLimiter, checkAuth, llmAdvice);
