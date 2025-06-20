import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "IntervYou",
  description: "Where Your Career Conversation Begins",
  creator: "Snehashis Gharai & Ushana Kundu",
  keywords: [
    "interview",
    "career",
    "job",
    "preparation",
    "platform",
    "IntervYou",
    "mock interview",
    "career growth",
    "job search",
  ],
  authors: [{ name: "Snehashis Gharai" }, { name: "Ushana Kundu" }],
  openGraph: {
    title: "IntervYou",
    description: "Where Your Career Conversation Begins",
    url: "https://intervyou-ai-platform.vercel.app/",
    siteName: "IntervYou",
    images: [
      {
        url: "/IntervYou-Logo.svg",
        width: 1200,
        height: 630,
        alt: "IntervYou Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntervYou",
    description: "Where Your Career Conversation Begins",
    images: ["/IntervYou-Logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
