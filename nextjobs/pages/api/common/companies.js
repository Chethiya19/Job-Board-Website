import { dbConnect } from "@/lib/dbConnect";
import Employer from "@/models/Employer";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Get all company names from Employer collection
      const companies = await Employer.find({}, { companyName: 1, _id: 0 });

      return res.status(200).json({ companies });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
