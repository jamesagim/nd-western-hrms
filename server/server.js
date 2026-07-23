import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employeeRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import recruitmentRoutes from "./routes/recruitmentRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import performanceRoutes from "./routes/performanceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";

dotenv.config();

const app = express();

// ===========================
// Middleware
// ===========================

app.use(cors());
app.use(express.json());

// ===========================
// Test Route
// ===========================

app.get("/", (req, res) => {
  res.send("Employee Management API is running...");
});

// ===========================
// API Routes
// ===========================
app.use(
  "/api/settings",
  settingsRoutes
);
app.use("/api/auth", authRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/leaves", leaveRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use(
  "/api/recruitment",
  recruitmentRoutes
);

app.use(
  "/api/documents",
  documentRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/performance",
  performanceRoutes
);

app.use("/api/payroll", payrollRoutes);

app.use("/api/candidates", candidateRoutes);

// ===========================
// MongoDB Connection
// ===========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error");
    console.log(err);
  });