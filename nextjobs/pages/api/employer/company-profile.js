import { dbConnect } from "@/lib/dbConnect";
import Employer from "@/models/Employer";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { companyName, phone, website, address } = req.body;

    let company = await Employer.findOne({ userId });

    if (!company) {
      // create new company profile if not exists
      company = new Employer({ userId, companyName, phone, website, address });
    } else {
      // update existing
      company.companyName = companyName;
      company.phone = phone;
      company.website = website;
      company.address = address;
    }

    await company.save();

    res.status(200).json({ message: "Company profile updated successfully", company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
