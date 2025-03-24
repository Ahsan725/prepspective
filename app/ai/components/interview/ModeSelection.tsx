'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InterviewMode } from '../../types';

interface ModeSelectionProps {
  onModeSelect: (mode: Exclude<InterviewMode, null>) => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto mb-10"
    >
      <Card className="rounded-xl border-none shadow-none">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Choose Your Mode
          </CardTitle>
          <CardDescription className="text-slate-600 text-base mt-1">
            What type of interview would you like to practice?
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 pb-6">
          {/* Technical Mode */}
          <button
            onClick={() => onModeSelect('software')}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-slate-300 bg-white hover:bg-indigo-50 transition-colors duration-100 hover:shadow-xl text-slate-800 hover:text-indigo-700"
          >
            <Code className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-semibold">Technical</span>
          </button>

          {/* Behavioral Mode */}
          <button
            onClick={() => onModeSelect('behavioral')}
            className="flex flex-col items-center justify-center gap-3 p-6 rounded-lg border border-slate-300 bg-white hover:bg-indigo-50 transition-colors duration-100 hover:shadow-xl text-slate-800 hover:text-indigo-700"
          >
            <Users className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-semibold">Behavioral</span>
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
