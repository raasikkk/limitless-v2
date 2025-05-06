import { Router } from "express";
import {
  llmSuggestions,
  llmGradingParticipants,
  llmAdvice,
} from "../controllers/llmController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { llmGradingEligibility } from "../middleware/checkFeatureEligibility.js";
import { validateCompetition } from "../middleware/validateCompetition.js";

export const llmRouter = Router();

llmRouter.put("/llm/suggestions/:competition_id", checkAuth, validateCompetition, llmSuggestions);
llmRouter.put(
  "/llm/grading/:competition_id",
  checkAuth,
  validateCompetition,
  llmGradingParticipants
);
llmRouter.get("/llm/advice", checkAuth, llmAdvice);
