'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from '../types';

type OverallExperienceProps = {
  formData: FormData;
  handleChange: (field: keyof FormData, value: string) => void;
};

export function OverallExperience({ formData, handleChange }: OverallExperienceProps) {
  return (
    <Card className="bg-white shadow-xl border border-gray-100 rounded-xl md:col-span-2 flex flex-col">
      <CardHeader className="border-b border-gray-100 bg-white p-6">
        <CardTitle className="text-xl font-semibold text-gray-900">Overall Experience</CardTitle>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col">
        <Textarea
          id="overallExperience"
          placeholder="Describe your overall interview experience"
          value={formData.overallExperience}
          onChange={(e) => handleChange('overallExperience', e.target.value)}
          className="flex-1 min-h-[250px] bg-white border-gray-200 rounded-lg resize-none"
        />
      </CardContent>
    </Card>
  );
}