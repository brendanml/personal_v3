import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017/personal"

let connected = false

export async function connectDB() {
    if (connected) return
    await mongoose.connect(MONGODB_URI)
    connected = true
}
