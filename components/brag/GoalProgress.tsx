'use client';

import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface GoalProgressProps {
  current: number;
  target?: number;
}

const GoalProgress = ({ current, target = 50 }: GoalProgressProps) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors relative overflow-hidden group">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" 
      />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-[0.2em] mb-1">Yearly Goal</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{current}</span>
              <span className="text-zinc-500 text-xs font-medium">/ {target} wins</span>
            </div>
          </div>
          <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </div>
        
        <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] text-zinc-500">{percentage.toFixed(0)}% completed</span>
            {percentage >= 100 && (
                <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Goal Reached!
                </span>
            )}
        </div>
      </div>
    </div>
  );
};

export default GoalProgress;
