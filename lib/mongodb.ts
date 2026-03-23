import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ecom";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI || MONGODB_URI.includes("localhost")) {
    // If we're on localhost and failing, or if URI is missing
    const isLocal = !MONGODB_URI || MONGODB_URI.includes("localhost");
    if (isLocal) {
        // Silent or helpful log for local dev without DB
        // console.log("Using Mock Data: No local/remote MongoDB found.");
    }
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB Connected Successfully");
      return mongoose;
    }).catch((err) => {
      console.error("❌ MongoDB Connection Error:", err.message);
      if (err.message.includes("ECONNREFUSED")) {
        console.error("💡 TIP: Make sure your local MongoDB service is running or provide a MONGODB_URI in .env.local");
      }
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
