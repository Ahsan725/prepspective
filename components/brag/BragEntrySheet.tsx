'use client';

import React from 'react';
import { SelectBragItem } from '@/db/schema';
import { Trophy, Star, Lightbulb, TrendingUp, Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

interface BragEntrySheetProps {
  item: SelectBragItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryIcons: Record<string, any> = {
  Impact: TrendingUp,
  Leadership: Trophy,
  Technical: Lightbulb,
  Other: Star,
};

const categoryColors: Record<string, { icon: string; bg: string; border: string; text: string }> = {
  Impact: { icon: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  Leadership: { icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  Technical: { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  Other: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
};

const BragEntrySheet = ({ item, open, onOpenChange }: BragEntrySheetProps) => {
  if (!item) return null;

  const Icon = categoryIcons[item.category] || Star;
  const colors = categoryColors[item.category] || categoryColors.Other;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[75vh] bg-zinc-950 border-t border-zinc-800 rounded-t-3xl p-0 overflow-hidden"
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-zinc-700 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 hover:bg-zinc-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-zinc-500" />
        </button>

        {/* Content */}
        <div className="px-6 pb-8 overflow-y-auto h-[calc(75vh-60px)]">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("p-3 rounded-2xl border", colors.bg, colors.border)}>
                <Icon className={cn("w-6 h-6", colors.icon)} />
              </div>
              <div>
                <span className={cn("text-xs font-semibold uppercase tracking-wider", colors.text)}>
                  {item.category}
                </span>
                <div className="flex items-center gap-2 text-zinc-500 text-sm mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>

            <SheetHeader>
              <SheetTitle className="text-2xl md:text-3xl font-bold text-white text-left leading-tight">
                {item.title}
              </SheetTitle>
            </SheetHeader>
          </div>

          {/* Metric */}
          {item.metric && (
            <div className="mb-8">
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em] mb-2">Impact Metric</p>
              <div className={cn(
                "inline-flex items-center px-4 py-2 rounded-xl border",
                colors.bg, colors.border
              )}>
                <span className={cn("text-xl font-bold", colors.text)}>{item.metric}</span>
              </div>
            </div>
          )}

          {/* Description */}
          {item.description && (
            <div className="mb-8">
              <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em] mb-3">Full Description</p>
              <p className="text-zinc-300 text-base leading-relaxed whitespace-pre-wrap">
                {item.description}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-6 border-t border-zinc-800">
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em] mb-2">Added</p>
            <p className="text-zinc-400 text-sm">
              {new Date(item.createdAt).toLocaleDateString(undefined, { 
                weekday: 'long',
                month: 'long', 
                day: 'numeric',
                year: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BragEntrySheet;
