"use client";

import API from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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
    const diffMs = now - created;

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays >= 1) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours >= 1) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes >= 1) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    }

    return "Just now";
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-1">
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <div className="h-[500px] overflow-y-auto pl-1 pr-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => router.push(`/jobs/${slugify(job.title)}`)}
                className="relative border p-4 rounded-md shadow hover:shadow-lg hover:scale-102 hover:bg-gray-50 transition-transform duration-300 cursor-pointer bg-white text-sm"
              >
                <h6 className="text-lg font-semibold mb-2">{job.title}</h6>

                {/* Company */}
                <div className="flex items-center gap-2 mb-1">
                  <BuildingOffice2Icon className="w-4 h-4 text-gray-500" />
                  <span>{job.companyName}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-1">
                  <MapPinIcon className="w-4 h-4 text-gray-500" />
                  <span>{job.location}</span>
                </div>

                {/* Job Type */}
                <div className="flex items-center gap-2">
                  <BriefcaseIcon className="w-4 h-4 text-gray-500" />
                  <span>{job.type}</span>
                </div>

                {/* Time Ago - Bottom Right */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-gray-500 text-xs">
                  <ClockIcon className="w-3 h-3" />
                  <span>{getTimeAgo(job.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
