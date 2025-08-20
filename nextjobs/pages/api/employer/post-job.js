import { dbConnect } from "@/lib/dbConnect";
import Job from "@/models/Job";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { title, description, location, salary, type, category, requirements } = req.body;

  try {
    const job = new Job({
      userId: user.id, // from decoded token
      title,
      description,
      location,
      salary,
      type,
      category,
      requirements,
    });

    await job.save();
    res.status(201).json({ message: "✅ Job posted successfully", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
