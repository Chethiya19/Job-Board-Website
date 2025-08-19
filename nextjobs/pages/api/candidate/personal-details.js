import Candidate from "@/models/Candidate";
import { dbConnect } from "@/lib/dbConnect";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get token from cookies
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    // Verify JWT and get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { firstName, lastName, address, phone } = req.body;

    // Check if Candidate record exists
    let candidate = await Candidate.findOne({ userId });

    if (!candidate) {
      // Create new candidate record if doesn't exist
      candidate = new Candidate({
        userId,
        firstName,
        lastName,
        address,
        phone,
      });
    } else {
      // Update existing candidate record
      candidate.firstName = firstName;
      candidate.lastName = lastName;
      candidate.address = address;
      candidate.phone = phone;
    }

    await candidate.save();

    res.status(200).json({ message: "Personal details updated", candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
