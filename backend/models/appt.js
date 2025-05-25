import mongoose from "mongoose";

const apptSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true }, // or use Date if needed
  status: {
    type: String,
    enum: ['Scheduled', 'Rescheduled', 'Cancelled']
  },

  created_by: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receptionist",
        required: true
      },
      name: { type: String, required: true }
    }
  
  }, { timestamps: true });

const Appointment = mongoose.model("Appointment", apptSchema);
export default Appointment;
 