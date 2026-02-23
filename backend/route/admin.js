import express from 'express';
import auth  from '../middleware/auth.js';
import adminController from '../controller/admin.js';

const router = express.Router();

router.post('/addAdmin', auth , adminController.addAdmin);
router.delete('/delAdmin/:id', auth, adminController.delAdmin);
router.get('/getAdmin/:id', auth, adminController.getAdmin);
router.get('/getAllAdmins', auth, adminController.getAllAdmins);
router.put('/upAdmin/:id', auth, adminController.upAdmin);

export default router;