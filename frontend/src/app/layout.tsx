import type { Metadata } from "next";
import "./globals.css";
import Footer from '../components/Footer';



export const metadata: Metadata = {
  title: "Helper",
  description: "Disability Support Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
