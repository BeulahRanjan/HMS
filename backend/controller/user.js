import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();


// async function signup(req,res) {
//     try{
//     const {name,email, password, role} = req.body;

//     if(!name || !email || !password || !role){
//         res.status(400).json({message:" Please fill all the fields"});
//     }
    
//         const existingUser = await User.findOne({email});
//         if(existingUser){
//             res.status(409).json({message:"User already exists"});
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword, role});
//         const savedUser = await newUser.save();

//         res.status(201).json({message:"User created successfully"});
//     }
//     catch(error){
//         console.log("Signup error:", error);
//         res.status(500).json({message:"Error in registering user", error}); 
//     }
// }

async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);

    // extra safety for duplicate email
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      message: "Error in registering user",
    });
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

async function getAllUsers(req, res) {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
}


async function getUserByEmail(req, res) {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
}



const userController = {
    signup: signup,
    login:login,
    getUserByEmail: getUserByEmail,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser
}

export default userController;