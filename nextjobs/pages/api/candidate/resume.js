import multer from "multer";
import { dbConnect } from "@/lib/dbConnect";
import Candidate from "@/models/Candidate";
import jwt from "jsonwebtoken";

// Multer storage config
const storage = multer.diskStorage({
  destination: "uploads/resume",
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Wrap multer in a promise to use async/await properly
  const uploadMiddleware = () =>
    new Promise((resolve, reject) => {
      upload.single("resume")(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

  try {
    await uploadMiddleware();

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Find candidate
    const candidate = await Candidate.findOne({ userId });
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    // Save resume filename
    candidate.resume = req.file.originalname;
    await candidate.save();

    res.status(200).json({ message: "Resume uploaded successfully", resume: req.file.originalname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
