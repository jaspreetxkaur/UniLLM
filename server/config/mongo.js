import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_MONGODB_URI = 'mongodb://127.0.0.1:27017/unillm';
const MONGODB_URI = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;

let isConnected = false;
let connectionPromise = null;

export const connectMongo = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    const opts = {
      serverSelectionTimeoutMS: 5000,
      autoIndex: true
    };

    connectionPromise = mongoose.connect(MONGODB_URI, opts);
    await connectionPromise;

    isConnected = true;
    console.log(`🍃 [MongoDB] Connected successfully to ${MONGODB_URI.replace(/:[^:@]+@/, ':***@')}`);

    mongoose.connection.on('error', (err) => {
      console.error('🍃 [MongoDB Connection Error]:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('🍃 [MongoDB Disconnected]');
      isConnected = false;
      connectionPromise = null;
    });

    return mongoose.connection;
  } catch (err) {
    connectionPromise = null;
    isConnected = false;
    console.error('❌ [FATAL] Failed to connect to MongoDB:', err.message);
    throw err;
  }
};

export const disconnectMongo = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
    isConnected = false;
    connectionPromise = null;
    console.log('🍃 [MongoDB] Disconnected cleanly.');
  }
};

// Graceful process termination handling
const handleShutdown = async (signal) => {
  console.log(`\n🍃 Received ${signal}, closing MongoDB connection...`);
  try {
    await disconnectMongo();
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnect:', err);
    process.exit(1);
  }
};

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

export default connectMongo;
