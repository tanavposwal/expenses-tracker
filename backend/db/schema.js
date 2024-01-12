import { mongoose } from "mongoose";

mongoose.connect('mongodb+srv://db:hbZ4T9VfB2UqP@cluster0.puwtraz.mongodb.net/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "expense-tracker" });

// Define mongoose schemas
// shape of object in collection
const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    password: { type: String },
    transaction: { type: Array }
});

/* transaction: [{
    amount: int
    type: enum["income", "expense"]
    brief: string
}] */

// Define mongoose models
// Makes collection
export const User = mongoose.model('User', userSchema);

