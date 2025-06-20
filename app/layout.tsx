import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IntervYou",
  description: "Where Your Career Conversation Begins",
  creator: "Snehashis Gharai & Ushana Kundu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
