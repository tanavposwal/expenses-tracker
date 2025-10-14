import express from "express";
import { signup, login } from "../controllers/userController.js";
import { getTransactions, addTransaction, deleteTransaction } from "../controllers/transactionController.js";
import { authenticateJwt, verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/entry', authenticateJwt, getTransactions);
router.post('/entry', authenticateJwt, addTransaction);
router.delete('/entry/:id', authenticateJwt, deleteTransaction);

// Token verification
router.get('/verify/:token', (req, res) => {
  try {
    const email = verifyToken(req.params.token);
    res.json({ email });
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
});

export default router;
