// saving data in mongo db

import express from "express";
import jwt from "jsonwebtoken";
import { authenticateJwt } from "./middleware/token.js";
import { User } from "./db/schema.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

config();
const SECRET = process.env.SECRET;
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.get('/', (req, res) => {
  res.json({ "hello": "world", "secret": SECRET })
})

// User routes
app.post('/user/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.json({ message: 'User created successfully now login with same credentials'});
  }
});

app.post('/user/login', async (req, res) => {
  const { email, password } = req.headers;
  const user = await User.findOne({ email, password });
  if (user) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '24h' });
    res.cookie('token', token, {
      maxAge: 86400000,
      httpOnly: true,
    });
    //res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

// get expense
app.get('/user/entry', authenticateJwt, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  res.json({ "transaction": user.transaction });
});

// add expense
app.post('/user/entry', authenticateJwt, async (req, res) => {
  const { amount, type, brief } = req.body;
  const user = await User.findOne({ email: req.user.email });
  
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; 
  const day = currentDate.getDate();
  let date = `${day}/${month}/${year}`

  user.transaction.push({ amount, type, brief, date })

  await user.save();
  res.json({ message: 'Expense added successfully' });
});

app.listen(3000, () => console.log('Server running on port http://localhost:3000/'));
