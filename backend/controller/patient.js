import patient from "../models/patient.js";
import Receptionist from "../models/recep.js";
import dotenv from "dotenv";

dotenv.config();

async function addPatient(req, res) {
    try{
        const {name,age, gender, email, phone_no, address, blood_group } = req.body;
        if(!name || !age || !gender || !email || !phone_no || !address || !blood_group){
            return res.status(400).json({message:"Please fill all the fields"});
        }
            const userId = req.user.userId; // Logged-in user
            const receptionist = await Receptionist.findOne({ user: userId });

               
               if (!receptionist) {
                console.log(userId);
               return res.status(404).json({ message: "Receptionist profile not found" });
               }

            const pat = new patient({
            name,
            age,
            gender,
            email,
            phone_no,
            address, 
            blood_group,
            created_by: receptionist._id
        });
        const savedPat = await pat.save();
        return res.status(201).json({message:"Patient added successfully"});
    }
    catch (error) {
        console.log("Error in adding patient:", error);
        return res.status(500).json({message:"Error in adding patient"});
    }
}

async function delPatient(req, res) {
    try{
        const patientname = req.params.name;
        const pat = await patient.findByIdAndDelete(patientname); 
        if (!pat) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json({message:"Patient deleted successfully"});
    }
    catch(error){
        console.log("Error in deleting patient:", error);
        return res.status(500).json({message:"Error in deleting patient"});
    }
}

async function getPatByName(req,res) {
    try{
        const patName = req.params.name;
        const pat = await patient.find({ name: patName }).populate('created_by', 'name _id'); 
        if (!pat) {
            return res.status(404).json({ message: "Patient not found" });
        }
        return res.status(200).json({ pat });
    }
    catch (error) {
        console.log("Error in getting patient:", error);
        return res.status(500).json({ message: "Error in getting patient" });
    }
}

async function getAllPat(req,res) {
    try{
        const patients = await patient.find().populate(('receptionist', 'name _id'));
        if (!patients) {
            return res.status(404).json({ message: "No patients found" });
        }
        return res.status(200).json({ patients });
    }
    catch(error){
        console.log("Error getting all patients", error);
        return res.status(500).json({message:"Error getting patients"});
    }
}

async function upPatient(req,res) {
    try{
        const patName = req.params.name;
        const data = req.body;
        const patient = await patient.findByIdAndUpdate({ name: patName }, data, { new: true});
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        } 
        return res.status(200).json({ message: "Patient updated successfully", patient });
    }
    catch(error) {
        console.log("Error in updating patient:", error);
        return res.status(500).json({ message: "Error in updating patient" });
    }
}

const patController = {
    addPatient: addPatient,
    delPatient: delPatient,
    getPatByName: getPatByName,
    getAllPat: getAllPat,
    upPatient: upPatient
}

export default patController;