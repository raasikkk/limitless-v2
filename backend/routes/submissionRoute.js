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

export const submissionRoute = Router();

submissionRoute.post(
  "/submissions",
  checkAuth,
  uploadImage.single("image"),
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
  editSubmissionText
);
submissionRoute.put(
  "/submissions/:submission_id/image",
  checkAuth,
  uploadImage.single("image"),
  editSubmissionImage
);
submissionRoute.delete(
  "/submissions/:submission_id",
  checkAuth,
  deleteSubmission
);

submissionRoute.post("/submissions/vote", checkAuth, vote);
submissionRoute.get("/submissions/:submissionId/votes", checkAuth, getVotes);
submissionRoute.delete(
  "/submissions/:submissionId/:userId",
  checkAuth,
  cancelVote
);
