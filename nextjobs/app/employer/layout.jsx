import EmployerSidebar from "../components/EmployerSidebar";

export default function EmployerLayout({ children }) {
  return (
    <div className="d-flex">
      <EmployerSidebar />
      <div className="flex-grow-1 p-4">{children}</div>
    </div>
  );
}
