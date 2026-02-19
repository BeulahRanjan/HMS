import express from 'express';
import auth from '../middleware/auth.js';
import feedbackController from '../controller/feedback.js';
const router = express.Router();

router.post('/addFeedback', auth, feedbackController.addFeedback);
router.get('/getAllFeedback', auth, feedbackController.getallFeedback);