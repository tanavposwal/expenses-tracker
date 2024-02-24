// saving data in mongo db

import express from "express";
import { User } from "./db/schema.js";
import cors from "cors";
import { z } from "zod";
import { config, parse } from 'dotenv';

config();
const SECRET = process.env.SECRET;
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
	origin : ['https://expenses-trackr.vercel.app/'], 
 } ));

import jwt from "jsonwebtoken";
import { authenticateJwt, verifyToken } from "./middleware/token.js";

const signupInput = z.object({
	fullname: z.string().min(1).max(20),
	email: z.string().min(1).max(30),
	password: z.string().min(8).max(20)
})

// User routes
app.post('/user/signup', async (req, res) => {
	const parsedInput = signupInput.safeParse(req.body)
	if (!parsedInput.success) {
		res.json({ message: 'Wrong input type or limit reached', success: false });
		return;
	}
	const { fullname, email, password } = parsedInput.data;
	const user = await User.findOne({ email });
	if (user) {
		res.status(403).json({ message: 'User already exists', success: false });
	} else {
		const newUser = new User({ fullname, email, password });
		await newUser.save();
		res.json({ message: 'User created successfully now login with same credentials', success: true });
	}
});

app.post('/user/login', async (req, res) => {
	const { email, password } = req.headers;
	const user = await User.findOne({ email: email, password: password });

	if (user) {
		const token = jwt.sign({ email }, SECRET, { expiresIn: '24h' });
		res.json({ message: 'Logged in successfully', token, success: true });
	} else {
		res.status(403).json({ message: 'Invalid username or password', success: false });
	}
});

// get expense
app.get('/user/entry', authenticateJwt, async (req, res) => {
	const user = await User.findOne({ email: req.user.email });

	res.json({ "transaction": user.transaction });
});

// add expense

const entryInput = z.object({
	amount: z.string().min(1).max(10),
	type: z.string().min(1).max(8),
	brief: z.string().min(1).max(50)
})

app.post('/user/entry', authenticateJwt, async (req, res) => {
	const parsedInput = entryInput.safeParse(req.body)
	if (!parsedInput.success) {
		console.log(parsedInput.error)
		res.json({ message: 'Wrong input type or limit reached', success: false });
		return;
	}
	const { amount, type, brief } = parsedInput.data;

	const user = await User.findOne({ email: req.user.email });

	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth() + 1;
	const day = currentDate.getDate();
	let date = `${day}/${month}/${year}`

	user.transaction.push({ amount: parseInt(amount), type, brief, date })

	await user.save();
	res.json({ message: type + ' added successfully', success: true });
});

app.get('/verify/:token', async (req, res) => {
	res.json({ email: verifyToken(req.params.token) })
})

app.delete('/user/entry/:id', authenticateJwt, async (req, res) => {

	try {
		const user = await User.findOne({ email: req.user.email });

		if (user) {
			user.transaction = user.transaction.filter((item, id) => {
				if (id == req.params.id) {
					return false
				} else {
					return true
				}
			})
			res.json({ message: 'Transaction deleted!', success: true });
			await user.save()
		}
	} catch (error) {
		console.error(error);
	}

})

app.listen(3000, () => console.log('Server running on port 3000'));
