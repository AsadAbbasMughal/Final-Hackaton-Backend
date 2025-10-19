// models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  title: { type: String, required: true },
  description: String,
  image: String, // ✅ Image URL saved here
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Report", reportSchema);
