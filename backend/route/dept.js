import express from 'express';
import auth  from '../middleware/auth.js';
import deptController from '../controller/dept.js';

const router = express.Router();

router.post('/addDept', auth , deptController.addDept);
router.delete('/delDept/:id', auth , deptController.delDept);
router.get('/getDept/:id', auth , deptController.getDept);
router.get('/getAllDept', auth , deptController.getAllDept);
router.get('/getDeptByName/:name', auth , deptController.getDeptByName);
router.put('/upDept/:id', auth , deptController.upDept);

export default router;