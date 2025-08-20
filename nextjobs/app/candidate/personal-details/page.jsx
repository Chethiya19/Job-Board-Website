"use client";
import { useEffect, useState } from "react";

export default function PersonalDetails() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "", // display only
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch candidate info
        const candidateRes = await fetch("/api/candidate/get-personal-details", {
          method: "GET",
          credentials: "include",
        });
        const candidateData = await candidateRes.json();

        if (!candidateRes.ok) {
          setMessage(candidateData.message || "Failed to fetch candidate details");
          return;
        }

        // 2️⃣ Fetch email from /api/auth/me
        const userRes = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const userData = await userRes.json();

        if (!userRes.ok) {
          setMessage(userData.message || "Failed to fetch user email");
          return;
        }

        // Prefill form
        setForm({
          firstName: candidateData.candidate?.firstName || "",
          lastName: candidateData.candidate?.lastName || "",
          address: candidateData.candidate?.address || "",
          phone: candidateData.candidate?.phone || "",
          email: userData.user?.email || "", // email from User table
        });
      } catch (err) {
        console.error(err);
        setMessage("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/candidate/personal-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          phone: form.phone,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Personal details updated successfully!");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update details");
    }
  };

  if (loading)
    return <p className="text-gray-500 mt-10 text-center">Loading...</p>;

  return (
    <div className="p-8 bg-white rounded shadow max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">Personal Details</h2>

      {message && (
        <p
          className={`mb-4 text-center ${
            message.startsWith("✅") ? "text-green-700" : "text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Optional"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold transition"
        >
          Update Details
        </button>
      </form>
    </div>
  );
}
