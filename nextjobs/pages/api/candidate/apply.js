import { dbConnect } from "@/lib/dbConnect";
import Candidate from "@/models/Candidate";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mysecret";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET);
    const userId = decoded.id;
    const { jobId } = req.body;

    if (!jobId) return res.status(400).json({ message: "Job ID required" });

    let candidate = await Candidate.findOne({ userId });
    if (!candidate) {
      return res.status(404).json({ message: "Candidate profile not found" });
    }

    // Check if already applied
    const alreadyApplied = candidate.appliedJobs.some(
      (job) => job.jobId.toString() === jobId
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    // Push new application
    candidate.appliedJobs.push({ jobId, status: "Pending" });
    await candidate.save();

    res.status(200).json({ message: "Job application submitted", candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
