import React from 'react';
import InterviewForm from '../../components/ui/InterviewForm';
import InterviewTable from './InterviewTable';

const Page = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold">Interview Tracker</h1>

      {/* Form Section */}
      <section>
        <h2 className="text-xl font-semibold">Add a New Interview</h2>
        <InterviewForm />
      </section>

      {/* Table Section */}
      <section>
        <h2 className="text-xl font-semibold">Previous Interviews</h2>
        <InterviewTable />
      </section>
    </div>
  );
};

export default Page;
