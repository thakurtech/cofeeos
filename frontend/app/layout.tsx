import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CaféOS - AI-Powered Café Management Platform",
  description: "Transform your café with our all-in-one POS, loyalty, and AI marketing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
