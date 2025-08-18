import jwt from "jsonwebtoken";
import cookie from "cookie";

const SECRET = process.env.JWT_SECRET || "mysecret";

export function verifyToken(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const { token } = cookie.parse(cookies);
  if (!token) return null;

  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
