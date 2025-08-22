import { dbConnect } from "@/lib/dbConnect";
import Job from "@/models/Job";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  await dbConnect();

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.query;

  // GET job by ID
  if (req.method === "GET") {
    try {
      const job = await Job.findOne({ _id: id, userId: user.id });
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.status(200).json({ job });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // PUT update job
  else if (req.method === "PUT") {
    try {
      const updatedJob = await Job.findOneAndUpdate(
        { _id: id, userId: user.id },
        req.body,
        { new: true }
      );
      if (!updatedJob) return res.status(404).json({ message: "Job not found" });
      res.status(200).json({ job: updatedJob });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
