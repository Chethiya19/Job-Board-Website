import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "Employer", required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { 
      type: String, 
      enum: ["Full-time", "Part-time", "Internship", "Contract"], 
      required: true 
    },
    category: {
      type: String,
      enum: [
        "IT – Software / DB / QA / Web / Graphics / GIS",
        "IT – Hardware / Networks / Systems",
        "Accounting / Auditing / Finance",
        "Banking & Finance / Insurance",
        "Sales / Marketing / Merchandising",
        "HR / Training",
        "Corporate Management / Analysts",
        "Office Admin / Secretary / Receptionist",
        "Civil Engineering / Interior Design / Architecture",
        "IT – Telecoms",
        "Customer Relations / Public Relations",
        "Logistics / Warehouse / Transport",
        "Engineering – Mechanical / Automotive / Electrical",
        "Manufacturing / Operations",
        "Media / Advertising / Communication",
        "Hotel / Restaurant / Hospitality",
        "Travel / Tourism",
        "Sports / Fitness / Recreation",
        "Hospital / Nursing / Healthcare",
        "Legal / Law",
        "Supervision / Quality Control",
        "Apparel / Clothing",
        "Ticketing / Airline / Marine",
        "Education",
        "R&D / Science / Research",
        "Agriculture / Dairy / Environment",
        "Security",
        "Fashion / Design / Beauty",
        "International Development",
        "KPO / BPO",
        "Imports / Exports"
      ],
      required: true
    },
    salary: { type: Number },
    description: { type: String, required: true },
    requirements: { type: String },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
