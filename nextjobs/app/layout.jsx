import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainWrapper from "./components/MainWrapper"; // client wrapper

export const metadata = {
  title: "Next Jobs",
  description: "Next.js Job board Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans flex flex-col min-h-screen">
        <Header />
        <MainWrapper>{children}</MainWrapper>
        <Footer />
      </body>
    </html>
  );
}
