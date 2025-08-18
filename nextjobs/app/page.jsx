export default function Home() {
  return (
    <div className="d-flex flex-column min-vh-10">
      <main className="flex-grow-1">
        <section className="bg-light py-5 text-center">
          <div className="container">
            <h1 className="display-4 fw-bold text-primary">Welcome to Next Jobs</h1>
            <p className="lead text-secondary mb-4">
              Find your dream job or hire the best talent easily.
            </p>
            <a href="/register" className="btn btn-primary btn-lg me-2 rounded-pill">
              Get Started
            </a>
            <a href="/login" className="btn btn-outline-primary btn-lg rounded-pill">
              Login
            </a>
          </div>
        </section>

        <section className="py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card shadow-sm p-3 text-center h-100">
                  <h5 className="fw-bold">Post Jobs</h5>
                  <p className="text-muted">Employers can post jobs and attract the best candidates.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm p-3 text-center h-100">
                  <h5 className="fw-bold">Apply Easily</h5>
                  <p className="text-muted">Candidates can browse and apply for jobs quickly.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm p-3 text-center h-100">
                  <h5 className="fw-bold">Secure & Fast</h5>
                  <p className="text-muted">Our platform ensures secure and fast interactions for all users.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
