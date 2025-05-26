import express from 'express';
import auth from '../middleware/auth.js';
import patController  from '../controller/patient.js';

const router= express.Router();

router.post('/addPatient', auth , patController.addPatient);
router.delete('/delPatient/:id', auth , patController.delPatient);
router.get('/getPatByName/:name', auth , patController.getPatByName);
router.get('/getAllPat', auth , patController.getAllPat);
router.put('/upPatient/:name', auth , patController.upPatient);


export default router;

 