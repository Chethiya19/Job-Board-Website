import { dbConnect } from "@/lib/dbConnect";
import Job from "@/models/Job";
import Employer from "@/models/Employer";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // 1. Find all jobs
      const jobs = await Job.find().sort({ createdAt: -1 });

      // 2. Populate companyName from Employer
      const jobsWithCompany = await Promise.all(
        jobs.map(async (job) => {
          const employer = await Employer.findOne({ userId: job.userId });
          return {
            ...job._doc,
            companyName: employer?.companyName || "N/A",
          };
        })
      );

      return res.status(200).json({ jobs: jobsWithCompany });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
