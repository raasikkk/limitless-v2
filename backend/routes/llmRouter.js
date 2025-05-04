import { Router } from "express";
import {
  llmSuggestions,
  llmGradingParticipants,
  llmAdvice,
} from "../controllers/llmController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { llmGradingEligibility } from "../middleware/checkFeatureEligibility.js";

export const llmRouter = Router();

llmRouter.put("/llm/suggestions/:competition_id", checkAuth, llmSuggestions);
llmRouter.get(
  "/llm/grading/:competition_id",
  checkAuth,
  llmGradingParticipants
);
llmRouter.get("/llm/advice/:user_id", checkAuth, llmAdvice);
