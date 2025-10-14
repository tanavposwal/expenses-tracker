import mongoose from "mongoose";
import { config } from 'dotenv';

config();

const connectDB = async () => {
  try {
    const URL = process.env.URL;
    if (!URL) {
      throw new Error('Database URL not found in environment variables');
    }
    
    await mongoose.connect(URL, { 
      dbName: "expense-tracker",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
