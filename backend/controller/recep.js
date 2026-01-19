import Receptionist from "../models/recep.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

async function addRecep(req,res) {
    try{
        const { name, email, phone_no,dob, experience,gender, shift,joining_date } =req.body;
        if ( !name || !email || !phone_no ||!dob || !experience || !gender || !shift || !joining_date) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const recep = new Receptionist({
            name,
            email,
            phone_no,
            dob,
            experience,
            user: userId,
            gender,
            shift,
            joining_date
        });
        const savedRecep = await recep.save();
        
        await User.findByIdAndUpdate(userId, {hasSubmittedForm: true});
        return res.status(201).json({ message: "Receptionist added successfully" });
    }
    catch (error) {
        console.log("Error in adding receptionist:", error);
        return res.status(500).json({ message: "Error in adding receptionist" });
    }
}

async function delRecep(req, res) {
  try {
    const recepId = req.params.id;

    const recep = await Receptionist.findByIdAndDelete(recepId);
    if (!recep) {
      return res.status(404).json({ message: "Receptionist not found" });
    }

    return res.status(200).json({ message: "Receptionist deleted successfully" });
  } catch (error) {
    console.log("Error in deleting receptionist:", error);
    return res.status(500).json({ message: "Error in deleting receptionist" });
  }
}


async function getRecep(req, res) {
 try {
    const recep = await Receptionist.findById(req.params.id);
    
    if (!recep) return res.status(404).json({ message: "Receptionist not found" });
    res.status(200).json({ recep });
  } catch (err) {
    console.error(err);
    console.log("Fetched receptionist:", recep);
    res.status(500).json({ message: "Error fetching receptionist" });
  }
}

async function getAllRecep(req, res) {
    try{
        const receps = await Receptionist.find();
        if (!receps) {
            return res.status(404).json({ message: "No receptionists found" });
        }
        return res.status(200).json({ receps });
    }
    catch (error) {
        console.log("Error in getting all receptionists:", error);
        return res.status(500).json({ message: "Error in getting all receptionists" });
    }
}

async function upRecep(req, res) {
  try {
    const recepId = req.params.id;
    const data = req.body;

    const recep = await Receptionist.findByIdAndUpdate(
      recepId,
      data,
      { new: true }
    );

    if (!recep) {
      return res.status(404).json({ message: "Receptionist not found" });
    }

    return res.status(200).json({
      message: "Receptionist updated successfully",
      recep
    });
  } catch (error) {
    console.log("Error in updating receptionist:", error);
    return res.status(500).json({ message: "Error in updating receptionist" });
  }
}


async function getMyRecepProfile(req, res) {
  try {
    const userId = req.user.userId;

    const recep = await Receptionist.findOne({ user: userId });

    if (!recep) {
      return res.status(404).json({ message: "Receptionist profile not found" });
    }

    return res.status(200).json({ recep });
  } catch (error) {
    console.log("Error fetching receptionist profile:", error);
    return res.status(500).json({ message: "Error fetching receptionist profile" });
  }
}


async function uploadRecepProfileImage(req, res) {
  try {
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const userId = req.user.userId;

    // ✅ FIND RECEPTIONIST USING USER ID
    const recep = await Receptionist.findOneAndUpdate(
      { user: userId },          // 👈 IMPORTANT FIX
      { profileImage: imagePath },
      { new: true }
    );

    if (!recep) {
      return res.status(404).json({ message: "Receptionist not found" });
    }

    res.status(200).json({
      message: "Profile image updated successfully",
      imagePath: recep.profileImage,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};








 
const recepController = {
    addRecep: addRecep,
    delRecep: delRecep,
    getRecep: getRecep,
    getAllRecep: getAllRecep,
    upRecep: upRecep,
    getMyRecepProfile: getMyRecepProfile,
    uploadRecepProfileImage: uploadRecepProfileImage    
}

export default recepController;