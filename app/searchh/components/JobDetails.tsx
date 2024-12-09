import React from 'react';
import Image from 'next/image';
import logos from '@/data/logos.json'; // Import your JSON file here
import { Interview } from '@/app/searchh/useCombinedViewData'; // Import Interview type

interface JobDetailsProps {
  selectedInterviewId: number | null;
  interview: Interview | null; // Use Interview type
}

const JobDetails: React.FC<JobDetailsProps> = ({ selectedInterviewId, interview }) => {
  if (!selectedInterviewId) {
    return <p className="text-center text-gray-500">Select a job to view details</p>;
  }

  if (!interview) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Fetch logo and intro from the JSON file
  const logoData = logos.find((logo) => logo.name === interview.company);

  return (
    <div className="w-full lg:w-4/6 bg-white border rounded-lg shadow-md p-6 overflow-y-auto max-h-full">
      <div className="flex items-center mb-4">
        <Image
          src={logoData?.logo || '/placeholder.png'} // Use logo from JSON or fallback to placeholder
          alt={interview.company || 'Company Logo'}
          width={60}
          height={60}
          className="mr-4 object-contain"
        />
        <div>
          <h2 className="text-2xl font-bold">{interview.company || 'Unknown Company'}</h2>
          <p className="text-sm text-gray-500">{logoData?.intro || 'No introduction available.'}</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">Job Overview</h3>
      <p className="text-gray-700 text-sm mb-4">
        {interview.overallExperience || 'No overview available.'}
      </p>
      <h3 className="text-lg font-semibold mb-2">What You Will Do</h3>
      <ul className="list-disc ml-5 text-sm text-gray-700 space-y-2">
        {Array.isArray(interview.questions) && interview.questions.length > 0 ? (
          interview.questions.map((task, index) => <li key={index}>{task.question}</li>)
        ) : (
          <li>No responsibilities listed.</li>
        )}
      </ul>
      <h3 className="text-lg font-semibold mt-4 mb-2">About {interview.company}</h3>
      <p className="text-sm text-gray-700">
        {logoData?.intro || 'No additional information available.'}
      </p>
    </div>
  );
};

export default JobDetails;
