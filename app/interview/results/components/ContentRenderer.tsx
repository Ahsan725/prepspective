import React from 'react';
import { Interview } from '../types';
import Loader from '@/components/ui/loader';

type ContentRendererProps = {
  activeTab: string;
  interview: Interview | null;
  error: string | null;
};

const ContentRenderer: React.FC<ContentRendererProps> = ({ activeTab, interview, error }) => {
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!interview) {
    return <Loader />;
  }

  switch (activeTab) {
    case 'company':
      return (
        <div>
          <h3 className="text-2xl font-bold">{interview.company}</h3>
          <p>
            <strong>Interview Date:</strong> {interview.interviewDate}
          </p>
        </div>
      );
    // Add other cases here
    default:
      return null;
  }
};

export default ContentRenderer;
