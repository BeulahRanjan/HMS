import Doctor from '../models/doctor.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import Department from '../models/dept.js';

dotenv.config();

async function addDoctor(req, res) {
    console.log("Adding doctor:", req.body);
    try{
        const {email, name, phone_no, dob, department, specialization, experience,status, gender, shift} =req.body;
        if(!email || !name || !phone_no ||!dob || !department || !specialization || !experience ||!status ||
            !gender|| !shift
        ){
            return res.status(400).json({message:"Please fill all the fields"});
        }

        const userId = req.user.userId;
        console.log("User ID from token:", userId);
        const user = await User.findById(userId);
        if(!user){
           return  res.status(404).json({message:"User not found"});
        }

         const dept = await Department.findById(department);
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

        const doc= new Doctor({
            name,
            email,
            phone_no,
            dob,
            department: dept._id,
            specialization,
            experience,
            status,
            gender,
            shift,
            user: userId
        });
        const savedDoc = await doc.save();
        
       await User.findByIdAndUpdate(userId, { hasSubmittedForm: true });
        return res.status(201).json({message:"Doctor added successfully"});
    }
    catch(error){
        console.log("Error in adding doctor:", error);
        return res.status(500).json({message:"Error in adding doctor"});
    }
}

async function delDoctor(req, res) {
    try{
        const doctorId =req.params.id;
        const doctor = await Doctor.findByIdAndDelete(doctorId);
        return res.status(200).json({message:"Doctor deleted successfully"});
    }
    catch(error){
        console.log("Error in deleting doctor:", error);
        return res.status(500).json({message:"Error in deleting doctor"});
    }
}

async function getDoctor(req, res) {
  try {
    const doctorId = req.params.id;

    const doctor = await Doctor.findById(doctorId)
      .populate('department', 'name _id')
       .populate("user", "email _id");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json({ doctor });
  } catch (error) {
    console.error("Error in getting doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


async function getDocByName(req,res) {
    try{
        const docName = req.params.name;
        const doc = await Doctor.findOne({ name: docName }).populate('department', 'name');
        if (!doc) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        return res.status(200).json({ doctor:doc });
    }
    catch (error) {
        console.log("Error in getting doctor:", error);
        return res.status(500).json({ message: "Error in getting doctor" });
    }
}
       

async function getAllDoctors(req,res) {
    try{
        const doctors = await Doctor.find().populate('department', 'name');
        return res.status(200).json({doctors});
;
    }
    catch(error){
        console.log("Error in getting all doctors:", error);
        return res.status(500).json({message:"Error in getting all doctors"});
    }
}

async function getdeptDoc(req,res) {
    try{
        const deptName = req.params.department;
        const department = await Department.findOne({ name: deptName });

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        const doctors = await Doctor.find({ department: department._id }).populate('department', 'name');
        return res.status(200).json({ doctors });

    }
    catch(error){
        console.log("Error in getting doctors by department:", error);
        return res.status(500).json({message:"Error in getting doctors by department"});
    }
}

// async function upDoctor(req,res){
//     try{
//         const doctorId = req.params.id;
//         // const data = req.body;
//         const { department, ...data } = req.body;

//         let departmentId = null;
//         if (department) {
//             const dept = await Department.findOne({ name: department });
//             if (!dept) {
//                 return res.status(404).json({ message: "Department not found" });
//             }
//             departmentId = dept._id;
//         }

//         // If a valid departmentId is found, add it to the data object
//         if (departmentId) {
//             data.department = departmentId;
//         }

//         const doctor = await Doctor.findByIdAndUpdate(doctorId, data, {new:true});
//         return res.status(200).json({message:"Doctor updated successfully", doctor});
//     }
//     catch(error){
//         console.log("Error in updating doctor:", error);
//         return res.status(500).json({message:"Error in updating doctor"});
//     }

// }
async function upDoctor(req, res){
  try {
    const {
      name,
      email,
      phone_no,
      dob,
      department,
      specialization,
      experience,
      status,
      gender,
      shift,
      user
    } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone_no,
        dob,
        department,
        specialization,
        experience,
        status,
        gender,
        shift,
        user // 👈 explicitly updating user
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ doctor: updatedDoctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


async function getMyDoctorProfile(req, res) {
  try {
    const userId = req.user.userId;

    const doctor = await Doctor.findOne({ user: userId })
      .populate("department", "name");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    return res.status(200).json({ doctor });
  } catch (error) {
    console.log("Error fetching doctor profile:", error);
    return res.status(500).json({ message: "Error fetching doctor profile" });
  }
}


async function uploadProfileImage(req, res) {
  try {
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    const userId = req.user.userId;

    // ✅ FIND DOCTOR USING USER ID
    const doctor = await Doctor.findOneAndUpdate(
      { user: userId },          // 👈 IMPORTANT FIX
      { profileImage: imagePath },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: "Profile image updated successfully",
      imagePath: doctor.profileImage,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
}






const docController = {
    addDoctor: addDoctor,
    getAllDoctors: getAllDoctors,
    getDoctor: getDoctor,
    getDocByName: getDocByName,
    upDoctor: upDoctor,
    delDoctor: delDoctor,
    getdeptDoc: getdeptDoc,
    uploadProfileImage: uploadProfileImage,
    getMyDoctorProfile: getMyDoctorProfile
}
export default docController;