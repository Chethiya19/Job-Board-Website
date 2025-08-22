import { dbConnect } from "@/lib/dbConnect";
import Job from "@/models/Job";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  await dbConnect();

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "Job ID required" });

    try {
      const job = await Job.findOneAndDelete({ _id: id, userId: user.id });

      if (!job) return res.status(404).json({ message: "Job not found" });

      res.status(200).json({ message: "✅ Job deleted successfully" });
    } catch (err) {
      console.error("Delete job error:", err);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
