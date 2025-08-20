import { dbConnect } from "@/lib/dbConnect";
import Job from "@/models/Job";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await dbConnect();

  const { valid, decoded, message: tokenMessage } = verifyToken(req);
  if (!valid) return res.status(401).json({ message: tokenMessage });

  const { title, description, location, salary, type, category, requirements } = req.body;

  if (!title || !description || !location || !type || !category) {
    return res.status(400).json({ message: "❌ Please fill all required fields" });
  }

  try {
    const newJob = await Job.create({
      employerId: decoded.id,
      title,
      description,
      location,
      salary,
      type,
      category,
      requirements,
    });
    return res.status(201).json({ message: "✅ Job posted successfully", job: newJob });
  } catch (error) {
    console.error("Error posting job:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
