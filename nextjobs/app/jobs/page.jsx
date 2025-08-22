"use client";

import API from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  BuildingOffice2Icon,
  MapPinIcon,
  ClockIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export default function ViewAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/common/jobs");
        setJobs(res.data.jobs);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getTimeAgo = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffMs = now - created; // milliseconds

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays >= 1) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }

    // Less than a day → show hours
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours >= 1) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }

    // Less than an hour → show minutes
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes >= 1) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    }

    return "Just now";
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="relative border p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              {/* Time Ago - Top Right */}
              <div className="absolute top-4 right-4 flex items-center gap-1 text-gray-500 text-sm">
                <ClockIcon className="w-4 h-4" />
                <span>{getTimeAgo(job.createdAt)}</span>
              </div>

              <h3 className="text-xl font-semibold mb-3">{job.title}</h3>

              {/* Company */}
              <div className="flex items-center gap-2 mb-1">
                <BuildingOffice2Icon className="w-5 h-5 text-gray-500" />
                <span>{job.companyName}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-1">
                <MapPinIcon className="w-5 h-5 text-gray-500" />
                <span>{job.location}</span>
              </div>

              {/* Job Type */}
              <div className="flex items-center gap-2 mb-1">
                <BriefcaseIcon className="w-5 h-5 text-gray-500" />
                <span>{job.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
