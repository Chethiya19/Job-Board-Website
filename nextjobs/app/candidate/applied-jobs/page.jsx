"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { BriefcaseIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatLKR = (amount) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await API.get("/candidate/applied-jobs");
        setJobs(res.data.appliedJobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 text-lg">Loading applied jobs...</p>
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-600 text-lg">You haven’t applied for any jobs yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">My Applied Jobs</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((app) => (
          <div
            key={app.jobId}
            className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 hover:shadow-xl transition"
          >
            {/* Job Title & Company */}
            <h4 className="text-lg font-semibold text-gray-900 mb-1">{app.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{app.companyName}</p>

            {/* Job Info */}
            <div className="space-y-2 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="h-4 w-4" />
                <span>{app.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                <span>{app.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span>{formatLKR(app.salary)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mt-4">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  app.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : app.status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : app.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
