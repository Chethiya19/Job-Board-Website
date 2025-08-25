"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("/api/common/companies");
        setCompanies(res.data.companies.map(c => c.companyName));
      } catch (err) {
        console.error(err);
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Company List</h2>
      <ul className="list-disc pl-5">
        {companies.map((company, index) => (
          <li key={index}>{company}</li>
        ))}
      </ul>
    </div>
  );
}
