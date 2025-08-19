"use client";
import { useEffect, useState } from "react";

export default function DashboardContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // send cookies
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch user");
          setLoading(false);
          return;
        }

        setUser(data.user);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Server error");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>;

  return (
    <div className="p-3 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Welcome, {user?.username}!
      </h2>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> <span className="text-green-600 font-semibold">{user?.role}</span></p>
      <p className="mt-4">This is your candidate dashboard overview.</p>
    </div>
  );
}
