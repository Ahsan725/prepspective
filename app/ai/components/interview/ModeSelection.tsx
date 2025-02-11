import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Code, Users } from 'lucide-react';
import { InterviewMode } from '../../types';

interface ModeSelectionProps {
  onModeSelect: (mode: Exclude<InterviewMode, null>) => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect }) => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Select Interview Mode</CardTitle>
          <CardDescription>Choose the type of interview questions you want to practice</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Button
            onClick={() => onModeSelect('software')}
            className="flex items-center gap-2 px-6 py-4"
            size="lg"
          >
            <Code className="h-5 w-5" />
            Software Engineering
          </Button>
          <Button
            onClick={() => onModeSelect('behavioral')}
            className="flex items-center gap-2 px-6 py-4"
            size="lg"
          >
            <Users className="h-5 w-5" />
            Behavioral
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};