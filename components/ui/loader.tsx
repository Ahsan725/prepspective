import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-indigo-600 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-indigo-700 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};

export default Loader;
