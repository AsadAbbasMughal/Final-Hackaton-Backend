// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// import patientRoutes from "./routes/patientRoutes.js";
// // import healthReportRoutes from "./routes/healthReportRoutes.js";
// // import healthRoutes from "./routes/healthRoutes.js";
// // import patientRoutes from "./routes/patientRoutes.js";
// import reportsRoutes from "./routes/reports.js";


// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ Simple test route
// app.get("/", (req, res) => {
//   res.send("Server is running successfully 🚀");
// });
// app.use("/api/admin", adminRoutes);
// // ✅ Auth routes
// app.use("/api/auth", authRoutes);

// import postRoutes from "./routes/postRoutes.js";
// app.use("/api/posts", postRoutes);

// // app.use("/api/health", healthReportRoutes);
// // app.use("/api/health", healthRoutes);
// app.use("/api/patients", patientRoutes);
// app.use("/api/patients", patientRoutes);
// app.use("/api/reports", reportsRoutes);


// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes Imports
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import reportsRoutes from "./routes/reports.js";
import postRoutes from "./routes/postRoutes.js";

// Configurations
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀 (Deployed on Vercel)");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
})

// ✅ ⚠️ Important for Vercel:
// DON'T use app.listen()
// Instead, export the app
export default app;
