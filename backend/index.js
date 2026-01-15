import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./route/user.js";
import docRoutes from "./route/doctor.js";
import nurRoutes from "./route/nurse.js";
import deptRoutes from "./route/dept.js";
import recepRoutes from "./route/recep.js";
import patRoutes from "./route/patient.js";
import apptRoutes from "./route/appt.js";
import path from "path";


const app = express();
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);
app.use(express.json());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const mongoURI =
  "mongodb+srv://beulahranjan:beulah@cluster0.v76khzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace 'your_mongodb_atlas_connection_string' with your actual MongoDB Atlas connection string
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// const __filename = fileURLToPath(import.meta.url);
// const _dirname = path.dirname(_filename);
app.use("/auth", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/",docRoutes);
app.use("/",nurRoutes);
app.use("/",deptRoutes);
app.use("/",recepRoutes);
app.use("/",patRoutes);
app.use("/",apptRoutes);



// console.log(express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));



// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});