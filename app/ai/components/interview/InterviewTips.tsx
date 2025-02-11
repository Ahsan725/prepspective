import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface InterviewTipsProps {
  showTips: boolean;
  onToggleTips: () => void;
}

export const InterviewTips: React.FC<InterviewTipsProps> = ({
  showTips,
  onToggleTips,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-4">
      <Button
        variant="outline"
        onClick={onToggleTips}
        className="flex items-center gap-2"
      >
        <BookOpen className="h-4 w-4" />
        {showTips ? 'Hide Tips' : 'Show Interview Tips'}
      </Button>
      
      {showTips && (
        <Card className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Interview Tips</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0">•</div>
                <p>Structure your answers using the STAR method (Situation, Task, Action, Result)</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0">•</div>
                <p>Speak clearly and at a moderate pace</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0">•</div>
                <p>Use specific examples to support your points</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0">•</div>
                <p>Keep your answers focused and relevant to the question</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};