import { dbConnect } from "@/lib/dbConnect";
import Candidate from "@/models/Candidate";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // Connect to MongoDB
  await dbConnect();

  // Only allow GET requests
  if (req.method !== "GET")
    return res.status(405).json({ message: "Method not allowed" });

  // Check for JWT token in cookies
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Find candidate by userId
    let candidate = await Candidate.findOne({ userId });

    // If candidate does not exist, return empty object instead of 404
    if (!candidate) {
      candidate = {
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        // add any other fields from your Candidate model
      };
    }

    // Fetch corresponding user to get email
    const user = await User.findById(userId).select("email");

    // Return candidate and user email
    res.status(200).json({
      candidate,
      email: user?.email || "",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
