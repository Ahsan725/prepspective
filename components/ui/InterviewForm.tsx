'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parse } from 'date-fns';

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

  const [currentTab, setCurrentTab] = useState<'basic' | 'questions' | 'ratings' | 'rounds'>(
    'basic'
  );

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    type: 'behavioral',
    question: '',
    leetcodeLink: '',
  });
  const [currentRating, setCurrentRating] = useState<Rating>({ category: '', score: 0 });
  const [currentRound, setCurrentRound] = useState<Round>({
    roundType: '',
    roundDate: '',
    experience: '',
  });

  const handleChange = (
    field: keyof FormData,
    value: string | boolean | Question[] | Rating[] | Round[]
  ) => {
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
        setCurrentTab('basic'); // Reset to the first tab
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
    setFormData((prev) => {
      const existingRatingIndex = prev.ratings.findIndex(
        (r) => r.category === currentRating.category
      );

      if (existingRatingIndex !== -1) {
        // Update the existing rating's score
        const updatedRatings = [...prev.ratings];
        updatedRatings[existingRatingIndex] = {
          ...updatedRatings[existingRatingIndex],
          score: currentRating.score,
        };
        return { ...prev, ratings: updatedRatings };
      }

      // Add a new rating if it doesn't exist
      return { ...prev, ratings: [...prev.ratings, currentRating] };
    });

    // Reset the currentRating
    setCurrentRating({ category: '', score: 0 });
  };

  const addRound = () => {
    handleChange('rounds', [...formData.rounds, currentRound]);
    setCurrentRound({ roundType: '', roundDate: '', experience: '' });
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'basic':
        return (
          <div>
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
                      ? format(
                          parse(formData.interviewDate, 'yyyy-MM-dd', new Date()),
                          'MMMM dd, yyyy'
                        )
                      : 'Pick a date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={
                      formData.interviewDate
                        ? parse(formData.interviewDate, 'yyyy-MM-dd', new Date())
                        : undefined
                    }
                    onSelect={(date) => {
                      if (date) {
                        handleChange('interviewDate', format(date, 'yyyy-MM-dd'));
                      }
                    }}
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
          </div>
        );
      case 'questions':
        return (
          <div>
            <h3 className="text-lg font-medium">Questions</h3>
            <div className="space-y-2">
              <Select
                onValueChange={(value) =>
                  setCurrentQuestion((prev) => ({ ...prev, type: value as Question['type'] }))
                }
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
                onChange={(e) =>
                  setCurrentQuestion((prev) => ({ ...prev, question: e.target.value }))
                }
              />
              {currentQuestion.type === 'technical' && (
                <Input
                  placeholder="LeetCode link (optional)"
                  value={currentQuestion.leetcodeLink}
                  onChange={(e) =>
                    setCurrentQuestion((prev) => ({ ...prev, leetcodeLink: e.target.value }))
                  }
                />
              )}
              <Button onClick={addQuestion} type="button">
                Add Question
              </Button>
            </div>
            <ul className="list-disc pl-6">
              {formData.questions.map((q, index) => (
                <li key={index}>
                  {q.type}: {q.question}{' '}
                  {q.leetcodeLink && (
                    <a href={q.leetcodeLink} target="_blank" rel="noopener noreferrer">
                      (LeetCode Link)
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'ratings':
        return (
          <div>
            <h3 className="text-lg font-medium">Ratings</h3>
            <div className="space-y-2">
              {/* Category Dropdown */}
              <Select
                onValueChange={(value) =>
                  setCurrentRating((prev) => ({ ...prev, category: value }))
                }
                value={currentRating.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Difficulty">Difficulty</SelectItem>
                  <SelectItem value="Friendliness">Friendliness</SelectItem>
                  <SelectItem value="Responsiveness">Responsiveness</SelectItem>
                </SelectContent>
              </Select>

              {/* Score Input */}
              <Input
                placeholder="Score (1-5)"
                type="number"
                value={currentRating.score === 0 ? '' : currentRating.score} // Clear `0` on empty
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[1-5]?$/.test(value)) {
                    setCurrentRating((prev) => ({ ...prev, score: value === '' ? 0 : +value }));
                  }
                }}
              />

              {/* Add Rating Button */}
              <Button
                onClick={() => {
                  if (
                    currentRating.category &&
                    currentRating.score >= 1 &&
                    currentRating.score <= 5
                  ) {
                    addRating();
                  } else {
                    alert('Please select a valid category and score (1-5)');
                  }
                }}
                type="button"
              >
                Add/Update Rating
              </Button>
            </div>

            {/* Ratings List */}
            <ul className="list-disc pl-6 mt-4">
              {formData.ratings.map((r, index) => (
                <li key={index}>
                  {r.category}: {r.score}/5
                </li>
              ))}
            </ul>
          </div>
        );
      case 'rounds':
        return (
          <div>
            <h3 className="text-lg font-medium">Rounds</h3>
            <div className="space-y-2">
              <Input
                placeholder="Round Type (e.g., Technical, HR)"
                value={currentRound.roundType}
                onChange={(e) =>
                  setCurrentRound((prev) => ({ ...prev, roundType: e.target.value }))
                }
              />
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full p-2 text-left bg-white border border-gray-300 rounded-md">
                    {currentRound.roundDate
                      ? format(
                          parse(currentRound.roundDate, 'yyyy-MM-dd', new Date()),
                          'MMMM dd, yyyy'
                        )
                      : 'Pick a date'}
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={
                      currentRound.roundDate
                        ? parse(currentRound.roundDate, 'yyyy-MM-dd', new Date())
                        : undefined
                    }
                    onSelect={(date) => {
                      if (date) {
                        setCurrentRound((prev) => ({
                          ...prev,
                          roundDate: format(date, 'yyyy-MM-dd'),
                        }));
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              <Textarea
                placeholder="Experience in this round"
                value={currentRound.experience}
                onChange={(e) =>
                  setCurrentRound((prev) => ({ ...prev, experience: e.target.value }))
                }
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
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    const tabs = ['basic', 'questions', 'ratings', 'rounds'];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1] as typeof currentTab);
    }
  };

  const handlePrevious = () => {
    const tabs = ['basic', 'questions', 'ratings', 'rounds'];
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1] as typeof currentTab);
    }
  };

  return (
    <div>
      <div className="flex space-x-4 border-b">
        <button
          className={`py-2 px-4 ${
            currentTab === 'basic' ? 'border-b-2 border-indigo-500 font-semibold' : ''
          }`}
          onClick={() => setCurrentTab('basic')}
        >
          Basic Info
        </button>
        <button
          className={`py-2 px-4 ${
            currentTab === 'questions' ? 'border-b-2 border-indigo-500 font-semibold' : ''
          }`}
          onClick={() => setCurrentTab('questions')}
        >
          Questions
        </button>
        <button
          className={`py-2 px-4 ${
            currentTab === 'ratings' ? 'border-b-2 border-indigo-500 font-semibold' : ''
          }`}
          onClick={() => setCurrentTab('ratings')}
        >
          Ratings
        </button>
        <button
          className={`py-2 px-4 ${
            currentTab === 'rounds' ? 'border-b-2 border-indigo-500 font-semibold' : ''
          }`}
          onClick={() => setCurrentTab('rounds')}
        >
          Rounds
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        {renderTabContent()}
        <div className="flex justify-between mt-4">
          {currentTab !== 'basic' && (
            <Button type="button" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {currentTab !== 'rounds' && (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          )}
          {currentTab === 'rounds' && (
            <Button type="submit" className="ml-auto">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default InterviewForm;
