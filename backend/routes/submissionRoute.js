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

export const submissionRoute = Router();

submissionRoute.post(
  "/submissions",
  checkAuth,
  uploadImage.single("image"),
  validateParticipant,
  submissionIsValid,
  sendSubmission
);
submissionRoute.get("/submissions/:competitionId", checkAuth, getSubmissions);
submissionRoute.get(
  "/submissions/user/:submission_id",
  checkAuth,
  getUserSubmission
);
submissionRoute.put(
  "/submissions/:submission_id/explanation",
  checkAuth,
  validateParticipant,
  editSubmissionText
);
submissionRoute.put(
  "/submissions/:submission_id/image",
  checkAuth,
  validateParticipant,
  uploadImage.single("image"),
  editSubmissionImage
);
submissionRoute.delete(
  "/submissions/:competitionId",
  checkAuth,
  deleteSubmission
);

submissionRoute.post("/submissions/vote", checkAuth, validateParticipant, vote);
submissionRoute.get("/submissions/:submissionId/votes", checkAuth, getVotes);
submissionRoute.delete(
  "/submissions/vote/:submissionId",
  checkAuth,
  cancelVote
);
