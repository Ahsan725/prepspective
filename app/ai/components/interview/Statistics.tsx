import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Star, Timer } from 'lucide-react';

interface StatisticsProps {
  practiceCount: number;
  averageScore: number;
}

export const Statistics: React.FC<StatisticsProps> = ({
  practiceCount,
  averageScore,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-lg font-semibold">Questions this Sessions</p>
              <p className="text-3xl font-bold">{practiceCount}</p>
            </div>
            <Award className="h-12 w-12 opacity-80" />
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-lg font-semibold">Session Average Score</p>
              <p className="text-3xl font-bold">{averageScore.toFixed(1)}/5</p>
            </div>
            <Star className="h-12 w-12 opacity-80" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-lg font-semibold">Session Time</p>
              <p className="text-3xl font-bold">{practiceCount}m</p>
            </div>
            <Timer className="h-12 w-12 opacity-80" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};