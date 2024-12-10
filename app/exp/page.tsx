'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { BasicInfo } from './components/BasicInfo';
import { OverallExperience } from './components/OverallExperience';
import { InterviewQuestions } from './components/InterviewQuestions';
import { InterviewRatings } from './components/InterviewRatings';
import { InterviewRounds } from './components/InterviewRounds';
import { FormData, Question, Rating, Round, InterviewLevel } from './types';
import { validateRequiredFields } from './utils/validation';

export default function InterviewForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState(new Set<keyof FormData>());
  const [formData, setFormData] = useState<FormData>({
    company: '',
    interviewDate: '',
    level: 'New Grad',
    jobOffer: null,
    overallExperience: '',
    questions: [],
    ratings: [],
    rounds: [],
  });

  const handleChange = (
    field: keyof FormData,
    value: string | boolean | null | Question[] | Rating[] | Round[] | InterviewLevel
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateSelection = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const adjustedDate = addDays(selectedDate, 1);
      const formattedDate = format(adjustedDate, 'yyyy-MM-dd');

      setFormData((prev) => ({
        ...prev,
        interviewDate: formattedDate,
      }));

      setInvalidFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete('interviewDate');
        return newSet;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newInvalidFields = validateRequiredFields(formData);

    if (newInvalidFields.size > 0) {
      setInvalidFields(newInvalidFields);
      toast({
        title: 'Error',
        description: 'Please fill out all required fields.',
      });
      return;
    }

    setInvalidFields(new Set());
    setLoading(true);

    try {
      const res = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    
      if (res.ok) {
        toast({
          title: 'Success!',
          description: 'Your interview experience has been submitted successfully!',
          variant: 'default',
        });
        setFormData({
          company: '',
          interviewDate: '',
          level: 'New Grad',
          jobOffer: null,
          overallExperience: '',
          questions: [],
          ratings: [],
          rounds: [],
        });
      } else if (res.status >= 400 && res.status < 500) {
        toast({
          title: 'Submission Failed',
          description: 'There was an issue with the data you provided. Please review and try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Server Error',
          description: 'The server encountered an error. Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Failed to fetch') {
          toast({
            title: 'Network Error',
            description: 'Unable to connect to the server. Please check your internet connection and try again.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Unexpected Error',
            description: error.message || 'An unexpected error occurred. Please refresh the page and try again.',
            variant: 'destructive',
          });
        }
      } else if (typeof error === 'string') {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
      } else {
        console.error('Unknown error:', error);
        toast({
          title: 'Unexpected Error',
          description: 'An unexpected error occurred. Please refresh the page and try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-white px-4 sm:px-6 lg:px-24 xl:px-32">
      <div className="w-full space-y-6">
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center mb-4">
            <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
              INTERVIEW EXPERIENCE
            </h2>
          </div>

          <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
            Share Your Interview Journey
          </h2>

          <h3 className=" mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Help others prepare by sharing your interview experience. Your insights could be the key to someone&apos;s success or <em>yours—because what goes around comes around</em>
          </h3>

          <SubmitButton loading={loading} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BasicInfo
            formData={formData}
            invalidFields={invalidFields}
            handleChange={handleChange}
            handleDateSelection={handleDateSelection}
            setInvalidFields={setInvalidFields}
          />
          <OverallExperience formData={formData} handleChange={handleChange} />
          <InterviewQuestions formData={formData} handleChange={handleChange} />
          <InterviewRatings formData={formData} handleChange={handleChange} />
          <InterviewRounds formData={formData} handleChange={handleChange} />
        </div>

        <SubmitButton loading={loading} />
      </div>
    </form>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <div className="flex justify-center items-center">
      <Button 
        type="submit" 
        size="sm"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 w-full sm:w-auto mb-8" 
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Experience'
        )}
      </Button>
    </div>
  );
}