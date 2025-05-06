import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

async function signup(req,res) {
    const {name,email, password, role} = req.body;

    if(!name || !email || !password || !role){
        res.status(400).json({message:" Please fill all the fields"});
    }
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(409).json({message:"User already exists"});
        }
        const hashedPassword = await bycrypt.hash(password, 10);
        const newUser = User.create({ name, email, password: hashedPassword, role});
        const savedUser = await newUser.save();

        res.status(201).json({message:"User created successfully", user: savedUser});
    }
    catch(error){
        res.status(500).json({message:"Error in registering user", error}); 
    }
}