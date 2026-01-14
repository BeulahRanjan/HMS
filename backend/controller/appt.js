import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import Receptionist from "../models/recep.js";
import Department from "../models/dept.js";
import Appointment from "../models/appt.js"; // Capitalized for convention
import dotenv from "dotenv";

dotenv.config();

async function addAppt(req, res) {
     console.log("Adding Appt:", req.body);
  try {
    const { patient, doctor, department, date, time, status } = req.body;

     const patientDoc = await Patient.findOne({ name: patient });
    const doctorDoc = await Doctor.findOne({ name: doctor });
    const departmentDoc = await Department.findOne({ name: department });

    if (!patientDoc || !doctorDoc || !departmentDoc) {
      return res.status(404).json({ message: 'Invalid patient, doctor, or department name' });
    }

    const userId = req.user.userId; // Logged-in user
    const receptionist = await Receptionist.findOne({ user: userId });
    
    if (!receptionist) {
    return res.status(404).json({ message: "Receptionist profile not found" });
    }

    const newAppt = new Appointment({
      patient: patientDoc._id,
      doctor: doctorDoc._id,
      department: departmentDoc._id, 
      date,
      time,
      status,
      created_by: {
                _id: receptionist._id,
                name: receptionist.name
            } 
    });

    const savedappt = await newAppt.save();
    return res.status(201).json({ message: "Appointment created successfully", newAppt });

  } catch (error) {
    console.error("Error in adding appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function delAppt(req, res) {
    try {
        const apptId = req.params.id;
        const appointment = await Appointment.findByIdAndDelete(apptId);
        if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        console.error("Error in deleting appointment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getAppt(req, res) {
    try {
        const apptId = req.params.id;
        const appointment = await Appointment.findById(apptId)
              .populate('patient', 'name _id')
              .populate('doctor', 'name _id')
              .populate('created_by', 'name _id')
              .populate('department', 'name _id');
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({ appointment });
    } catch (error) {
        console.error("Error in getting appointment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getAllAppts(req, res) {
    try {
        const appointments = await Appointment.find()
              .populate('patient', 'name _id')
              .populate('doctor', 'name _id')
              .populate('created_by', 'name _id')
              .populate('department', 'name _id');
        return res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error in getting all appointments:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function upAppt(req, res) {
    try {
        const apptId = req.params.id;
        const data = req.body;

        if (!data) {
            return res.status(400).json({ message: "Please provide a status" });
        }

        const appointment = await Appointment.findByIdAndUpdate(apptId, data,  { new: true });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({ message: "Appointment updated successfully", appointment });
    } catch (error) {
        console.error("Error in updating appointment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



async function getDoctorAppts(req, res) {
  try {
    const userId = req.user.userId;

    const doctor = await Doctor.findOne({ user: userId });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointments = await Appointment.find({
      doctor: doctor._id
    })
      .populate("patient", "name _id age gender")
      .populate("department", "name _id");

    return res.status(200).json({ appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}




const apptController ={
    addAppt : addAppt, 
    delAppt : delAppt,
    getAppt : getAppt,
    getAllAppts : getAllAppts,
    upAppt : upAppt,
    getDoctorAppts : getDoctorAppts
}

export default apptController;