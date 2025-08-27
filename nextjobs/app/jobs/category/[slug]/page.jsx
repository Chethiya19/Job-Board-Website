"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/lib/axios"; // Axios instance to fetch jobs

export default function CategoryJobsPage() {
  const { slug } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        const res = await API.get(`/jobs?category=${slug}`); // Backend filter
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    fetchJobs();
  }, [slug]);

  if (loading) return <p>Loading jobs...</p>;
  if (jobs.length === 0) return <p>No jobs found in this category.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Jobs in "{slug.replace(/-/g, " ")}"
      </h1>
      <ul className="space-y-3">
        {jobs.map((job) => (
          <li key={job.id} className="p-4 border rounded hover:bg-gray-100 cursor-pointer">
            <h2 className="font-semibold">{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
