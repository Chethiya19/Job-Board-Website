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

    const { school, degree, field, startYear, endYear } = req.body;

    // Find Candidate record
    let candidate = await Candidate.findOne({ userId });
    if (!candidate) {
      // If candidate does not exist, create a new record
      candidate = new Candidate({ userId, education: [] });
    }

    // Add new education entry
    candidate.education.push({
      school,
      degree,
      field,
      startYear,
      endYear,
    });

    await candidate.save();

    // Return the newly added education
    const addedEducation = candidate.education[candidate.education.length - 1];
    res.status(200).json({ message: "Education added", education: addedEducation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
