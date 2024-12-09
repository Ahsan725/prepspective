import React, { Dispatch, SetStateAction } from 'react';
import { Badge } from '@/components/ui/badge'; // Update this import based on your project structure.

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
    <div className="header p-4 bg-gray-100 shadow flex items-center gap-4">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="search-input border rounded p-2 w-2/6"
      />

      {/* Role Level Selector */}
      <select
        value={selectedRole}
        onChange={(e) => onRoleChange(e.target.value)}
        className="role-selector border rounded p-2 w-1/6"
      >
        <option value="">All Levels</option>
        <option value="intern">Intern</option>
        <option value="new grad">New Grad</option>
        <option value="Junior Engineer">Junior Engineer</option>
        <option value="Senior Engineer">Senior Engineer</option>
        <option value="Staff Engineer">Staff Engineer</option>
        <option value="Associate">Associate</option>
        <option value="Engineering Manager">Engineering Manager</option>
      </select>

      {/* Badge Filters */}
      <div className="badges flex flex-wrap gap-2 w-3/6">
        {[
          'leetcode',
          'system design',
          'oa',
          'HR',
          'behavioral',
          'pre screen',
          'technical',
          'offer',
          'no offer',
        ].map((badge) => (
          <Badge
            key={badge}
            variant={selectedFilters.includes(badge) ? 'default' : 'outline'}
            onClick={() => handleBadgeClick(badge)}
            className="cursor-pointer"
          >
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Header;
