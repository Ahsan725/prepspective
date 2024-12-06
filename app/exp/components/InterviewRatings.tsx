'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { FormData, Rating } from '../types';

type InterviewRatingsProps = {
  formData: FormData;
  handleChange: (field: keyof FormData, value: Rating[]) => void;
};

export function InterviewRatings({ formData, handleChange }: InterviewRatingsProps) {
  const [currentRating, setCurrentRating] = useState<Rating>({ category: '', score: 0 });

  const addOrUpdateRating = () => {
    if (currentRating.category && currentRating.score >= 1 && currentRating.score <= 5) {
      const existingIndex = formData.ratings.findIndex(
        (r) => r.category === currentRating.category
      );
  
      let updatedRatings;
      if (existingIndex !== -1) {
        // Update existing rating
        updatedRatings = [...formData.ratings];
        updatedRatings[existingIndex] = currentRating;
      } else {
        // Add new rating
        updatedRatings = [...formData.ratings, currentRating];
      }
  
      handleChange('ratings', updatedRatings);
      setCurrentRating({ category: '', score: 0 }); // Reset current rating
    }
  };
  

  return (
    <Card className="bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 shadow-xl border border-gray-100 rounded-xl">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 p-6">
        <CardTitle className="text-xl font-semibold text-gray-900">Interview Ratings</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="ratingCategory" className="text-sm font-medium text-gray-700">
              Category
            </Label>
            <Select
              value={currentRating.category}
              onValueChange={(value) => setCurrentRating((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Difficulty">Difficulty</SelectItem>
                <SelectItem value="Friendliness">Friendliness</SelectItem>
                <SelectItem value="Responsiveness">Responsiveness</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="ratingScore" className="text-sm font-medium text-gray-700">
                Score (1-5)
              </Label>
              <Input
                id="ratingScore"
                type="number"
                min="1"
                max="5"
                value={currentRating.score === 0 ? '' : currentRating.score}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[1-5]?$/.test(value)) {
                    setCurrentRating((prev) => ({
                      ...prev,
                      score: value === '' ? 0 : +value,
                    }));
                  }
                }}
                className="bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 border-gray-200 rounded-lg"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={addOrUpdateRating}
                type="button"
                size="icon"
                className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Current Ratings:</h4>
          <ul className="space-y-2">
            {formData.ratings.map((r, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium text-gray-900">{r.category}:</span>{' '}
                <span className="text-gray-700">{r.score}/5</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}