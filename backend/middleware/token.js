import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config();

const SECRET = process.env.SECRET;

export const authenticateJwt = (req, res, next) => {
    const authToken = req.cookies.token;
    //const authHeader = req.headers.auth;
    if (authToken) {
      const token = authToken;
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