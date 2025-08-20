"use client";
import { useState, useEffect } from "react";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [currentResume, setCurrentResume] = useState("");

  // Fetch existing resume on mount
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await fetch("/api/candidate/get-resume", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data.resume) setCurrentResume(data.resume);
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };
    fetchResume();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/candidate/resume", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Resume uploaded successfully!");
        setCurrentResume(file.name);
        setFile(null);
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (error) {
      setMessage("❌ Error uploading resume.");
    }
  };

  return (
    <div className="p-1 max-w-4xl mx-4">
    <div className="bg-white m-1 p-4 rounded-lg shadow w-full max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>

      {currentResume && (
        <p className="mb-4 text-gray-700">
          Current Resume: <strong>{currentResume}</strong>
        </p>
      )}

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border rounded p-2"
        />
        <br></br>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
    </div>
  );
}
