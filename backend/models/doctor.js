import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone_no:{type:String,required:true,unique:true},
    dob:{type:String,required:true},
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    specialization:{type:String, required:true},
    specialist:{type:String, required:true},
    experience:{type:String, required:true},
    status:{type:String,required:true},
    gender:{type:String,required:true},
    shift:{type:String,required:true},
    description:{type:String,required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    profileImage: { type: String,   default: null  }  
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
