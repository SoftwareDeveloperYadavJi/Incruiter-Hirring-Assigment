import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
}

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            connectTimeoutMS: 10000, // Give up initial connection after 10s
        });

        console.log("✅ Successfully connected to MongoDB");
    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ MongoDB connection error:", error.message);
        } else {
            console.error("❌ MongoDB connection error:", error);
        }
        process.exit(1);
    }
};

// Handling disconnection gracefully
mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB connection lost. Attempting to reconnect...");
    connectDB();
});
