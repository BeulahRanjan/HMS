import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  role: { type: String, enum: ['doctor', 'nurse','receptionist','patient','admin'], default: 'patient' },
  ggoogleId: { type: String },
  hasSubmittedForm: {
  type: Boolean,
  default: false
}
});


export default mongoose.model('User', userSchema);
