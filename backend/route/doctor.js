import express from 'express';
import auth  from '../middleware/auth.js';
import docController from '../controller/doctor.js';
import upload from '../middleware/upload.js';


const router = express.Router();

router.post('/addDoctor', auth , docController.addDoctor);
router.delete('/delDoctor/:id', auth, docController.delDoctor);
router.get('/getDoctor/:id', auth, docController.getDoctor);
router.get('/getDocByName/:name', auth, docController.getDocByName);
router.get('/getAllDoctors', auth, docController.getAllDoctors);
router.get('/getdeptDoc/:department', auth, docController.getdeptDoc);
router.put('/upDoctor/:id', auth, docController.upDoctor);
router.get('/profile', auth, docController.getMyDoctorProfile);
router.put(
  "/upload-profile-image",
  auth,
  upload.single("profileImage"), // MUST match frontend
  docController.uploadProfileImage
);


export default router;