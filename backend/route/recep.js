import express from 'express';
import auth from '../middleware/auth.js';
import recepController from '../controller/recep.js';

const router = express.Router()

router.post('/addRecep', auth , recepController.addRecep);
router.delete('/delRecep/name', auth , recepController.delRecep);
router.get('/getRecep/name', auth , recepController.getRecep);
router.get('/getAllRecep', auth , recepController.getAllRecep);
router.put('/upRecep/name', auth , recepController.upRecep);

export default router;