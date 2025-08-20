import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    education: [
      {
        school: String,
        degree: String,
        field: String,
        startYear: Number,
        endYear: Number,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    resume: {
      type: String,
      default: "",
    },
    appliedJobs: [
      {
        jobId: mongoose.Schema.Types.ObjectId,
        appliedAt: { type: Date, default: Date.now },
        status: { type: String, default: "Pending" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Candidate || mongoose.model("Candidate", CandidateSchema);
