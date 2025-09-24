import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/dbConnection.js";

const PORT = process.env.PORT || 5000;
console.log("HEllo Port", PORT);

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
