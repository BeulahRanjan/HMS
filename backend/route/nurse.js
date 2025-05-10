import express from 'express';
import auth  from '../middleware/auth.js';
import nurController from '../controller/nurse.js';

const router = express.Router();

router.post('/addNurse', auth , nurController.addNurse);
router.delete('/delNurse/:id', auth, nurController.delNurse);
router.get('/getNurse/:id', auth, nurController.getNurse);
router.get('/getAllNurses', auth, nurController.getAllNurses);
router.get('/getdeptNurse/:department', auth, nurController.getdeptNurse);
router.put('/upNurse/:id', auth, nurController.upNurse);

export default router;