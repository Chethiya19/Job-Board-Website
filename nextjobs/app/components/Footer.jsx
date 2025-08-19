"use client";

export default function Footer() {
  const styles = {
    footer: {
      background: "#1d4ed8",
      color: "#fff",
      padding: "1.5rem 1rem",
      marginTop: "auto",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
    },
    links: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color 0.2s",
    },
    linkHover: {
      color: "#d1d5db",
    },
    copyright: {
      margin: 0,
      fontSize: "0.9rem",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.copyright}>
          &copy; 2025 Next Jobs. All rights reserved.
        </p>
        <div style={styles.links}>
          <a href="#" style={styles.link}>
            Privacy Policy
          </a>
          <a href="#" style={styles.link}>
            Terms
          </a>
          <a href="#" style={styles.link}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
