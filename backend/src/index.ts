import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import reportRoutes from "./routes/reports";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reports", reportRoutes);

// Health check
app.get("/health", (_, res) => {
  res.status(200).send("OK");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
