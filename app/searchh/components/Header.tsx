import React from 'react';

interface HeaderProps {
  query: string;
  setQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ query, setQuery }) => {
  return (
    <div className="bg-indigo-600 text-white p-2">
      <h1 className="text-3xl font-bold mb-2 text-center">Prepare for Your Dream Job</h1>
      <p className="text-lg mb-2">
        Looking for jobs? Browse our latest job openings to view.
      </p>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          className="p-1 w-full text-indigo-800 lg:w-1/3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;
