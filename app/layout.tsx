import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dhanush Kumar | Full-Stack Architect & AI Specialist",
  description: "Dhanush Kumar is a high-performance Full-Stack Architect specializing in scalable backend systems, AI agents, and production-ready applications. Explore his work in system design, Web3, and microservices.",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: ["Dhanush Kumar", "Full Stack Developer", "Backend Architect", "AI Agent Developer", "System Design", "Node.js", "React.js", "Microservices", "Web3", "Portfolio"],
  authors: [{ name: "Dhanush Kumar" }],
  creator: "Dhanush Kumar",
  publisher: "Dhanush Kumar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dhanush Kumar | Full-Stack Architect & AI Specialist",
    description: "Architecting high-performance systems and AI-driven automation. View projects and technical expertise.",
    url: "https://dhanushkumaramk.dev", // Replace with actual domain if known
    siteName: "Dhanush Kumar Portfolio",
    images: [
      {
        url: "/og-image.png", // Recommended to have a professional image here
        width: 1200,
        height: 630,
        alt: "Dhanush Kumar Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhanush Kumar | Full-Stack Architect & AI Specialist",
    description: "Building scalable backend architectures and AI agents. Explorer Dhanush's portfolio.",
    creator: "@dhanushkumar_amk",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
