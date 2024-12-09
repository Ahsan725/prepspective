import React from 'react';

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

const otherFilters = ["LeetCode", "Rounds", "Behavioral", "Technical", "Offer", "No Offer"];

const Header: React.FC<HeaderProps> = ({ query, setQuery, selectedFilters, setSelectedFilters }) => {
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
        {/* Levels Filters */}
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => toggleFilter(level)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              selectedFilters.includes(level)
                ? "bg-white text-blue-500 border-white"
                : "bg-blue-600 text-white border-blue-500"
            }`}
          >
            {level}
          </button>
        ))}

        {/* Other Filters */}
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
