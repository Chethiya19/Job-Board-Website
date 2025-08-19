import CandidateSidebar from "../components/CandidateSidebar";

export default function CandidateLayout({ children }) {
  return (
    <div className="d-flex">
      <CandidateSidebar />
      <div className="flex-grow-1 p-4">{children}</div>
    </div>
  );
}
