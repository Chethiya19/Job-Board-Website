"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  // CSS-in-JS styles
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.75rem 1.5rem",
      background: "#2c7bd4ff",
      color: "#fff",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    brand: {
      fontWeight: "700",
      fontSize: "1.5rem",
      color: "#fff",
      textDecoration: "none",
    },
    navLinks: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontWeight: "500",
      cursor: "pointer",
    },
    toggleButton: {
      display: "none",
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      color: "#fff",
      cursor: "pointer",
    },
    dropdown: {
      position: "relative",
    },
    dropdownMenu: {
      position: "absolute",
      top: "100%",
      right: 0,
      background: "#fff",
      color: "#333",
      borderRadius: "0.25rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      padding: "0.5rem 0",
      minWidth: "150px",
      display: menuOpen ? "block" : "none",
    },
    dropdownItem: {
      padding: "0.5rem 1rem",
      cursor: "pointer",
      color: "#333",
      textDecoration: "none",
      display: "block",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link href="/" style={styles.brand}>
        Next Jobs
      </Link>

      {/* Toggle button for mobile */}
      <button
        style={styles.toggleButton}
        className="mobile-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div style={styles.navLinks}>
        <Link href="/" style={styles.link}>
          Home
        </Link>

        {!user && (
          <>
            <Link href="/login" style={styles.link}>
              Login
            </Link>
            <Link href="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}

        {user && (
          <div style={styles.dropdown}>
            <span
              style={styles.link}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {user.name} ▼
            </span>
            <div style={styles.dropdownMenu}>
              <Link href="/profile" style={styles.dropdownItem}>
                Profile
              </Link>
              <span
                style={styles.dropdownItem}
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
