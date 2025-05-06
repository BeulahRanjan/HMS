import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./route/user.js";
import blogRoutes from "./route/blog.js";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());


const cors = require("cors");

app.use(cors());


const mongoURI =
  "mongodb+srv://beulahranjan:beulah@cluster0.v76khzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace 'your_mongodb_atlas_connection_string' with your actual MongoDB Atlas connection string
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
app.use("/auth", userRoutes);



// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});