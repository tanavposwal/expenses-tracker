import mongoose from "mongoose";

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  fullname: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 100
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8,
    maxlength: 100
  },
  transaction: [{ 
    amount: { type: Number, required: true },
    type: { 
      type: String, 
      required: true,
      enum: ['income', 'expense']
    },
    brief: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 100
    },
    date: { 
      type: String, 
      required: true
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }]
}, {
  timestamps: true
});

// Define mongoose models
export const User = mongoose.model('User', userSchema);
