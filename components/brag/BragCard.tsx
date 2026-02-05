'use client';

import React, { useState } from 'react';
import { SelectBragItem } from '@/db/schema';
import { Trophy, Star, Lightbulb, TrendingUp, Calendar, MoreVertical, Pencil, Trash2, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { deleteBragItem, updateBragItem } from '@/lib/actions/brag-actions';
import { useRouter } from 'next/navigation';
import BragEntrySheet from './BragEntrySheet';

interface BragCardProps {
  item: SelectBragItem;
  className?: string;
}

const categoryIcons: Record<string, any> = {
  Impact: TrendingUp,
  Leadership: Trophy,
  Technical: Lightbulb,
  Other: Star,
};

const categoryColors: Record<string, { icon: string; bg: string; border: string }> = {
  Impact: { icon: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
  Leadership: { icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  Technical: { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  Other: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
};

const CARD_HEIGHT = 'h-[200px]';

const BragCard = ({ item, className }: BragCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [editData, setEditData] = useState({
    title: item.title,
    description: item.description || '',
    metric: item.metric || '',
    category: item.category,
    date: item.date,
  });

  const Icon = categoryIcons[item.category] || Star;
  const colors = categoryColors[item.category] || categoryColors.Other;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteBragItem(item.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateBragItem(item.id, editData);
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open sheet if clicking on menu or edit/delete buttons
    if ((e.target as HTMLElement).closest('.card-menu')) return;
    if (isEditing || isDeleting) return;
    setShowSheet(true);
  };

  // Edit Modal
  if (isEditing) {
    return (
      <div className={cn("w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-5 overflow-hidden", CARD_HEIGHT, className)}>
        <form onSubmit={handleUpdate} className="space-y-3 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-zinc-400">Edit</span>
            <button type="button" onClick={() => setIsEditing(false)} className="p-1 hover:bg-zinc-800 rounded">
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
          <input
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none"
            placeholder="Title"
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={editData.metric}
              onChange={(e) => setEditData({ ...editData, metric: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none"
              placeholder="Metric"
            />
            <select
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:border-indigo-500 outline-none"
            >
              <option value="Impact">Impact</option>
              <option value="Leadership">Leadership</option>
              <option value="Technical">Technical</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-auto w-full py-2 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
          </button>
        </form>
      </div>
    );
  }

  // Delete Confirmation
  if (isDeleting) {
    return (
      <div className={cn("w-full bg-zinc-900 border border-red-500/30 rounded-2xl p-5 overflow-hidden flex flex-col justify-center", CARD_HEIGHT, className)}>
        <div className="text-center space-y-3">
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
            <Trash2 className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-white font-medium text-sm">Delete this?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setIsDeleting(false)}
              className="flex-1 py-2 bg-zinc-800 text-white rounded-lg font-medium text-sm hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={handleCardClick}
        className={cn(
          "w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 overflow-hidden transition-colors hover:border-zinc-700 group relative cursor-pointer",
          CARD_HEIGHT,
          className
        )}
      >
        {/* Menu Button */}
        <div className="card-menu absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
              className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <MoreVertical className="w-4 h-4 text-zinc-500" />
            </button>
            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setShowMenu(false); }} />
                <div className="absolute right-0 top-8 z-20 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden min-w-[100px]">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsEditing(true); setShowMenu(false); }}
                    className="w-full px-3 py-2 text-left text-sm text-white hover:bg-zinc-700 flex items-center gap-2"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsDeleting(true); setShowMenu(false); }}
                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-zinc-700 flex items-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div className={cn("p-2 rounded-xl border", colors.bg, colors.border)}>
              <Icon className={cn("w-4 h-4", colors.icon)} />
            </div>
            {item.metric && (
              <span className={cn("text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full border truncate max-w-[100px]", colors.bg, colors.border, colors.icon)}>
                {item.metric}
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug pr-4">
            {item.title}
          </h3>

          <p className="text-zinc-500 text-sm flex-grow line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-center gap-2 text-zinc-600 mt-auto pt-2">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{new Date(item.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      <BragEntrySheet item={item} open={showSheet} onOpenChange={setShowSheet} />
    </>
  );
};

export default BragCard;
