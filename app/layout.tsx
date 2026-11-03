import type { Metadata } from "next";
import "./globals.css";
import { LayoutSections } from "@/components/sections/LayoutSections";

export const metadata: Metadata = {
  title: "Ismail Gilang Maulana — Fullstack Developer & Software Engineer",
  description:
    "Portfolio of Ismail Gilang Maulana, a Fullstack Developer and Software Engineer building scalable, resilient, and high-performance web systems with TypeScript, Next.js, Node.js, and distributed architectures.",
  keywords: [
    "Ismail Gilang Maulana",
    "Fullstack Developer",
    "Software Engineer",
    "Web Developer",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "Golang",
    "PostgreSQL",
    "Distributed Systems",
    "Backend Engineer",
    "Portfolio",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased font-body selection:bg-secondary selection:text-neutral">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,300..800&family=Instrument+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-light text-neutral antialiased">
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-secondary focus:text-neutral focus:px-3.5 focus:py-2 focus:font-semibold"
        >
          Skip to content
        </a>
        <LayoutSections />
      </body>
    </html>
  );
}
