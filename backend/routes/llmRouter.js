import { Router } from "express";
import {
  llmSuggestions,
  llmGradingParticipants,
} from "../controllers/llmController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { llmGradingEligibility } from "../middleware/checkFeatureEligibility.js";

export const llmRouter = Router();

llmRouter.get("/llm/suggestions", checkAuth, llmSuggestions);
llmRouter.get("/llm/grading", checkAuth, llmGradingParticipants);
