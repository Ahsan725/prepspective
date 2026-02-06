'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Loader2, X, Trophy, TrendingUp, Lightbulb, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addBragItem, updateBragItem } from '@/lib/actions/brag-actions';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import TagsInput from './TagsInput';
import { SelectBragItem } from '@/db/schema';

const categories = [
  { id: 'Impact', label: 'Impact', icon: TrendingUp, iconColor: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  { id: 'Leadership', label: 'Leadership', icon: Trophy, iconColor: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { id: 'Technical', label: 'Technical', icon: Lightbulb, iconColor: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  { id: 'Other', label: 'Other', icon: Star, iconColor: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
];

interface BragItemFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: SelectBragItem; // If provided, it's edit mode
}

export const BragItemFormSheet = ({ open, onOpenChange, initialData }: BragItemFormSheetProps) => {
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [selectedCategory, setSelectedCategory] = useState(initialData?.category || 'Impact');
  const [tags, setTags] = useState(initialData?.tags || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [metric, setMetric] = useState(initialData?.metric || '');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().slice(0, 10));

  const router = useRouter();
  const isEditing = !!initialData;

  // Reset form when opening fresh
  useEffect(() => {
    if (open) {
      if (initialData) {
        setSelectedCategory(initialData.category);
        setTags(initialData.tags || '');
        setTitle(initialData.title);
        setDescription(initialData.description || '');
        setMetric(initialData.metric || '');
        setDate(initialData.date);
      } else {
        // Reset for valid new entry
        setSelectedCategory('Impact');
        setTags('');
        setTitle('');
        setDescription('');
        setMetric('');
        setDate(new Date().toISOString().slice(0, 10));
      }
    }
  }, [open, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      description,
      category: selectedCategory,
      metric,
      date,
      tags,
    };

    try {
      if (isEditing && initialData) {
        await updateBragItem(initialData.id, data);
      } else {
        await addBragItem(data);
      }
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedCat = categories.find(c => c.id === selectedCategory) || categories[0];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full max-w-xl bg-zinc-950 border-l border-zinc-800 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800 p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">
                  {isEditing ? 'Edit Win' : 'Record Your Win'}
                </h2>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-2 rounded-full hover:bg-zinc-800 transition-colors group"
              >
                <X className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              {/* Category Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Type of Win</label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all duration-200 text-center",
                          isSelected 
                            ? cn(cat.bg, cat.border) 
                            : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                        )}
                      >
                        <span className={cn(
                          "font-semibold block",
                          isSelected ? "text-white" : "text-zinc-400"
                        )}>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">What did you achieve?</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Led the Q4 product launch that drove $2M in revenue"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                />
              </div>

              {/* Tags */}
              <TagsInput value={tags} onChange={setTags} />

              {/* Date & Metric Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">When?</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Impact Metric</label>
                  <input
                    value={metric}
                    onChange={(e) => setMetric(e.target.value)}
                    placeholder="+25% revenue"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Tell the story</label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the context, your actions, and the results. Think: What problem did you solve? What was your unique contribution?"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isEditing ? 'Save Changes' : 'Record This Win'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
