import React from 'react';
import { Building, MessageCircle, Star, List, CheckCircle } from 'lucide-react';

type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'company', label: 'Company', icon: <Building className="w-4 h-4" /> },
    { key: 'questions', label: 'Questions', icon: <MessageCircle className="w-4 h-4" /> },
    { key: 'ratings', label: 'Ratings', icon: <Star className="w-4 h-4" /> },
    { key: 'rounds', label: 'Rounds', icon: <List className="w-4 h-4" /> },
    { key: 'leetcode', label: 'LeetCode', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="border-b border-gray-200">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
        {tabs.map(({ key, label, icon }) => (
          <li key={key} className="me-2">
            <button
              onClick={() => setActiveTab(key)}
              className={`inline-flex items-center justify-center p-4 border-b-2 ${
                activeTab === key
                  ? 'text-indigo-700 font-semibold border-indigo-600'
                  : 'border-transparent hover:text-indigo-700 hover:border-indigo-700'
              }`}
            >
              <span className="block">{icon}</span>
              <span className="hidden sm:block ml-2">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
