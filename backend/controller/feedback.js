import Feedback from "../models/feedback.js";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import dotenv from "dotenv";

dotenv.config();


const addFeedback = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { rating, feedback } = req.body;

    // ✅ patient full name from auth middleware
    const patientName = req.user.fullName;

    if (!doctorId || !rating || !feedback || !patientName) {
      return res.status(400).json({
        message: "doctorId, rating, feedback, and patientName are required",
      });
    }

    const newFeedback = new Feedback({
      doctorId,
      patientName,
      rating,
      feedback,
    });

    await newFeedback.save();
    console.log("REQ.USER 👉", req.user);

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



async function getallFeedback(req, res) {
  try {
    const feedbacks = await Feedback.find()
      .populate("doctorId", "name")
      .populate("patientId", "name");

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({
      message: "Error fetching feedbacks",
      error: error.message,
    });
  }
}

async function getFeedbackByDoctor(req, res) {
  try {
    const { doctorId } = req.params;

    const feedbacks = await Feedback.find({ doctorId })
      .populate("patientId", "name");

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks by doctor:", error);
    res.status(500).json({
      message: "Error fetching feedbacks by doctor",
      error: error.message,
    });
  }
}


async function getFeedbackbyDate(req, res) {
  try {
    const { startDate, endDate } = req.query;

    const feedbacks = await Feedback.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate("doctorId", "name")
      .populate("patientId", "name");

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks by date:", error);
    res.status(500).json({
      message: "Error fetching feedbacks by date",
      error: error.message,
    });
  }
}

const feedbackController = {
  addFeedback,
  getallFeedback,
  getFeedbackByDoctor,
  getFeedbackbyDate,
};

export default feedbackController;