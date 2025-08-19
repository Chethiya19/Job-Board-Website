"use client";
import { useEffect, useState } from "react";

export default function CompanyProfile() {
  const [form, setForm] = useState({
    companyName: "",
    email: "", // display only
    phone: "",
    website: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch employer + user details on mount
  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const res = await fetch("/api/employer/get-company-profile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.message || "Failed to fetch company profile");
        } else if (data.company) {
          setForm({
            companyName: data.company.companyName || "",
            email: data.email || "",
            phone: data.company.phone || "",
            website: data.company.website || "",
            address: data.company.address || "",
          });
        }
      } catch (err) {
        console.error(err);
        setMessage("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployer();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/employer/company-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          companyName: form.companyName,
          phone: form.phone,
          website: form.website,
          address: form.address,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Company profile updated successfully!");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile");
    }
  };

  if (loading)
    return <p className="text-gray-500 mt-10 text-center">Loading...</p>;

  return (
    <div className="p-8 bg-white rounded shadow max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">Company Profile</h2>

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
        {/* Row 1: Company Name / Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
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
        </div>

        {/* Row 2: Phone / Website */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Website</label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Row 3: Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
