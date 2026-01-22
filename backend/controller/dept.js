import Department from "../models/dept.js";
import dotenv from "dotenv";

dotenv.config();

async function addDept(req, res) {
    try{
        const {name, description, No_of_doctors, No_of_nurses, No_of_surgeons, No_of_patients, No_of_attendants,
            Head_of_department, Equipment_list, floor, rooms, established_year} =req.body;
        if(!name || !description || !No_of_doctors || !No_of_nurses || !No_of_surgeons || !No_of_patients|| !No_of_attendants || !Head_of_department ||
            !Equipment_list || !floor || !rooms || !established_year
        ){
            return res.status(400).json({message:"Please fill all the fields"});
        }

        const dept= new Department({
            name,
            description,
            No_of_doctors,
            No_of_nurses,
            No_of_surgeons: 0,
            No_of_patients: 0,
            No_of_attendants: 0,
            Head_of_department: "",
            Equipment_list: [],
            floor: 0,
            rooms:0,
            established_year: 0
        });
        const savedDept = await dept.save();
        return res.status(201).json({message:"Department created successfully"});
    }
    catch(error){
        console.log("Error in adding deptartment details:", error);
        return res.status(500).json({message:"Error in adding department details"});
    }
}

async function delDept(req, res) {
    try{
        const deptid = req.params.id;
        const dept = await Department.findByIdAndDelete(deptid);
        return res.status(200).json({message:"Department deleted successfully"});
    }
    catch(error){
        console.log("Error in deleting department:", error);
        return res.status(500).json({message:"Error in deleting department"});
    }
}

async function getDept(req,res) {
    try{
        const deptId = req.params.id;
        const dept = await Department.findById(deptId);
        if(!dept){
            return res.status(404).json({message:"Department not found"});
        }
        return res.status(200).json(dept);
    }
    catch(error){
        console.log("Error in getting department:", error);
        return res.status(500).json({message:"Error in getting department"});
    }
}

async function getAllDept(req,res) {
    try{
        const depts = await Department.find();
        if(!depts){
            return res.status(404).json({message:"Departments not found"});
        }
        return res.status(200).json(depts);
    }
    catch(error){
        console.log("Error in getting departments:", error);
        return res.status(500).json({message:"Error in getting departments"});
    }
}

async function getDeptByName(req,res) {
    try{
        const deptName = req.params.name;
        const dept = await Department.findOne({ name: deptName });
        if(!dept){
            return res.status(404).json({message:"Department not found"});
        }
        return res.status(200).json({department:dept});
    }
    catch(error){
        console.log("Error in getting department by name:", error);
        return res.status(500).json({message:"Error in getting department by name"});
    }
}

async function upDept(req, res){
    try{
        const deptId = req.params.id;
        const data= req.body;
        const dept = await Department.findByIdAndUpdate(deptId, data, {new: true});
        if(!dept){
            return res.status(404).json({message:"Department not found"});
        }
        return res.status(200).json({message:"Department updated successfully"});
    }
    catch(error){
        console.log("Error in updating department:", error);
        return res.status(500).json({message:"Error in updating department"});
    }
}


const deptController = {
    addDept: addDept,
    delDept: delDept,
    getDept: getDept,
    getAllDept: getAllDept,
    getDeptByName: getDeptByName,
    upDept: upDept
}

export default deptController;