import Candidate from "@/models/Candidate";
import { dbConnect } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { company, position, startDate, endDate, description } = req.body;

    let candidate = await Candidate.findOne({ userId });

    if (!candidate) {
      candidate = new Candidate({ userId, experience: [] });
    }

    candidate.experience.push({
      company,
      position,
      startDate,
      endDate,
      description,
    });

    await candidate.save();

    res.status(200).json({ message: "Experience added", candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
