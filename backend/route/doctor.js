import express from 'express';
import auth  from '../middleware/auth.js';
import docController from '../controller/doctor.js';

const router = express.Router();

router.post('/addDoctor', auth , docController.addDoctor);
router.delete('/delDoctor/:id', auth, docController.delDoctor);
router.get('/getDoctor/:id', auth, docController.getDoctor);
router.get('/getAllDoctors', auth, docController.getAllDoctors);
router.get('/getdeptDoc/:department', auth, docController.getdeptDoc);
router.put('/upDoctor/:id', auth, docController.upDoctor);


export default router;