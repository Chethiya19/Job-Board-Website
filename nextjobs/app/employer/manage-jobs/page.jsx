"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/axios";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function ManageJobs() {
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

  const deleteJob = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await API.delete("/employer/delete-job", { data: { id } });
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Delete job error:", err.response?.data || err);
      setMessage("❌ Unable to delete job");
    }
  };

  const updateJob = (id) => {
    router.push(`/employer/update-job/${id}`);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Helper function to calculate time ago
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Manage Jobs</h2>

      {message && (
        <p className="mb-4 text-center p-2 rounded bg-red-100 text-red-700">
          {message}
        </p>
      )}

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job._id}
              className="relative border p-4 rounded shadow-sm flex justify-between items-start"
            >
              {/* Posted time - top right */}
              <div className="absolute top-3 right-3 flex items-center gap-1 text-gray-500 text-sm">
                <ClockIcon className="w-4 h-4" />
                <span>{getTimeAgo(job.createdAt)}</span>
              </div>

              <div>
                <h4 className="font-bold">{job.title}</h4>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-sm text-gray-500">
                  {job.location} | {job.type} | {job.category}
                </p>
                {job.salary && (
                  <p className="text-sm text-gray-500">Salary: {job.salary}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-8">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  onClick={() => updateJob(job._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
