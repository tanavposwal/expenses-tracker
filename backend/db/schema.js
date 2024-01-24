import { mongoose } from "mongoose";
import { config } from 'dotenv';

config();

const URL = process.env.URL;

mongoose.connect(URL, { dbName: "expense-tracker" });

// Define mongoose schemas
// shape of object in collection
const userSchema = new mongoose.Schema({
    fullname: { type: String },
    email: { type: String },
    password: { type: String },
    transaction: { type: Array }
});

/* transaction: [{
    amount: int
    type: enum["income", "expense"]
    brief: string
    date: string
}] */

// Define mongoose models
// Makes collection
export const User = mongoose.model('User', userSchema);

