"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const handleProfileClick = () => {
    if (!user) return;
    if (user.role === "Candidate") {
      router.push("/candidate/dashboard");
    } else if (user.role === "Employer") {
      router.push("/employer/dashboard");
    }
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.75rem 1.5rem",
      background: "#1d4ed8",
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
    userWrapper: {
      display: "flex",
      alignItems: "center",
      position: "relative",
      cursor: "pointer",
      gap: "0.5rem",
    },
    userIcon: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      background: "#fff",
      color: "#2c7bd4",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "700",
      fontSize: "1rem",
    },
    userName: {
      color: "#fff",
      fontWeight: "500",
    },
    dropdownMenu: {
      position: "absolute",
      top: "120%",
      right: 0,
      background: "#fff",
      color: "#333",
      borderRadius: "0.25rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      padding: "0.5rem 0",
      minWidth: "150px",
      display: menuOpen ? "block" : "none",
      zIndex: 1000,
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
      <Link href="/" style={styles.brand}>Next Jobs</Link>

      <div style={styles.navLinks}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/jobs" style={styles.link}>Jobs</Link>
        <Link href="/companies" style={styles.link}>Companies</Link>

        <div ref={dropdownRef} style={styles.userWrapper} onClick={() => setMenuOpen((prev) => !prev)}>
          <div style={styles.userIcon}>{user ? user.name.charAt(0).toUpperCase() : "👤"}</div>
          {user && <span style={styles.userName}>{user.name}</span>}

          <div style={styles.dropdownMenu}>
            {!user ? (
              <>
                <Link href="/login" style={styles.dropdownItem}>Login</Link>
                <Link href="/register" style={styles.dropdownItem}>Register</Link>
              </>
            ) : (
              <>
                <span style={styles.dropdownItem} onClick={handleProfileClick}>Profile</span>
                <span style={styles.dropdownItem} onClick={handleLogout}>Logout</span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
