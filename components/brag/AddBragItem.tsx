'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { BragItemFormSheet } from './BragItemFormSheet';

export const AddBragItem = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>New Win</span>
      </motion.button>

      {/* Form Sheet (Create Mode) */}
      <BragItemFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
};
