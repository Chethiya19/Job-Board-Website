"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/axios";

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
            <li key={job._id} className="border p-4 rounded shadow-sm">
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
