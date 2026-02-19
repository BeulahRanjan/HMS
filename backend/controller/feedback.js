import Feedback from "../models/feedback.js";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";
import dotenv from "dotenv";

dotenv.config();


async function addFeedback(req, res) {
  console.log("Adding Feedback:", req.body);

  try {
    const { doctorId, patientId, rating, feedback } = req.body;

    // Optional: validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const newFeedback = new Feedback({
      doctorId,
      patientId,
      rating,
      feedback,
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Feedback added successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).json({
      message: "Error adding feedback",
      error: error.message,
    });
  }
}


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