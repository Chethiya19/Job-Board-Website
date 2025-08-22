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
  const { id } = useParams(); // Get the job ID from URL
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

  // Fetch job details
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.location || !form.type || !form.category) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    try {
      await API.put(`/employer/update-job/${id}`, { id, ...form });
      setMessage("✅ Job updated successfully!");
      setTimeout(() => router.push("/employer/manage-jobs"), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-2 text-center">Update Job</h2>

      {message && (
        <p
          className={`mb-4 text-center p-2 rounded ${message.startsWith("✅")
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
            }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title *"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <textarea
          name="description"
          placeholder="Job Description *"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
          <input
            type="text"
            name="location"
            placeholder="Location *"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-white"
          >
            <option value="" disabled>Select Job Type *</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-3 bg-white"
        >
          <option value="" disabled>Select Job Category *</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <textarea
          name="requirements"
          placeholder="Requirements (Optional)"
          value={form.requirements}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Job
        </button>
      </form>
    </div>
  );
}
