import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cancer Cure Research App",
  description: "AI-assisted oncology research dashboard for treatment discovery and clinical trial tracking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
