import { dbConnect } from "@/lib/dbConnect";
import Job from "@/models/Job";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  await dbConnect();

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "GET") {
    try {
      const jobs = await Job.find({ userId: user.id }).sort({ createdAt: -1 });
      res.status(200).json({ jobs });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
