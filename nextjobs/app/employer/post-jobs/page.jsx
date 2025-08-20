"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function PostJobs() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    type: "Full-time",
    category: categories[0],
    requirements: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.title || !form.description || !form.location || !form.type || !form.category) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    try {
      const res = await API.post("/employer/post-job", form);
      setMessage(res.data.message);

      if (res.status === 201) {
        setForm({
          title: "",
          description: "",
          location: "",
          salary: "",
          type: "Full-time",
          category: categories[0],
          requirements: "",
        });
        setTimeout(() => router.push("/employer/dashboard"), 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "❌ Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a Job</h2>
      {message && (
        <p
          className={`mb-4 text-center p-2 rounded ${
            message.startsWith("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title *"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Job Description *"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
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
          className="w-full border rounded px-3 py-2"
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Contract</option>
        </select>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          name="requirements"
          placeholder="Requirements (Optional)"
          value={form.requirements}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Post Job
        </button>
      </form>
    </div>
  );
}
