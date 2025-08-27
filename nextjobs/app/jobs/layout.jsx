import JobSidebar from "../components/JobSidebar";

export default function JobLayout({ children }) {
  return (
    <div className="d-flex">
      <JobSidebar />
      <div className="flex-grow-1 pl-3 pt-3">{children}</div>
    </div>
  );
}
