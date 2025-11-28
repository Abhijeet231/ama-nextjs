import mongoose from "mongoose";

let isConnected: boolean = false;

// Connecting to DB
async function dbConnect(): Promise<void> {
  if (isConnected) {
    console.log("Already Connected to DataBase");
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.error("❌ MongoDB URI is missing in environment variables!");
    throw new Error("MONGODB_URI not found!");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("DB:", db);

    isConnected = db.connections[0].readyState === 1;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DataBase Connection Failed!!", error);
    process.exit(1);
  }
}

export default dbConnect;
