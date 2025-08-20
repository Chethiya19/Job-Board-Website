import jwt from "jsonwebtoken";
import cookie from "cookie";

const SECRET = process.env.JWT_SECRET || "mysecret";

/**
 * Verifies the JWT token from cookies in the request.
 * @param {import('next').NextApiRequest} req
 * @returns {object|null} Decoded token payload or null if invalid
 */
export function verifyToken(req) {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const { token } = cookie.parse(cookies);
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded; // { id: ..., email: ... } depending on how you signed it
  } catch (err) {
    return null;
  }
}
