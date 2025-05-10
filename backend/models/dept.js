import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  No_of_doctors: { type: Number, default: 0 },
  No_of_nurses: { type: Number, default: 0 },
  No_of_surgeons: { type: Number, default: 0 },
  No_of_patients: { type: Number, default: 0 },
  No_of_attendants : { type: Number, default: 0 },
  Head_of_department: { type: String }, // or ObjectId referencing Doctor
  Equipment_list: [
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    condition: { type: String, enum: ['New', 'Good', 'Needs Maintenance'], default: 'Good' }
  }
],

  floor: { type: Number }, // Optional: location info
  rooms: { type: Number }, 
  established_year: { type: Number }, // Optional: for history records
});

const Department = mongoose.model('Department', departmentSchema);

export default Department;
