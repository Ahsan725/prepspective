import React, { Dispatch, SetStateAction } from 'react';
import { Badge } from '@/components/ui/badge'; // Update this import based on your project structure.
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <div className="header p-1 bg-white flex flex-wrap md:flex-nowrap items-center gap-4">
      {/* Search Input */}
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="search-input w-full md:w-2/6 lg:ml-4"
      />

      {/* Role Level Selector */}
      <Select
        value={selectedRole || 'all-levels'} // Default to "all-levels" when no role is selected
        onValueChange={(value) => onRoleChange(value === 'all-levels' ? '' : value)}
      >
        <SelectTrigger className="w-full md:w-1/5">
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-levels">All Levels</SelectItem>
          <SelectItem value="intern">Intern</SelectItem>
          <SelectItem value="new grad">New Grad</SelectItem>
          <SelectItem value="Junior Engineer">Junior Engineer</SelectItem>
          <SelectItem value="Senior Engineer">Senior Engineer</SelectItem>
          <SelectItem value="Staff Engineer">Staff Engineer</SelectItem>
          <SelectItem value="Associate">Associate</SelectItem>
          <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
        </SelectContent>
      </Select>

      {/* Badge Filters */}
      <div className="badges flex flex-wrap gap-2 w-full mt-4 md:mt-0">
        {[
          'LeetCode',
          'System Design',
          'OA',
          'HR',
          'Behavioral',
          'Pre Screen',
          'Technical',
          'Offer',
          'No Offer',
          'Onsite',
          'Team Match',
        ].map((badge) => (
          <Badge
            key={badge}
            variant="outline" // Always use outline as the base variant
            onClick={() => handleBadgeClick(badge)}
            className={`cursor-pointer px-2.5 py-0.5 text-xs font-semibold ${
              selectedFilters.includes(badge)
                ? 'bg-gradient-to-r from-indigo-800 to-indigo-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Header;
