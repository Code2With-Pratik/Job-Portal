import express from "express";
const router = express.Router();
import InterviewResult from "../models/InterviewResult.js";

// Route to save interview results
router.post("/save", async (req, res) => {
  try {
    const { userId, role, score, totalQuestions, answers } = req.body;
    
    const newResult = new InterviewResult({
      userId,
      role,
      score,
      totalQuestions,
      answers,
      date: new Date(),
    });

    await newResult.save();
    res.status(201).json({ message: "Interview result saved successfully." });
  } catch (error) {
    console.error("Error saving interview result:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/results/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const results = await InterviewResult.find({ userId }).sort({ date: -1 });
      res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching interview results:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get('/interview', (req, res) => {
    res.send('Interview route');
  });
  

export default router; 
