'use client';

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
      <div className="text-center relative z-10">
        <div className="flex items-center justify-center mx-auto mb-4 z-20">
          <div className={`${styles['code-loader']} flex items-center gap-1`}>
            <span className="text-[#2619bc] font-bold">{'{'}</span>
            <span className="text-[#2619bc] font-extrabold no-vibrate -mx-1">P</span>
            <span className="text-[#2619bc] font-bold">{'}'}</span>
          </div>
        </div>
        
        <h1 className="text-5xl font-extrabold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-indigo-400 to-indigo-700">
            Coming Soon!
          </span>
        </h1>
        <p className="text-2xl font-semibold mb-8 text-indigo-700">
          We&apos;re adding the final touches of perfection to this feature.
        </p>
        <p className="text-xl mb-12 text-gray-600">
          We will notify you as soon as it&apos;s ready. Don&apos;t worry, we won&apos;t spam you. <br></br>
          We&apos;re too busy trying to center the div to learn email marketing anyway.
        </p>
      </div>
    </div>
  );
}
