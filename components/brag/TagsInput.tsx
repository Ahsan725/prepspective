'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagsInputProps {
  value: string; // Comma separated tags
  onChange: (value: string) => void;
}

const TagsInput = ({ value, onChange }: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const tags = value ? value.split(',').filter(Boolean) : [];

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed].join(','));
      setInputValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1).join(','));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove).join(','));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Tags</label>
      <div className="flex flex-wrap gap-2 p-2 bg-zinc-900 border border-zinc-800 rounded-xl focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-colors">
        {tags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? "e.g., React, Hiring, Public Speaking" : ""}
          className="flex-1 bg-transparent border-none outline-none text-white text-sm min-w-[120px] placeholder:text-zinc-600"
        />
      </div>
      <p className="text-[10px] text-zinc-600 pl-1">Press Enter to add tags</p>
    </div>
  );
};

export default TagsInput;
