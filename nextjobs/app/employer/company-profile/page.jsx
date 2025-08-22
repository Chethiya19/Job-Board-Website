"use client";
import { useEffect, useState } from "react";

export default function CompanyProfile() {
  const [form, setForm] = useState({
    companyName: "",
    email: "", // read-only
    phone: "",
    website: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1️⃣ Fetch employer/company info
        const companyRes = await fetch("/api/employer/get-company-profile", {
          method: "GET",
          credentials: "include",
        });
        const companyData = await companyRes.json();

        if (!companyRes.ok) {
          setMessage(companyData.message || "Failed to fetch company profile");
          return;
        }

        // 2️⃣ Fetch email from /api/auth/me
        const userRes = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });
        const userData = await userRes.json();

        if (!userRes.ok) {
          setMessage(userData.message || "Failed to fetch user data");
          return;
        }

        setForm({
          companyName: companyData.company?.companyName || "",
          email: userData.user?.email || "", // email from User table
          phone: companyData.company?.phone || "",
          website: companyData.company?.website || "",
          address: companyData.company?.address || "",
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
        setMessage("✅ Company profile saved successfully!");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save company profile");
    }
  };

  if (loading) return <p className="text-gray-500 mt-10 text-center">Loading...</p>;

  return (
    <div className="p-8 bg-white rounded shadow max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Company Profile</h2>

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
              value={form.email} // email from User table
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
        </div>

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
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
