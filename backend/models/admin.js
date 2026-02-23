import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true,unique:true},
    phone_no:{type:String,required:true,unique:true},
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    experience:{type:String, required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
})

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;