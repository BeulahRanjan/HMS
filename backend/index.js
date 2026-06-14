import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import userRoutes from "./route/user.js";
import docRoutes from "./route/doctor.js";
import nurRoutes from "./route/nurse.js";
import deptRoutes from "./route/dept.js";
import recepRoutes from "./route/recep.js";
import patRoutes from "./route/patient.js";
import apptRoutes from "./route/appt.js";
import feedbackRoutes from "./route/feedback.js";
import adminRoutes from "./route/admin.js";

const app = express();

/* ✅ CORS — MUST BE FIRST */
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://hms-2-dlmm.onrender.com"
  ],
  credentials: true
}));

/* ✅ Body parsers */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* ✅ Static files */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ✅ Health check */
app.get("/", (req, res) => {
  res.json({ status: "OK", env: "production" });
});

/* ✅ MongoDB */
mongoose.connect("mongodb+srv://beulahranjan:beulah@cluster0.v76khzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

/* ✅ Routes */
app.use("/auth", userRoutes);
app.use("/", docRoutes);
app.use("/", nurRoutes);
app.use("/", deptRoutes);
app.use("/", recepRoutes);
app.use("/", patRoutes);
app.use("/", apptRoutes);
app.use("/", feedbackRoutes);
app.use("/", adminRoutes);

/* ✅ Server */
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});