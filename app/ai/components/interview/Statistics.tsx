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
  text-white 
  group 
  border 
  border-white/10 
  shadow-sm 
  hover:shadow-lg 
  transition-all 
  duration-300
`;

const iconBox = `
  flex 
  flex-col 
  items-center 
  justify-center 
  gap-2 
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
  gap-1 
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
    <div className="w-full max-w-6xl mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Questions */}
        <Card className={`${cardStyles} bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600`}>
          <div className={iconBox}>
            <Award className="h-8 w-8 opacity-90" />
            <p className="text-4xl font-bold">{practiceCount}</p>
          </div>
          <div className={hoverBox}>
            <p className="text-sm uppercase tracking-wider text-white font-bold">Questions</p>
          </div>
        </Card>

        {/* Average Score */}
        <Card className={`${cardStyles} bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600`}>
          <div className={iconBox}>
            <Star className="h-8 w-8 opacity-90" />
            <p className="text-4xl font-bold">{averageScore.toFixed(1)}/5</p>
          </div>
          <div className={hoverBox}>
            <p className="text-sm uppercase tracking-wider text-white font-bold">Average Score</p>
          </div>
        </Card>

        {/* Time */}
        <Card className={`${cardStyles} bg-gradient-to-br from-rose-500 via-orange-500 to-yellow-500`}>
          <div className={iconBox}>
            <Timer className="h-8 w-8 opacity-90" />
            <p className="text-4xl font-bold">{practiceCount}m</p>
          </div>
          <div className={hoverBox}>
            <p className="text-sm uppercase tracking-wider text-white font-bold">Total Time</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
