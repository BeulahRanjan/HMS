import Doctor from '../models/doctor.js';
import User from '../models/user.js';
import dotenv from 'dotenv';
import Department from '../models/dept.js';

dotenv.config();

async function addDoctor(req, res) {
    console.log("Adding doctor:", req.body);
    try{
        const {email, name, phone_no, department, specialization, experience} =req.body;
        if(!email || !name || !phone_no || !department || !specialization || !experience){
            return res.status(400).json({message:"Please fill all the fields"});
        }

        const userId = req.user.userId;
        console.log("User ID from token:", userId);
        const user = await User.findById(userId);
        if(!user){
           return  res.status(404).json({message:"User not found"});
        }

          const dept = await Department.findOne({ name: department });
        if (!dept) {
            return res.status(404).json({ message: "Department not found" });
        }

        const doc= new Doctor({
            name,
            email,
            phone_no,
            department: dept._id,
            specialization,
            experience,
            user: userId
        });
        const savedDoc = await doc.save();
        // console.log("Request params are:", req.params.id);
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

async function getDoctor(req,res) {
    try{
    const doctorId = req.params.id;
    const doctor = await Doctor.findById(doctorId).populate('department', 'name');
;
    return res.status(200).json({doctor});
    }
    catch(error){
        console.log("Error in getting doctor:", error);
        return res.status(500).json({message:"Error in getting doctor"});
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

async function upDoctor(req,res){
    try{
        const doctorId = req.params.id;
        // const data = req.body;
        const { department, ...data } = req.body;

        let departmentId = null;
        if (department) {
            const dept = await Department.findOne({ name: department });
            if (!dept) {
                return res.status(404).json({ message: "Department not found" });
            }
            departmentId = dept._id;
        }

        // If a valid departmentId is found, add it to the data object
        if (departmentId) {
            data.department = departmentId;
        }

        const doctor = await Doctor.findByIdAndUpdate(doctorId, data, {new:true});
        return res.status(200).json({message:"Doctor updated successfully", doctor});
    }
    catch(error){
        console.log("Error in updating doctor:", error);
        return res.status(500).json({message:"Error in updating doctor"});
    }

}

const docController = {
    addDoctor: addDoctor,
    getAllDoctors: getAllDoctors,
    getDoctor: getDoctor,
     upDoctor: upDoctor,
    delDoctor: delDoctor,
    getdeptDoc: getdeptDoc
}
export default docController;