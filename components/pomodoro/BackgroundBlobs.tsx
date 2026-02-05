'use client';

import React from 'react';

const BackgroundBlobs = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 opacity-100" />
      
      {/* Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen input-blob-1" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-indigo-400/30 dark:bg-indigo-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen input-blob-2" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50vh] h-[50vh] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen input-blob-3" />
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default BackgroundBlobs;
