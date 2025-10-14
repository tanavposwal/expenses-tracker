import { User } from "../models/User.js";
import { transactionSchema, paramsSchema } from "../validators/schemas.js";

// Get all transactions for a user
export const getTransactions = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found', 
        success: false 
      });
    }

    res.json({ 
      transactions: user.transaction || [],
      success: true 
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      success: false 
    });
  }
};

// Add a new transaction
export const addTransaction = async (req, res) => {
  try {
    const parsedInput = transactionSchema.safeParse(req.body);
    
    if (!parsedInput.success) {
      return res.status(400).json({ 
        message: 'Invalid transaction data', 
        errors: parsedInput.error.errors,
        success: false 
      });
    }

    const { amount, type, brief } = parsedInput.data;
    
    const user = await User.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found', 
        success: false 
      });
    }

    // Create date string
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const date = `${day}/${month}/${year}`;

    // Add transaction
    const newTransaction = {
      amount: parseInt(amount),
      type,
      brief,
      date
    };

    user.transaction.push(newTransaction);
    await user.save();

    res.status(201).json({ 
      message: `${type} added successfully`, 
      success: true 
    });
  } catch (error) {
    console.error('Add transaction error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      success: false 
    });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const parsedParams = paramsSchema.safeParse(req.params);
    
    if (!parsedParams.success) {
      return res.status(400).json({ 
        message: 'Invalid transaction ID', 
        success: false 
      });
    }

    const { id } = parsedParams.data;
    const user = await User.findOne({ email: req.user.email });
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found', 
        success: false 
      });
    }

    const transactionIndex = parseInt(id);
    
    if (transactionIndex < 0 || transactionIndex >= user.transaction.length) {
      return res.status(404).json({ 
        message: 'Transaction not found', 
        success: false 
      });
    }

    // Remove transaction
    user.transaction.splice(transactionIndex, 1);
    await user.save();

    res.json({ 
      message: 'Transaction deleted successfully', 
      success: true 
    });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      success: false 
    });
  }
};
