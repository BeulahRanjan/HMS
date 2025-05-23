import mongoose from "mongoose";

const recepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_no: { type: String, required: true },
  dob: { type: String, required:true},
  experience: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the auth user
  gender:{ type: String, required:true},
  shift: { type: String, enum: ['morning', 'afternoon','evening', 'night'], default: 'Morning' },
  joining_date: { type:String, required:true},
});

const Receptionist = mongoose.model("Receptionist", recepSchema);

export default Receptionist;
 