"use client";
import { useEffect, useState } from "react";

export default function Experience() {
  const [form, setForm] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [experiences, setExperiences] = useState([]);

  // Fetch existing experiences
  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/candidate/get-experience", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setExperiences(data.experiences);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/candidate/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ company: "", position: "", startDate: "", endDate: "", description: "" });
        fetchExperiences();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6 p-8">
      {/* Left: Add New Experience */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">➕ Add New Experience</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Position"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <div className="flex gap-3">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded"
              required
            />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-1/2 border px-3 py-2 rounded"
            />
          </div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>

      {/* Right: Existing Experience List */}
      <div className="bg-white p-6 rounded-lg shadow max-h-[300px] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">📋 Existing Experience</h2>
        {experiences.length === 0 ? (
          <p className="text-gray-500">No experience added yet.</p>
        ) : (
          <ul className="space-y-3">
            {experiences.map((exp, idx) => (
              <li key={idx} className="border p-3 rounded">
                <p className="font-semibold">{exp.company} - {exp.position}</p>
                <p className="text-sm text-gray-600">
                  {new Date(exp.startDate).toLocaleDateString()} →{" "}
                  {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : "Present"}
                </p>
                <p className="text-sm">{exp.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
