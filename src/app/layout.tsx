import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cover Page Generator — Create University Assignment & Lab Report Covers",
  description:
    "Generate professional university assignment and lab report cover pages as downloadable PDFs. Free, fast, and fully client-side — no sign-up required.",
  keywords: [
    "cover page generator",
    "assignment cover page",
    "lab report cover page",
    "university cover page",
    "PDF generator",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
