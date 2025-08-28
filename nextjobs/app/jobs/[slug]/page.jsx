"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/axios";

export default function JobDetails() {
    const { slug } = useParams();
    const router = useRouter();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [applying, setApplying] = useState(false);
    const [applyMessage, setApplyMessage] = useState("");

    const slugify = (text) =>
        text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const formatLKR = (amount) => {
        if (!amount) return "N/A";
        return new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await API.get("/common/jobs");
                const matchedJob = res.data.jobs.find((j) => slugify(j.title) === slug);
                if (!matchedJob) {
                    setError("Job not found");
                } else {
                    setJob(matchedJob);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch job details");
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [slug]);

    const handleApply = async () => {
        setApplying(true);
        setApplyMessage("");
        try {
            const res = await API.post("/candidate/apply", { jobId: job._id });
            setApplyMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setApplyMessage(err.response?.data?.message || "Failed to apply");
        } finally {
            setApplying(false);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-gray-500 text-lg">Loading job details...</p>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="mb-6 px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
            >
                ← Back
            </button>

            {/* Job Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-gray-600 text-lg">{job.companyName}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-gray-500">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">{job.type}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full">{job.location}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                        {formatLKR(job.salary)}
                    </span>
                </div>
            </div>

            {/* Job Description */}
            <div className="mb-6">
                <h5 className="text-xl font-semibold mb-2">Job Description</h5>
                <p className="text-gray-700">{job.description || "No description provided."}</p>
            </div>

            {/* Job Requirements */}
            <div className="mb-6">
                <h5 className="text-xl font-semibold mb-2">Requirements</h5>
                <p className="text-gray-700">{job.requirements || "No requirements provided."}</p>
            </div>

            {/* Apply Button */}
            <div className="flex flex-col items-center">
                <button
                    onClick={handleApply}
                    disabled={applying}
                    className={`px-6 py-3 font-semibold rounded-full shadow transition ${applying
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                >
                    {applying ? "Applying..." : "Apply Now"}
                </button>
                {applyMessage && (
                    <p className="mt-3 text-sm text-gray-600">{applyMessage}</p>
                )}
            </div>
        </div>
    );
}
