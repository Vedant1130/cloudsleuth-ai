import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, "127.0.0.1", () => {
  console.log(`🚀 CloudSleuth AI API running at http://127.0.0.1:${PORT}`);
});

server.on("error", (error) => {
  console.error("❌ Server failed to start:", error.message);
});
