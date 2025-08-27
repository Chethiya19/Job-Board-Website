"use client";
import { usePathname, useRouter } from "next/navigation";

export default function JobSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const jobCategories = [
    "IT Software/DB/QA/Web/Graphics/GIS",
    "IT Hardware/Networks/Systems",
    "Accounting/Auditing/Finance",
    "Banking & Finance/Insurance",
    "Sales/Marketing/Merchandising",
    "HR/Training",
    "Corporate Management/Analysts",
    "Office Admin/Secretary/Receptionist",
    "Civil Eng/Interior Design/Architecture",
    "IT-Telecoms",
    "Customer Relations/Public Relations",
    "Logistics/Warehouse/Transport",
    "Eng-Mechanical/Automotive/Electrical",
    "Manufacturing/Operations",
    "Media/Advertising/Communication",
    "Hotel/Restaurant/Hospitality",
    "Travel/Tourism",
    "Sports/Fitness/Recreation",
    "Hospital/Nursing/Healthcare",
    "Legal/Law",
    "Supervision/Quality Control",
    "Apparel/Clothing",
    "Ticketing/Airline/Marine",
    "Education",
    "R&D/Science/Research",
    "Agriculture/Dairy/Environment",
    "Security",
    "Fashion/Design/Beauty",
    "International Development",
    "KPO/BPO",
    "Imports/Exports",
    "All Vacancies",
  ];

  const handleNavigation = (slug) => {
    const path = `/jobs/category/${slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\//g, "-")}`;
    router.push(path);
  };

  return (
    <div
      style={{
        width: "20rem",
        height: "85vh",
        backgroundColor: "#1d4ed8",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "1rem",
          fontSize: "1.25rem",
          fontWeight: "bold",
          borderBottom: "2px solid #799ef0ff",
        }}
      >
        Select Job Category
      </div>

      {/* Scrollable nav with styled scrollbar */}
      <nav
        style={{
          flex: 1,
          padding: "0.1rem",
          overflowY: "auto",
        }}
        className="custom-scrollbar"
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {jobCategories.map((cat) => {
            const slug = cat
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/\//g, "-");
            const path = `/jobs/category/${slug}`;
            const isActive = pathname === path;

            return (
              <li
                key={cat}
                className={`px-4 py-2 rounded cursor-pointer text-sm font-medium ${
                  isActive ? "bg-blue-500" : "hover:bg-blue-900"
                }`}
                onClick={() => handleNavigation(cat)}
              >
                {cat}
              </li>
            );
          })}
        </ul>
      </nav>

      <style jsx>{`
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1d4ed8; /* blue track */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #9ca3af; /* gray thumb */
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280; /* darker gray on hover */
        }
      `}</style>
    </div>
  );
}