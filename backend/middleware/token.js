import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config();

const SECRET = process.env.SECRET;

export const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader;
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
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