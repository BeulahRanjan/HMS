import mongoose from "mongoose";
import Doctor from "./models/doctor.js";

const mongoURI = "mongodb://127.0.0.1:27017/test";

(async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected");

    const indexes = await Doctor.collection.getIndexes();
    console.log("Existing indexes:", indexes);

    await Doctor.collection.dropIndexes();
    console.log("✅ All Doctor indexes dropped");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
