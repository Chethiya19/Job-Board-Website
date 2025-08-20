"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleProfileClick = () => {
    if (!user) return;
    if (user.role === "Candidate") {
      router.push("/candidate/dashboard");
    } else if (user.role === "Employer") {
      router.push("/employer/dashboard");
    }
  };

  const dropdownItems = !user
    ? [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ]
    : [
        { label: "Profile", onClick: handleProfileClick },
        { label: "Logout", onClick: handleLogout },
      ];

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
      transition: "background 0.2s, color 0.2s",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link href="/" style={styles.brand}>Next Jobs</Link>

      <div style={styles.navLinks}>
        <Link href="/" style={styles.link}>Home</Link>
        <Link href="/jobs" style={styles.link}>Jobs</Link>
        <Link href="/companies" style={styles.link}>Companies</Link>

        <div
          ref={dropdownRef}
          style={styles.userWrapper}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <div style={styles.userIcon}>{user ? user.name.charAt(0).toUpperCase() : "👤"}</div>
          <span style={styles.arrow}>▼</span>
          {user && <span style={styles.userName}>{user.name}</span>}

          <div style={styles.dropdownMenu}>
            {dropdownItems.map((item, index) =>
              item.href ? (
                <Link
                  key={index}
                  href={item.href}
                  style={{
                    ...styles.dropdownItem,
                    backgroundColor: hoveredIndex === index ? "#f0f0f0" : "transparent",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={index}
                  style={{
                    ...styles.dropdownItem,
                    backgroundColor: hoveredIndex === index ? "#f0f0f0" : "transparent",
                  }}
                  onClick={item.onClick}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.label}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
