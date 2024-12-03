import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; // Import ClerkProvider
import { Toaster } from "@/components/ui/toaster";
import TempNavbar from "@/components/ui/tempNavbar";
import FluidCursor from "@/components/ui/fluidCursor";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PrepSpective",
  description: "Prep 10x Better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      {/* Wrap the entire app with ClerkProvider */}
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <CustomNavbar /> this will be used later */}
          <TempNavbar />
          {children}
          <Toaster />
          <FluidCursor />
        </body>
      </html>
    </ClerkProvider>
  );
}
