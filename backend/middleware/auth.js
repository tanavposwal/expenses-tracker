import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config();

const SECRET = process.env.SECRET || "secret";

export const authenticateJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Access token required', 
        success: false 
      });
    }

    const token = authHeader;
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ 
          message: 'Invalid or expired token', 
          success: false 
        });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      success: false 
    });
  }
};

export const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, SECRET);
    return user.email || "";
  } catch (err) {
    return "";
  }
};

export const generateToken = (email) => {
  return jwt.sign({ email }, SECRET, { expiresIn: '24h' });
};
