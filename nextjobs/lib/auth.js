import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mysecret";

export function verifyToken(req) {
  const token = req.cookies?.token;
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}
