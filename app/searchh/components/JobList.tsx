import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import logos from '@/data/logos.json'; // Import JSON file
import { Interview } from '@/app/searchh/useCombinedViewData'; // Import Interview type
import Loader from '@/components/ui/loader';

interface JobListProps {
  results: Interview[];
  filteredResults: Interview[];
  loading: boolean;
  selectedInterviewId: number | null;
  handleMobileRedirect: (id: number) => void;
}

const JobList: React.FC<JobListProps> = ({
  results,
  filteredResults,
  loading,
  selectedInterviewId,
  handleMobileRedirect,
}) => {
  return (
    <div className="w-full lg:w-4/12 bg-white rounded-lg p-1 overflow-y-auto">
      {/* <h2 className="text-xl font-semibold mb-4">Related Interviews</h2> */}
      <ul className="space-y-4">
        {loading ? (
          <div className="flex justify-center items-start h-screen">
          <Loader />
        </div>
        
        ) : filteredResults && filteredResults.length > 0 ? (
          filteredResults.map((result) => {
            const logoData = logos.find((logo) => logo.name === result.company);

            return (
              <li
                key={result.id}
                className={`p-4 bg-white border rounded-lg shadow-md hover:shadow-lg cursor-pointer ${
                  selectedInterviewId === result.id ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => handleMobileRedirect(result.id)}
              >
                {/* Company Logo and Name */}
                <div className="flex items-center mb-2">
                  <Image
                    src={logoData?.logo || '/placeholder.png'}
                    alt={result.company || 'Company Logo'}
                    width={40}
                    height={40}
                    className="mr-4 object-contain"
                  />
                  <h3 className="text-lg font-bold">{result.company || 'Unknown Company'}</h3>
                </div>

                {/* Date */}
                <p className="text-sm text-gray-500 mb-2">
                  {result.interviewDate
                    ? new Date(result.interviewDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Unknown Date'}
                </p>

                {/* Display All Badges */}
                <div className="flex flex-wrap gap-2">
                  {result.level && (
                    <Badge className="bg-indigo-500 text-white text-[9px]">
                      {result.level}
                    </Badge>
                  )}
                  {result.jobOffer === true && (
                    <Badge className="bg-green-100 text-green-800 text-[9px]">Offer</Badge>
                  )}
                  {result.jobOffer === false && (
                    <Badge className="bg-red-100 text-red-800 text-[9px]">No Offer</Badge>
                  )}
                  {result.questions.some((q) => q.type.toLowerCase() === 'behavioral') && (
                    <Badge className="bg-yellow-100 text-yellow-800 text-[9px]">
                      Behavioral
                    </Badge>
                  )}
                  {result.questions.some((q) => q.type.toLowerCase() === 'technical') && (
                    <Badge className="bg-purple-100 text-purple-800 text-[9px]">
                      Technical
                    </Badge>
                  )}
                  {result.rounds.some((round) =>
                    round.roundType.toLowerCase().includes('system design')
                  ) && (
                    <Badge className="bg-indigo-100 text-indigo-800 text-[9px]">
                      System Design
                    </Badge>
                  )}
                  {result.questions.some((q) => q.leetcodeLink) && (
                    <Badge className="bg-teal-100 text-teal-800 text-[9px]">LeetCode</Badge>
                  )}
                  {result.rounds.some((round) =>
                    round.roundType.toLowerCase().includes('pre screen')
                  ) && (
                    <Badge className="bg-cyan-100 text-cyan-800 text-[9px]">Pre Screen</Badge>
                  )}
                  {result.rounds.some((round) =>
                    round.roundType.toLowerCase().includes('oa')
                  ) && (
                    <Badge className="bg-pink-100 text-pink-800 text-[9px]">OA</Badge>
                  )}
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </ul>
    </div>
  );
};

export default JobList;
