import mongoose from "mongoose";
const { connect, connection } = mongoose;
import dotenv from "dotenv";
dotenv.config();

export function mongoDBConnection() {
  const url =
    "mongodb+srv://rautharshita4:TVMu523Ck0eC6fCF@merncluster.mtyurff.mongodb.net/user";
  connect(url)
    .then(() => {
      console.log("✅ Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error("❌ Error connecting to MongoDB:", err.message);
    });

  // Optional: graceful shutdown
  process.on("SIGINT", async () => {
    await connection.close();
    console.log("MongoDB connection closed on app termination");
    process.exit(0);
  });
}
