"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function EmployerSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/employer/dashboard" },
    { name: "Company Profile", path: "/employer/company-profile" },
    { name: "Post Jobs", path: "/employer/post-jobs" },
    { name: "Manage Jobs", path: "/employer/manage-jobs" },
    { name: "Applications", path: "/employer/applications" },
    { name: "Shortlisted", path: "/employer/shortlisted" },
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        localStorage.removeItem("user");
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "16rem", height: "80vh", backgroundColor: "#1d4ed8", color: "white", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "1.5rem", fontSize: "1.5rem", fontWeight: "bold", borderBottom: "2px solid #2563eb" }}>
        Employer
      </div>
      <nav style={{ flex: 1, padding: "1rem" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li
              key={item.path}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: 500,
                cursor: "pointer",
                backgroundColor: pathname === item.path ? "#3b82f6" : "transparent",
              }}
              onClick={() => handleNavigation(item.path)}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  pathname === item.path ? "#3b82f6" : "transparent")
              }
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
      <button
        style={{ margin: "1rem", padding: "0.5rem 1rem", backgroundColor: "#ef4444", color: "white", fontWeight: 600, border: "none", borderRadius: "0.5rem", cursor: "pointer" }}
        onClick={handleLogout}
        disabled={loading}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
