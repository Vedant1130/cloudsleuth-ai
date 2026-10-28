import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CloudSleuth AI API is running 🚀",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "CloudSleuth AI API",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

export default app;
