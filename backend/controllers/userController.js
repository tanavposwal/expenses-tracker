import { User } from "../models/User.js";
import { signupSchema, loginSchema } from "../validators/schemas.js";
import { generateToken } from "../middleware/auth.js";

// User signup
export const signup = async (req, res) => {
  try {
    const parsedInput = signupSchema.safeParse(req.body);
    
    if (!parsedInput.success) {
      return res.status(400).json({ 
        message: 'Invalid input data', 
        errors: parsedInput.error.errors,
        success: false 
      });
    }

    const { fullname, email, password } = parsedInput.data;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ 
        message: 'User already exists with this email', 
        success: false 
      });
    }

    // Create new user
    const newUser = new User({ fullname, email, password });
    await newUser.save();

    res.status(201).json({ 
      message: 'User created successfully. Please login with your credentials.', 
      success: true 
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      success: false 
    });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const parsedInput = loginSchema.safeParse(req.headers);
    
    if (!parsedInput.success) {
      return res.status(400).json({ 
        message: 'Invalid credentials format', 
        success: false 
      });
    }

    const { email, password } = parsedInput.data;
    
    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password', 
        success: false 
      });
    }

    const token = generateToken(email);
    
    res.json({ 
      message: 'Logged in successfully', 
      token, 
      success: true 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      success: false 
    });
  }
};
