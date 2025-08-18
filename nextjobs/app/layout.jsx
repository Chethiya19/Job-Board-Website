import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Next Jobs",
  description: "Next.js auth with login/register frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
