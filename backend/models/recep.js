import mongoose from "mongoose";

const recepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_no: { type: String, required: true },
  experience: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the auth user
  shift: { type: String, enum: ['Morning', 'Evening', 'Night'], default: 'Morning' },
  joining_date: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
});

const Receptionist = mongoose.model("Receptionist", recepSchema);

export default Receptionist;
