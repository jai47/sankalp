import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('⚠️ MONGO_URI is missing in .env.local');
}

let isConnected = false; // Track the connection status

export const connectDB = async () => {
    console.log('✅ Connecting to MongoDB...');

    if (isConnected) {
        console.log('✅ Using existing MongoDB connection');
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI);

        isConnected = db.connections[0].readyState;
        console.log('🚀 MongoDB Connected Successfully!');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        throw new Error('MongoDB Connection Failed');
    }
};
