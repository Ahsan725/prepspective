"use client";
import { Button } from "@/components/ui/button";

export function RandomLeetCodeQuestion() {
  const handleButtonClick = () => {
    const randomNumber = Math.floor(Math.random() * 3313) + 1;
    const searchQuery = `Leetcode ${randomNumber}`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleSearchUrl, "_blank");
  };

  return (
    <div className="mt-4 rounded-lg">
      <h2 className="text-md font-medium text-gray-600 mb-4">
        Unsure what question to ask? Click the button below to get a suggested LeetCode question that you can use during your mock interview.
      </h2>
      <Button
        onClick={handleButtonClick}
        variant="outline"
        className=""
      >
        Get a Suggested LeetCode Question
      </Button>
    </div>
  );
}