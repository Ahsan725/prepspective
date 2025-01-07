"use client";

import React, { useEffect } from "react";
import { useAuth } from "@clerk/nextjs"; // Import Clerk's useAuth hook
import { useRouter } from "next/navigation";
import CombinedView from "./CombinedView";

const Page: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth(); // Add isLoaded to ensure auth status is fully resolved
  const router = useRouter(); // Next.js router for redirection

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setTimeout(() => {
        router.push("/"); // Redirect to root after the message is shown
      }, 9000); // Delay of 5 seconds
    }
  }, [isSignedIn, isLoaded, router]);

  // While auth status is loading, show nothing or a loading state
  if (!isLoaded) {
    return null;
  }

  // If not signed in, show the message
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen pt-10">
        <div className="mb-4">
          <h2 className="inline-block font-extrabold text-xs sm:text-sm md:text-lg lg:text-xl text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-1">
            Sign in to view this page. Redirecting...
          </h2>
        </div>
      </div>
    );
  }
  // If signed in, render the CombinedView component
  return (
      <CombinedView />
  );
};

export default Page;
