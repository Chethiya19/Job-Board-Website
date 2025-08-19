import Candidate from "@/models/Candidate";
import { dbConnect } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find candidate with education
    const candidate = await Candidate.findOne({ userId }).select("education");

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({ candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
