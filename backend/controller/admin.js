import Admin from "../models/admin.js";
import User from "../models/user.js";
import dotenv from "dotenv";
import Department from "../models/dept.js";

dotenv.config();

async function addAdmin(req, res) {
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

        const admin= new Admin({
            name,
            email,
            phone_no,
            department:dept._id,
            experience,
            user: userId
        });
        const savedAdmin = await admin.save();
        await User.findByIdAndUpdate(userId, {hasSubmittedForm: true});
        return res.status(201).json({message:"Admin added successfully"});
    }
    catch(error){
        console.log("Error in adding admin:", error);
        return res.status(500).json({message:"Error in adding admin"});
    }
}

async function delAdmin(req, res) {
    try{ 
        const adminId =req.params.id;
        const admin =await Admin.findByIdAndDelete(adminId);
        return res.status(200).json({message:"Admin deleted successfully"});
    }
    catch(error){
        console.log("Error in deleting admin:", error);
        return res.status(500).json({message:"Error in deleting admin"});
    }   
}

async function getAdmin(req,res) {
    try{
    const adminId = req.params.id;
    const admin = await Admin.findById(adminId).populate('department', 'name');
    return res.status(200).json({admin});
    }
    catch(error){
        console.log("Error in getting admin:", error);
        return res.status(500).json({message:"Error in getting admin"});
    }
}

async function getAllAdmins(req,res) {
    try{
        const admins = await Admin.find().populate('department', 'name');
        return res.status(200).json({admins});
    }
    catch(error){
        console.log("Error in getting all admins:", error);
        return res.status(500).json({message:"Error in getting all admins"});
    }
}


async function upAdmin(req,res) {
    try{
        const adminId = req.params.id;
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
        const admin = await Admin.findByIdAndUpdate(nurseId, data, {new: true});
        return res.status(200).json({message:"Admin updated successfully", admin});
    }
    catch(error){
        console.log("Error in updating admin:", error);
        return res.status(500).json({message:"Error in updating admin"});
    }
}

const adminController ={
    addAdmin:addAdmin,
    delAdmin:delAdmin,
    getAdmin:getAdmin,
    getAllAdmins:getAllAdmins,
    upAdmin:upAdmin
}

export default adminController;