"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // send cookies with request
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

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>
    );

  const cardStyle = {
    maxWidth: "500px",
    margin: "3rem auto",
    padding: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    background: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const roleStyle = {
    color: user.role === "Employer" ? "#4f46e5" : "#10b981",
    fontWeight: "600",
  };

  return (
    <div style={cardStyle}>
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Dashboard
      </h2>

      <p className="mb-2">
        <strong>Name:</strong> {user.name}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-4">
        <strong>Role:</strong> <span style={roleStyle}>{user.role}</span>
      </p>

      <div className="mt-4 text-gray-700">
        {user.role === "Candidate" ? (
          <p>
            Welcome Candidate! Browse jobs, apply, and manage your applications.
          </p>
        ) : (
          <p>
            Welcome Employer! Post jobs, manage applicants, and track
            applications.
          </p>
        )}
      </div>
    </div>
  );
}
