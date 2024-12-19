import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve(); // Current directory

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // Frontend origin
  credentials: true, // Allow cookies with CORS
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Start server
app.listen(PORT, async () => {
  try {
    await connectDB(); // Ensure database is connected before starting
    console.log(`Server running at port ${PORT}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit if DB connection fails
  }
});
