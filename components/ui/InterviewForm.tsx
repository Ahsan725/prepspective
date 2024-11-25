'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Replace with ShadCN's button path
import { Input } from '@/components/ui/input'; // Replace with ShadCN's input path
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

type Question = {
  type: 'behavioral' | 'technical';
  question: string;
  leetcodeLink?: string;
};

type Rating = {
  category: string;
  score: number;
};

type Round = {
  roundType: string;
  roundDate: string;
  experience: string;
};

type FormData = {
  company: string;
  interviewDate: string;
  jobOffer: boolean;
  overallExperience: string;
  questions: Question[];
  ratings: Rating[];
  rounds: Round[];
};

const InterviewForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    interviewDate: '',
    jobOffer: false,
    overallExperience: '',
    questions: [],
    ratings: [],
    rounds: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>({ type: 'behavioral', question: '', leetcodeLink: '' });
  const [currentRating, setCurrentRating] = useState<Rating>({ category: '', score: 0 });
  const [currentRound, setCurrentRound] = useState<Round>({ roundType: '', roundDate: '', experience: '' });

  const handleChange = (field: keyof FormData, value: string | boolean | Question[] | Rating[] | Round[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.interviewDate) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const res = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Interview entry submitted successfully!');
        setFormData({
          company: '',
          interviewDate: '',
          jobOffer: false,
          overallExperience: '',
          questions: [],
          ratings: [],
          rounds: [],
        });
      } else {
        alert('Failed to save data.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred.');
    }
  };

  const addQuestion = () => {
    handleChange('questions', [...formData.questions, currentQuestion]);
    setCurrentQuestion({ type: 'behavioral', question: '', leetcodeLink: '' });
  };

  const addRating = () => {
    handleChange('ratings', [...formData.ratings, currentRating]);
    setCurrentRating({ category: '', score: 0 });
  };

  const addRound = () => {
    handleChange('rounds', [...formData.rounds, currentRound]);
    setCurrentRound({ roundType: '', roundDate: '', experience: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Interview Fields */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          Company
        </label>
        <Input
          id="company"
          placeholder="Enter company name"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="interviewDate" className="block text-sm font-medium text-gray-700">
          Interview Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-full p-2 text-left bg-white border border-gray-300 rounded-md">
              {formData.interviewDate
                ? format(new Date(formData.interviewDate), 'MMMM dd, yyyy')
                : 'Pick a date'}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={formData.interviewDate ? new Date(formData.interviewDate) : undefined}
              onSelect={(date: Date | undefined) =>
                handleChange('interviewDate', date ? format(date, 'yyyy-MM-dd') : '')
              }
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Job Offer</label>
        <Select
          onValueChange={(value) => handleChange('jobOffer', value === 'true')}
          value={formData.jobOffer.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="overallExperience" className="block text-sm font-medium text-gray-700">
          Overall Experience
        </label>
        <Textarea
          id="overallExperience"
          placeholder="Describe your experience"
          value={formData.overallExperience}
          onChange={(e) => handleChange('overallExperience', e.target.value)}
        />
      </div>

      {/* Questions */}
      <div>
        <h3 className="text-lg font-medium">Questions</h3>
        <div className="space-y-2">
          <Select
            onValueChange={(value) => setCurrentQuestion((prev) => ({ ...prev, type: value as Question['type'] }))}
            value={currentQuestion.type}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="behavioral">Behavioral</SelectItem>
              <SelectItem value="technical">Technical</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter question"
            value={currentQuestion.question}
            onChange={(e) => setCurrentQuestion((prev) => ({ ...prev, question: e.target.value }))}
          />
          {currentQuestion.type === 'technical' && (
            <Input
              placeholder="LeetCode link (optional)"
              value={currentQuestion.leetcodeLink}
              onChange={(e) => setCurrentQuestion((prev) => ({ ...prev, leetcodeLink: e.target.value }))}
            />
          )}
          <Button onClick={addQuestion} type="button">
            Add Question
          </Button>
        </div>
        <ul className="list-disc pl-6">
          {formData.questions.map((q, index) => (
            <li key={index}>
              {q.type}: {q.question} {q.leetcodeLink && `(LeetCode: ${q.leetcodeLink})`}
            </li>
          ))}
        </ul>
      </div>

      {/* Ratings */}
      <div>
        <h3 className="text-lg font-medium">Ratings</h3>
        <div className="space-y-2">
          <Input
            placeholder="Category (e.g., Friendliness)"
            value={currentRating.category}
            onChange={(e) => setCurrentRating((prev) => ({ ...prev, category: e.target.value }))}
          />
          <Input
            placeholder="Score (1-5)"
            type="number"
            min={1}
            max={5}
            value={currentRating.score}
            onChange={(e) => setCurrentRating((prev) => ({ ...prev, score: +e.target.value }))}
          />
          <Button onClick={addRating} type="button">
            Add Rating
          </Button>
        </div>
        <ul className="list-disc pl-6">
          {formData.ratings.map((r, index) => (
            <li key={index}>
              {r.category}: {r.score}/5
            </li>
          ))}
        </ul>
      </div>

      {/* Rounds */}
      <div>
        <h3 className="text-lg font-medium">Rounds</h3>
        <div className="space-y-2">
          <Input
            placeholder="Round Type (e.g., Technical, HR)"
            value={currentRound.roundType}
            onChange={(e) => setCurrentRound((prev) => ({ ...prev, roundType: e.target.value }))}
          />
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full p-2 text-left bg-white border border-gray-300 rounded-md">
                {currentRound.roundDate
                  ? format(new Date(currentRound.roundDate), 'MMMM dd, yyyy')
                  : 'Pick a date'}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={currentRound.roundDate ? new Date(currentRound.roundDate) : undefined}
                onSelect={(date: Date | undefined) =>
                  setCurrentRound((prev) => ({
                    ...prev,
                    roundDate: date ? format(date, 'yyyy-MM-dd') : '',
                  }))
                }
              />
            </PopoverContent>
          </Popover>
          <Textarea
            placeholder="Experience in this round"
            value={currentRound.experience}
            onChange={(e) => setCurrentRound((prev) => ({ ...prev, experience: e.target.value }))}
          />
          <Button onClick={addRound} type="button">
            Add Round
          </Button>
        </div>
        <ul className="list-disc pl-6">
          {formData.rounds.map((r, index) => (
            <li key={index}>
              {r.roundType} on {r.roundDate}: {r.experience}
            </li>
          ))}
        </ul>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
};

export default InterviewForm;
