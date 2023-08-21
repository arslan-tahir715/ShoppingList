import jwt from "jsonwebtoken";
import { JWT_SECRET } from "consts";

export const generateToken = (email: string) => {
  return jwt.sign(email, JWT_SECRET);
};

export const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  jwt.verify(bearerToken[1], JWT_SECRET, (err: any, payload: any) => {
    if (err) return next(err);
    req.payload = payload;
    next();
  });
};
