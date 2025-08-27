"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function CandidateSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/candidate/dashboard" },
    { name: "Personal Details", path: "/candidate/personal-details" },
    { name: "Education", path: "/candidate/education" },
    { name: "Experience", path: "/candidate/experience" },
    { name: "Resume", path: "/candidate/resume" },
    { name: "Applied Jobs", path: "/candidate/applied-jobs" },
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

  // CSS as JS objects
  const styles = {
    sidebar: {
      width: "16rem",
      height: "85vh",
      backgroundColor: "#1d4ed8", // blue-700
      color: "white",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      padding: "1.5rem",
      fontSize: "1.5rem",
      fontWeight: "bold",
      borderBottom: "2px solid #2563eb", // blue-600
    },
    nav: {
      flex: 1,
      padding: "1rem",
    },
    ul: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    li: {
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      fontWeight: 500,
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    activeLi: {
      backgroundColor: "#3b82f6", // blue-500
    },
    logoutBtn: {
      margin: "1rem",
      padding: "0.5rem 1rem",
      backgroundColor: "#ef4444", // red-500
      color: "white",
      fontWeight: 600,
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>Candidate</div>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li
                key={item.path}
                style={{
                  ...styles.li,
                  ...(isActive ? { backgroundColor: "#3b82f6" } : {}),
                }}
                onClick={() => handleNavigation(item.path)}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "#1e40af"; // blue-800
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isActive ? "#3b82f6" : "transparent";
                }}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </nav>
      <button
        style={styles.logoutBtn}
        onClick={handleLogout}
        disabled={loading}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#dc2626")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#ef4444")
        }
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
