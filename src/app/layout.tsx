import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DevHub - All-in-One Developer Resource Hub",
  description: "Your ultimate destination for developer tools, resources, documentation, and utilities. No more endless Google searches - everything developers need in one place.",
  keywords: "developer tools, code generators, API documentation, developer resources, programming utilities, web development, coding tools, developer hub",
  authors: [{ name: "DevHub Team" }],
  robots: "index, follow",
  openGraph: {
    title: "DevHub - Developer Resource Hub",
    description: "All-in-one platform for developer tools, resources, and utilities. Built by developers, for developers.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevHub - Developer Resource Hub",
    description: "Your one-stop destination for all developer tools and resources. No more endless searching!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/Official Logo.jpg" />
        <meta name="theme-color" content="#08f9ff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
