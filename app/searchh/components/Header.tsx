'use client';

import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'; // Adjust import path for ShadCN components

interface HeaderProps {
  query: string;
  setQuery: (query: string) => void;
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}

const levels = [
  "Intern",
  "New Grad",
  "Junior Engineer",
  "Senior Engineer",
  "Staff Engineer",
  "Principal Engineer",
  "Associate",
  "Engineering Manager",
];

const otherFilters = [
  "LeetCode",
  "HR",
  "System Design",
  "Pre Screen",
  "OA",
  "Team Matching",
  "Behavioral",
  "Technical",
  "Offer",
  "No Offer",
];

const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  selectedFilters,
  setSelectedFilters,
}) => {
  // Handle dropdown (levels) selection
  const handleDropdownChange = (level: string) => {
    // Remove any existing level filters and add the new one
    const updatedFilters = [
      ...selectedFilters.filter((filter) => !levels.includes(filter)),
      level,
    ];
    setSelectedFilters(updatedFilters);
  };

  // Handle badge filter toggling
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="p-6 bg-blue-500 text-white rounded-b-lg shadow-md">
      <h1 className="text-3xl font-bold mb-2 text-center">Find Your Dream Job</h1>
      <p className="text-lg mb-4 text-center">
        Looking for jobs? Browse our latest job openings to view.
      </p>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="p-2 w-full lg:w-1/3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {/* Role Levels Dropdown */}
        <Select onValueChange={handleDropdownChange}>
          <SelectTrigger className="w-64 bg-blue-600 text-white rounded-md">
            <SelectValue placeholder="Select Role Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Other Filters as Badges */}
        {otherFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              selectedFilters.includes(filter)
                ? "bg-white text-blue-500 border-white"
                : "bg-blue-600 text-white border-blue-500"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
