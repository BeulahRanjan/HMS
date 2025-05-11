import Receptionist from "../models/recep.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

async function addRecep(req,res) {
    try{
        const { name, email, phone_no, experience, shift } =req.body;
        if ( !name || !email || !phone_no || !experience) {
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
            experience,
            user: userId,
            shift
        });
        const savedRecep = await recep.save();
        return res.status(201).json({ message: "Receptionist added successfully" });
    }
    catch (error) {
        console.log("Error in adding receptionist:", error);
        return res.status(500).json({ message: "Error in adding receptionist" });
    }
}

async function delRecep(req, res) {
    try{
        const recepname =req.params.name;
        const recep = await Receptionist.findByIdAndDelete(recepname);
        return res.status(200).json({message:"Receptionist deleted successfully"});
    }
    catch(error){
        console.log("Error in deleting receptionist:", error);
        return res.status(500).json({message:"Error in deleting receptionist"});
    }
}

async function getRecep(req,res) {
    try{
        const recepname =req.params.name;
        const recep = await Receptionist.find({ name: recepname });
        if (!recep) {
            return res.status(404).json({ message: "Receptionist not found" });
        }
        return res.status(200).json({ recep });
    }
    catch (error) {
        console.log("Error in getting receptionist:", error);
        return res.status(500).json({ message: "Error in getting receptionist" });
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
    try{
        const recepname = req.params.name;
        const data = req.body;
        const recep = await Receptionist.findOneAndUpdate({ name: recepname }, data, { new: true });
        if (!recep) {
            return res.status(404).json({ message: "Receptionist not found" });
        }
        return res.status(200).json({ message: "Receptionist updated successfully", recep });
    }
    catch (error) {
        console.log("Error in updating receptionist:", error);
        return res.status(500).json({ message: "Error in updating receptionist" });
    }
}
 
const recepController = {
    addRecep: addRecep,
    delRecep: delRecep,
    getRecep: getRecep,
    getAllRecep: getAllRecep,
    upRecep: upRecep
}

export default recepController;