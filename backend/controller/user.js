import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();


async function signup(req,res) {
    try{
    const {name,email, password, role} = req.body;

    if(!name || !email || !password || !role){
        res.status(400).json({message:" Please fill all the fields"});
    }
    
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(409).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role});
        const savedUser = await newUser.save();

        res.status(201).json({message:"User created successfully"});
    }
    catch(error){
        console.log("Signup error:", error);
        res.status(500).json({message:"Error in registering user", error}); 
    }
}



async function login(req,res){
    try{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({message:"Please enter all the fields"});
    }
   
        const existingUser = await User.findOne({email: email})
        if(!existingUser){
            res.status(404).json({message:"User not found"});
        }
        const PasswordValid = await bcrypt.compare(password, existingUser.password);
        if(!PasswordValid){
            res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({userId: existingUser._id},process.env.SECRET_KEY, {expiresIn: '1d'});
        res.status(200).json({message:"Login successful", token, user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role, 
        hasSubmittedForm: existingUser.hasSubmittedForm// Important for frontend redirection
      },});
       }
       catch(error){
        console.log("Login error:", error);
        res.status(500).json({message:"Error in logging in", error});
       }

}

const userController = {
    signup: signup,
    login:login,
}

export default userController;