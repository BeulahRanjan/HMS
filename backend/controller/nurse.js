import Nurse from "../models/nurse.js";
import User from "../models/user.js";
import dotenv from "dotenv";
import Department from "../models/dept.js";

dotenv.config();

async function addNurse(req, res) {
    try{
        const {email, name, phone_no, department, experience} =req.body;
        if(!email || !name || !phone_no || !department || !experience){
            return res.status(400).json({message:"Please fill all the fields"});
        }

        const userId = req.user.userId;
        const user = await User.findById(userId);
        if(!user){
           return  res.status(404).json({message:"User not found"});
        }

        const dept = await Department.findOne({ name: department });
        if(!dept) {
        return res.status(404).json({ message: "Department not found" });    
        }

        const nurse= new Nurse({
            name,
            email,
            phone_no,
            department:dept._id,
            experience,
            user: userId
        });
        const savedNurse = await nurse.save();
        return res.status(201).json({message:"Nurse added successfully"});
    }
    catch(error){
        console.log("Error in adding nurse:", error);
        return res.status(500).json({message:"Error in adding nurse"});
    }
}

async function delNurse(req, res) {
    try{ 
        const nurseId =req.params.id;
        const nurse =await Nurse.findByIdAndDelete(nurseId);
        return res.status(200).json({message:"Nurse deleted successfully"});
    }
    catch(error){
        console.log("Error in deleting nurse:", error);
        return res.status(500).json({message:"Error in deleting nurse"});
    }   
}

async function getNurse(req,res) {
    try{
    const nurseId = req.params.id;
    const nurse = await Nurse.findById(nurseId).populate('department', 'name');
    return res.status(200).json({nurse});
    }
    catch(error){
        console.log("Error in getting nurse:", error);
        return res.status(500).json({message:"Error in getting nurse"});
    }
}

async function getAllNurses(req,res) {
    try{
        const nurses = await Nurse.find().populate('department', 'name');
        return res.status(200).json({nurses});
    }
    catch(error){
        console.log("Error in getting all nurses:", error);
        return res.status(500).json({message:"Error in getting all nurses"});
    }
}

async function getdeptNurse(req,res) {
    try{
        const deptName = req.params.department;
        const department = await Department.findOne({ name: deptName });

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        const doctors = await Nurse.find({ department: department._id }).populate('department', 'name');
        return res.status(200).json({ doctors });

    }
    catch(error){
        console.log("Error in getting nurses by department:", error);
        return res.status(500).json({message:"Error in getting nurses by department"});
    }
}

async function upNurse(req,res) {
    try{
        const nurseId = req.params.id;
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
        const nurse = await Nurse.findByIdAndUpdate(nurseId, data, {new: true});
        return res.status(200).json({message:"Nurse updated successfully", nurse});
    }
    catch(error){
        console.log("Error in updating nurse:", error);
        return res.status(500).json({message:"Error in updating nurse"});
    }
}

const nurController ={
    addNurse:addNurse,
    delNurse:delNurse,
    getNurse:getNurse,
    getAllNurses:getAllNurses,
    getdeptNurse:getdeptNurse,
    upNurse:upNurse
}

export default nurController;