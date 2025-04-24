import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { deleteSubmission, editSubmissionImage, editSubmissionText, getSubmissions, sendSubmission, vote } from "../controllers/submissionController.js";
import { uploadImage } from "../middleware/uploadImage.js";

export const submissionRoute = Router();

submissionRoute.post('/submissions', checkAuth, uploadImage.single('image'), sendSubmission);
submissionRoute.get('/submissions/:competitionId', checkAuth, getSubmissions);
submissionRoute.put('/submissions/:competitionId/:userId/explanation',checkAuth,editSubmissionText);
submissionRoute.put('/submissions/:competitionId/:userId/image', checkAuth, uploadImage.single('image'), editSubmissionImage);
submissionRoute.delete('/submissions/:competitionId/:userId', checkAuth, deleteSubmission);

submissionRoute.post('/submissions/vote', checkAuth, vote);