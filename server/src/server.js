
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, "127.0.0.1", () => {
    console.log(
      `CloudSleuth AI API running at http://127.0.0.1:${PORT}`
    );
  });
};

startServer();
