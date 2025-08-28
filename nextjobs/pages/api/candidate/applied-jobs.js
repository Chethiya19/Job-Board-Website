import { dbConnect } from "@/lib/dbConnect";
import Candidate from "@/models/Candidate";
import Job from "@/models/Job";
import Employer from "@/models/Employer";
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

    // Fetch candidate
    const candidate = await Candidate.findOne({ userId }).lean();

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Fetch job details with employer company name
    const appliedJobs = await Promise.all(
      candidate.appliedJobs.map(async (app) => {
        const job = await Job.findById(app.jobId).lean();
        if (!job) return null;

        // Fetch employer
        const employer = await Employer.findOne({ userId: job.userId }).lean();

        return {
          appliedAt: app.appliedAt,
          status: app.status || "Pending",
          jobId: job._id,
          title: job.title,
          location: job.location,
          type: job.type,
          category: job.category,
          salary: job.salary,
          description: job.description,
          requirements: job.requirements,
          companyName: employer ? employer.companyName : "Unknown Company",
        };
      })
    );

    res.status(200).json({
      success: true,
      appliedJobs: appliedJobs.filter((j) => j !== null),
    });
  } catch (err) {
    console.error("Error fetching applied jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
}
