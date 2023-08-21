import jwt from "jsonwebtoken";

const SECRET = "SHOPPING_LIST_SECRET";

export const generateToken = (email: string) => {
  return jwt.sign(email, SECRET);
};

export const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  jwt.verify(bearerToken[1], SECRET, (err: any, payload: any) => {
    if (err) return next(err);
    req.payload = payload;
    next();
  });
};
