import React, { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  query,
  setQuery,
  selectedFilters,
  setSelectedFilters,
  selectedRole,
  onRoleChange,
}) => {
  const handleBadgeClick = (badge: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(badge)
        ? prevFilters.filter((filter) => filter !== badge)
        : [...prevFilters, badge]
    );
  };

  return (
    <div className="header p-4 bg-gray-100 shadow">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="search-input border rounded w-full p-2 mb-4"
      />

      {/* Role Level Selector */}
      <select
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value)}
        className="role-selector border rounded w-full p-2 mb-4"
      >
        <option value="">All Levels</option>
        <option value="intern">Intern</option>
              <option value="new grad">New Grad</option>
              <option value="Junior Engineer">Junior Engineer</option>
              <option value="Senior Engineer">Senior Engineer</option>
              <option value="Staff Engineer">Staff Engineer</option>
              <option value="Associate">Associate</option>
              <option value="Engineering Manager">Engineering Manager</option>

        {/* Add other levels as needed */}
      </select>

      {/* Badge Filters */}
      <div className="badges flex flex-wrap gap-2">
        {['leetcode', 'system design', 'oa', 'HR','behavioral','pre screen','technical', 'offer', 'no offer'].map((badge) => (
          <button
            key={badge}
            onClick={() => handleBadgeClick(badge)}
            className={`badge px-4 py-2 border rounded ${
              selectedFilters.includes(badge)
                ? 'bg-blue-500 text-white border-blue-700'
                : 'bg-gray-200 text-gray-700 border-gray-300'
            }`}
          >
            {badge}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
