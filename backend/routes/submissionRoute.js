import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import {
  cancelVote,
  deleteSubmission,
  editSubmissionImage,
  editSubmissionText,
  getSubmissions,
  getUserSubmission,
  getVotes,
  sendSubmission,
  vote,
} from "../controllers/submissionController.js";
import { uploadImage } from "../middleware/uploadImage.js";
import { submissionIsValid } from "../middleware/filterIsValid.js";
import { validateParticipant } from "../middleware/validateParticipant.js";
import { limiter, submitLimiter, updateLimiter, voteLimiter } from "../middleware/limiter.js";

export const submissionRoute = Router();

submissionRoute.post(
  "/submissions",
  submitLimiter,
  checkAuth,
  uploadImage.single("image"),
  validateParticipant,
  submissionIsValid,
  sendSubmission
);
submissionRoute.get("/submissions/:competitionId", limiter, checkAuth, getSubmissions);
submissionRoute.get(
  "/submissions/user/:submission_id",
  limiter,
  checkAuth,
  getUserSubmission
);
submissionRoute.put(
  "/submissions/:submission_id/explanation",
  updateLimiter,
  checkAuth,
  validateParticipant,
  editSubmissionText
);
submissionRoute.put(
  "/submissions/:submission_id/image",
  updateLimiter,
  checkAuth,
  validateParticipant,
  uploadImage.single("image"),
  editSubmissionImage
);
submissionRoute.delete(
  "/submissions/:competitionId",
  submitLimiter,
  checkAuth,
  deleteSubmission
);

submissionRoute.post("/submissions/vote", voteLimiter, checkAuth, validateParticipant, vote);
submissionRoute.get("/submissions/:submissionId/votes", limiter, checkAuth, getVotes);
submissionRoute.delete(
  "/submissions/vote/:submissionId",
  voteLimiter,
  checkAuth,
  cancelVote
);
