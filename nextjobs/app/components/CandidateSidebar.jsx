"use client";
import { usePathname } from "next/navigation";

export default function CandidateSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/candidate/dashboard" },
    { name: "Personal Details", path: "/candidate/personal-details" },
    { name: "Education", path: "/candidate/education" },
    { name: "Experience", path: "/candidate/experience" },
    { name: "Resume", path: "/candidate/resume" },
    { name: "Applied Jobs", path: "/candidate/applied-jobs" },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  // CSS as JS objects
  const styles = {
    sidebar: {
      width: "16rem",
      height: "80vh",
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
    liHover: {
      backgroundColor: "#2563eb", // blue-600
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
    logoutBtnHover: {
      backgroundColor: "#dc2626", // red-600
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>Candidate</div>
      <nav style={styles.nav}>
        <ul style={styles.ul}>
          {menuItems.map((item) => (
            <li
              key={item.path}
              style={{
                ...styles.li,
                ...(pathname === item.path ? styles.activeLi : {}),
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
        style={styles.logoutBtn}
        onClick={() => handleNavigation("/login")}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
      >
        Logout
      </button>
    </div>
  );
}
