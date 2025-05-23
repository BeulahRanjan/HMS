import mongoose from "mongoose";

const patSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  email: { type: String, required: true, unique: true },
  phone_no: { type: String, required: true },
  address: { type: String },
  blood_group: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },

  created_by: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Receptionist",
      required: true
    },
    name: { type: String, required: true }
  }

}, { timestamps: true });

const Patient = mongoose.model("Patient", patSchema);

export default Patient;
