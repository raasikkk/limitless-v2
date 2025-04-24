import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { deleteSubmission, editSubmissionText, getSubmissions, sendSubmission } from "../controllers/submissionController.js";
import { uploadImage } from "../middleware/uploadImage.js";

export const submissionRoute = Router();

submissionRoute.post('/submissions', checkAuth, uploadImage.single('image'), sendSubmission);
submissionRoute.get('/submissions/:competitionId', checkAuth, getSubmissions);
submissionRoute.put('/submissions/:competitionId/:userId/explanation',checkAuth,editSubmissionText);
submissionRoute.delete('/submissions/:competitionId/:userId', checkAuth, deleteSubmission);