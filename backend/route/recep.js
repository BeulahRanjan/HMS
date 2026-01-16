import express from 'express';
import auth from '../middleware/auth.js';
import recepController from '../controller/recep.js';
import upload from '../middleware/upload.js';

const router = express.Router()

router.post("/addRecep", auth, recepController.addRecep);
router.get("/getAllRecep", auth, recepController.getAllRecep);

router.get("/getRecep/:id", auth, recepController.getRecep);
router.put("/upRecep/:id", auth, recepController.upRecep);
router.delete("/delRecep/:id", auth, recepController.delRecep);

router.get("/profile", auth, recepController.getMyRecepProfile);
router.put(
  "/upload-profile-image",
  auth,
  upload.single("profileImage"),
  recepController.uploadRecepProfileImage
);


export default router;