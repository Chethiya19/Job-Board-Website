import { verifyToken } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export default async function handler(req, res) {
  const decoded = verifyToken(req);
  if (!decoded) return res.status(401).json({ message: "Not authenticated" });

  await dbConnect();

  try {
    const user = await User.findById(decoded.id).select("name email role");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
