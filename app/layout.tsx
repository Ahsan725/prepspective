import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs"; // Import ClerkProvider
import { Toaster } from "@/components/ui/toaster";
import TempNavbar from "@/components/ui/tempNavbar";
import CustomNavbar from "@/components/ui/customNavbar";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import AdSense from "../components/AdSense";

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
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary:
            "text-primary-foreground hover:bg-indigo-700/90 relative overflow-hidden rounded-md px-5 py-2.5 text-white duration-300 shadow-xl hover:shadow-xl [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-102 active:scale-y-97 bg-gradient-to-r from-indigo-800 to-indigo-400 text-sm",
        },
      }}>
      {/* Wrap the entire app with ClerkProvider */}
      <html lang="en">
      <head>
        <AdSense pId="ca-pub-1030596789108573"/>
      </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <CustomNavbar />
          {/* <TempNavbar /> */}
          {children}
          <Analytics />
          <Toaster />
          {/* <FluidCursor /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
