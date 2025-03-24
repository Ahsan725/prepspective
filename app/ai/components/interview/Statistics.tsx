import React from 'react';
import { Card } from '@/components/ui/card';
import { Award, Star, Timer } from 'lucide-react';

interface StatisticsProps {
  practiceCount: number;
  averageScore: number;
}

const cardStyles = `
  relative 
  h-28 
  rounded-xl 
  overflow-hidden 
  flex 
  items-center 
  justify-center 
  text-slate-800 
  group 
  border 
  border-slate-200 
  bg-white 
  shadow-sm 
  hover:shadow-md 
  transition-all 
  duration-300
`;

const iconBox = `
  flex 
  flex-col 
  items-center 
  justify-center 
  gap-1 
  transition-all 
  duration-300 
  opacity-100 
  group-hover:opacity-0 
  absolute 
  inset-0
`;

const hoverBox = `
  flex 
  flex-col 
  items-center 
  justify-center 
  gap-0.5 
  transition-all 
  duration-300 
  opacity-0 
  group-hover:opacity-100 
  absolute 
  inset-0
`;

export const Statistics: React.FC<StatisticsProps> = ({
  practiceCount,
  averageScore,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Questions */}
        <Card className={cardStyles}>
          <div className={iconBox}>
            <Award className="h-6 w-6 text-slate-500" />
            <p className="text-4xl font-bold tracking-tight">{practiceCount}</p>
          </div>
          <div className={hoverBox}>
            <p className="text-sm uppercase text-slate-700 font-semibold tracking-wide">Questions</p>
          </div>
        </Card>

        {/* Average Score */}
        <Card className={cardStyles}>
          <div className={iconBox}>
            <Star className="h-6 w-6 text-slate-500" />
            <p className="text-4xl font-bold tracking-tight">{averageScore.toFixed(1)}/5</p>
          </div>
          <div className={hoverBox}>
            <p className="text-sm uppercase text-slate-700 font-semibold tracking-wide">Average Score</p>
          </div>
        </Card>

        {/* Time */}
        <Card className={cardStyles}>
          <div className={iconBox}>
            <Timer className="h-6 w-6 text-slate-500" />
            <p className="text-4xl font-bold tracking-tight">{practiceCount}m</p>
          </div>
          <div className={hoverBox}>
            <p className="text-sm uppercase text-slate-700 font-semibold tracking-wide">Total Time</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
