import { dbConnect } from "@/lib/dbConnect";
import Employer from "@/models/Employer";
import User from "@/models/User";
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

    const company = await Employer.findOne({ userId });
    if (!company) return res.status(404).json({ message: "Company profile not found" });

    const user = await User.findById(userId);

    res.status(200).json({ 
      company, 
      email: user?.email || ""  // fetch email from User table
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
