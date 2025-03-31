import mongoose from "mongoose";

const InterviewResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  answers: { type: Array, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("InterviewResult", InterviewResultSchema);
