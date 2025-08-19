"use client";
import { useEffect, useState } from "react";

export default function Education() {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [newEdu, setNewEdu] = useState({
    school: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: "",
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch("/api/candidate/get-education", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "Failed to fetch education");
        } else if (data.candidate?.education) {
          setEducationList(data.candidate.education);
        }
      } catch (err) {
        console.error(err);
        setMessage("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const handleChange = (e) => {
    setNewEdu({ ...newEdu, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/candidate/education", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newEdu),
      });

      const data = await res.json();
      if (res.ok) {
        setEducationList([...educationList, data.education]);
        setNewEdu({ school: "", degree: "", field: "", startYear: "", endYear: "" });
        setMessage("✅ Education added successfully!");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add education");
    }
  };

  if (loading) return <p className="text-gray-500 mt-10 text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">🎓 Education</h2>

      {message && (
        <p className={`mb-4 text-center ${message.startsWith("✅") ? "text-green-700" : "text-red-700"}`}>
          {message}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Add New Education */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Add New Education</h3>
          <input
            type="text"
            name="school"
            value={newEdu.school}
            onChange={handleChange}
            placeholder="School"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <input
            type="text"
            name="degree"
            value={newEdu.degree}
            onChange={handleChange}
            placeholder="Degree"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <input
            type="text"
            name="field"
            value={newEdu.field}
            onChange={handleChange}
            placeholder="Field of Study"
            className="w-full border px-3 py-2 rounded mb-3"
          />
          <div className="grid grid-cols-2 gap-4 mb-3">
            <input
              type="number"
              name="startYear"
              value={newEdu.startYear}
              onChange={handleChange}
              placeholder="Start Year"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="number"
              name="endYear"
              value={newEdu.endYear}
              onChange={handleChange}
              placeholder="End Year"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            onClick={handleAdd}
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold transition"
          >
            Add Education
          </button>
        </div>

        {/* Right: Existing Education List */}
        <div className="bg-white p-6 rounded shadow max-h-[350px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4">Existing Education</h3>
          {educationList.length > 0 ? (
            educationList.map((edu, index) => (
              <div key={index} className="border p-4 rounded mb-3">
                <p><strong>School:</strong> {edu.school}</p>
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Field:</strong> {edu.field}</p>
                <p><strong>Years:</strong> {edu.startYear} - {edu.endYear}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No education added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
