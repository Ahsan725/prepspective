"use client";

import React, { useState } from "react";
import CombinedView from "./CombinedView";
import { Input } from "@/components/ui/input"; // Adjust the import path as needed
import { Button } from "@/components/ui/button"; // Adjust the import path as needed


const ACCESS_PASSWORD = "class-700";

const Page: React.FC = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      setAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (authenticated) {
    return <CombinedView />;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10">
      <h2 className="mb-4 text-center text-2xl font-medium">
        Enter Early Access password to view this page:
          </h2>
          <p className="font-extralight mb-2 text-indigo-500 text-sm mx-auto px-2">If you do not have access but would like to get access sign up for the waitlist!</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <Input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          }}
          placeholder="Password"
          className="mb-2 w-80"
        />
        <Button type="submit">Submit</Button>
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default Page;
