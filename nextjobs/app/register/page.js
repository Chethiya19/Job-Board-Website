"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Candidate" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("✅ Registration successful! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage("❌ " + data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-10 bg-light">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "420px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>

        {message && <div className="alert alert-info text-center py-2">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-3"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-3"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Role</label>
            <select
              className="form-select rounded-3"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="Candidate">Candidate</option>
              <option value="Employer">Employer</option>
            </select>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-100 rounded-3 fw-semibold">
            Register
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none fw-bold text-primary">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
