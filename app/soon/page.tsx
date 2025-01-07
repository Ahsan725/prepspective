'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './soon.module.css'; // Import the CSS module

export default function FeatureComingSoon() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <div className="relative bg-white flex flex-col items-center justify-start p-4 pt-40 text-indigo-800 overflow-hidden">
      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <div className="flex items-center justify-center mx-auto mb-4 z-20">
          <div className={`${styles['code-loader']} flex items-center gap-1`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-indigo-800 to-indigo-600 font-bold">{'{'}</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-indigo-800 to-indigo-600 font-extrabold no-vibrate -mx-1">P</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-t from-indigo-800 to-indigo-600 font-bold">{'}'}</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-indigo-400 to-indigo-700">
            Coming Soon!
          </span>
        </h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />
        <p className="text-2xl font-semibold mb-8 text-indigo-700">
          We&apos;re adding the final touches of perfection to this feature.
        </p>
        <p className="text-lg mb-12 mx-80 text-indigo-700">
          We will notify you as soon as it&apos;s ready. Don&apos;t worry, we won&apos;t spam you. We&apos;re too busy centering the div to learn email marketing anyway.
        </p>
      </motion.div>
    </div>
  );
}
