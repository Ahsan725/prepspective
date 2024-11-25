'use client';

import React from 'react';
import InterviewForm from '@/components/ui/InterviewForm'; // Adjust import path as needed

const NewInterviewPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a New Interview</h1>
      <InterviewForm />
    </div>
  );
};

export default NewInterviewPage;
