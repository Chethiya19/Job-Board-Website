"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/axios";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function JobList() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await API.get("/employer/jobs");
      setJobs(res.data.jobs || []);
    } catch (err) {
      console.error("Fetch jobs error:", err.response?.data || err);
      setMessage("❌ Unable to fetch jobs");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const getTimeAgo = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays >= 1) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours >= 1) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes >= 1) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;

    return "Just now";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Jobs</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => router.push("/employer/post-job")}
        >
          Post a New Job
        </button>
      </div>

      {message && (
        <p className="mb-4 text-center p-2 rounded bg-red-100 text-red-700">{message}</p>
      )}

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs posted yet.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job._id} className="relative border p-4 rounded shadow-sm">
              {/* Posted time - top-right */}
              <div className="absolute top-3 right-3 flex items-center gap-1 text-gray-500 text-sm">
                <ClockIcon className="w-4 h-4" />
                <span>{getTimeAgo(job.createdAt)}</span>
              </div>

              <h4 className="font-bold">{job.title}</h4>
              <p className="text-gray-600">{job.description}</p>
              <p className="text-sm text-gray-500">
                {job.location} | {job.type} | {job.category}
              </p>
              {job.salary && <p className="text-sm text-gray-500">Salary: {job.salary}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
