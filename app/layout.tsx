'use client';

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import CustomNavbar from "@/components/ui/customNavbar";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import AdSense from "../components/AdSense";
import TopProgressBar from "@/components/ui/topProgressBar";
import { useEffect, useRef } from "react";
import { useToast } from '@/hooks/use-toast';

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

// export const metadata: Metadata = {
//   title: "PrepSpective",
//   description: "Prep 10x Better",
// };

// Listens for sign-in / sign-out and shows a toast
function AuthListener() {
  const { isSignedIn, isLoaded } = useUser();
  const { toast } = useToast();
  const prevSignedIn = useRef<boolean>();

  useEffect(() => {
    // wait until Clerk has loaded the user state
    if (!isLoaded) return;

    // on first load, initialize prevSignedIn and bail out
    if (prevSignedIn.current === undefined) {
      prevSignedIn.current = isSignedIn;
      return;
    }

    // on subsequent changes only, fire the toast
    if (prevSignedIn.current !== isSignedIn) {
      if (isSignedIn) {
        toast({
          title: "Oh, look who is back!",
          description: "You are logged in.",
        });
      } else {
        toast({
          title: "We will miss you, come back soon!.",
          description: "You have logged out.",
        });
      }
    }

    prevSignedIn.current = isSignedIn;
  }, [isLoaded, isSignedIn, toast]);

  return null;
}

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
      }}
    >
      <html lang="en">
        <head>
          <AdSense pId="1030596789108573" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <TopProgressBar />
          <AuthListener />
          <CustomNavbar />
          {children}
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
