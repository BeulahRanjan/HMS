import express from 'express';
import auth from '../middleware/auth.js';
import apptController from '../controller/appt.js';

const router = express.Router();

router.post('/addAppt', auth,apptController.addAppt);
router.delete('/delAppt/:id', auth , apptController.delAppt);
router.get('/getAppt/:id', auth , apptController.getAppt);
router.get('/getAllAppts', auth , apptController.getAllAppts);
router.put('/upAppt/:id', auth , apptController.upAppt);
router.get('/doctor/appointments', auth, apptController.getDoctorAppts);

export default router;

