import express from 'express';
import auth from '../middleware/auth.js';
import feedbackController from '../controller/feedback.js';
const router = express.Router();

router.post('/addFeedback/:doctorId', auth, feedbackController.addFeedback);
router.get('/getAllFeedback', auth, feedbackController.getallFeedback);
router.get('/getFeedbackByDoctor/:doctorId', auth, feedbackController.getFeedbackByDoctor);

export default router;