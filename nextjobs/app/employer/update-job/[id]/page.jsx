"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import API from "@/lib/axios";

const categories = [
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
  "Imports / Exports",
];

export default function UpdateJob() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    type: "",
    category: "",
    requirements: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const res = await API.get(`/employer/update-job/${id}`);
        setForm({
          title: res.data.job.title,
          description: res.data.job.description,
          location: res.data.job.location,
          salary: res.data.job.salary || "",
          type: res.data.job.type,
          category: res.data.job.category,
          requirements: res.data.job.requirements || "",
        });
      } catch (err) {
        console.error(err);
        setMessage("❌ Unable to fetch job details");
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location || !form.type || !form.category) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    try {
      await API.put(`/employer/update-job/${id}`, { id, ...form });
      setMessage("✅ Job updated successfully! Redirecting...");
      setTimeout(() => router.push("/employer/manage-jobs"), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Job</h2>

      {message && (
        <p
          className={`mb-4 text-center p-2 rounded ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Title */}
        <div>
          <label className="block font-semibold mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter job title"
          />
        </div>

        {/* Description + Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Job Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter job description"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Requirements</label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter requirements (optional)"
            />
          </div>
        </div>

        {/* Location + Salary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Salary</label>
            <input
              type="text"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter salary"
            />
          </div>
        </div>

        {/* Job Type + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Job Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-white"
            >
              <option value="" disabled>Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Job Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-white"
            >
              <option value="" disabled>Select Job Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
