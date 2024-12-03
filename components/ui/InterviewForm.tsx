'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parse } from 'date-fns';
import Select from 'react-select';
import { useToast } from '@/hooks/use-toast';
import Loader from "@/components/ui/loader";

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
  jobOffer: boolean | null;
  overallExperience: string;
  questions: Question[];
  ratings: Rating[];
  rounds: Round[];
};

const topTechCompanies = [
  'Google',
  'Amazon',
  'Meta (Facebook)',
  'Apple',
  'Microsoft',
  'Netflix',
  'Tesla',
];

const InterviewForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    company: '',
    interviewDate: '',
    jobOffer: null,
    overallExperience: '',
    questions: [],
    ratings: [],
    rounds: [],
  });

  const { toast } = useToast();

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
    value: string | boolean | null | Question[] | Rating[] | Round[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [loading, setLoading] = useState(false); // State to track loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.company || !formData.interviewDate) {
      toast({
        title: 'Error',
        description: 'Please fill out all required fields.',
      });
      return;
    }
  
    setLoading(true); // Set loading to true when submitting
  
    try {
      const res = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        toast({
          title: 'Success!',
          description: 'Interview entry submitted successfully!',
        });
        setFormData({
          company: '',
          interviewDate: '',
          jobOffer: null,
          overallExperience: '',
          questions: [],
          ratings: [],
          rounds: [],
        });
        setCurrentTab('basic');
      } else {
        toast({
          title: 'Failed to Save',
          description: 'Failed to save data. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Unexpected Error',
        description: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setLoading(false); // Reset loading to false after submission
    }
  };
  

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, currentQuestion],
    }));
    setCurrentQuestion({ type: 'behavioral', question: '', leetcodeLink: '' });
  };

  const addRating = () => {
    setFormData((prev) => {
      const updatedRatings = [...prev.ratings];
      const existingIndex = updatedRatings.findIndex(
        (rating) => rating.category === currentRating.category
      );
      if (existingIndex !== -1) {
        updatedRatings[existingIndex] = currentRating;
      } else {
        updatedRatings.push(currentRating);
      }
      return { ...prev, ratings: updatedRatings };
    });
    setCurrentRating({ category: '', score: 0 });
  };

  const addRound = () => {
    setFormData((prev) => ({
      ...prev,
      rounds: [...prev.rounds, currentRound],
    }));
    setCurrentRound({ roundType: '', roundDate: '', experience: '' });
  };

  const navigateTab = (direction: 'next' | 'previous') => {
    const tabs = ['basic', 'questions', 'ratings', 'rounds'];
    const currentIndex = tabs.indexOf(currentTab);
    const newIndex =
      direction === 'next'
        ? Math.min(currentIndex + 1, tabs.length - 1)
        : Math.max(currentIndex - 1, 0);
    setCurrentTab(tabs[newIndex] as typeof currentTab);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <Select
                options={topTechCompanies.map((company) => ({ label: company, value: company }))}
                onChange={(selectedOption) =>
                  handleChange('company', selectedOption ? selectedOption.value : '')
                }
                placeholder="Select a company"
                isClearable
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Interview Date</label>
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
                options={[
                  { label: 'Yes', value: true },
                  { label: 'No', value: false },
                  { label: 'Pending/Unsure', value: null },
                ]}
                onChange={(selectedOption) =>
                  handleChange('jobOffer', selectedOption ? selectedOption.value : null)
                }
                placeholder="Select an option"
                isClearable
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Overall Experience</label>
              <Textarea
                placeholder="Describe your experience"
                value={formData.overallExperience}
                onChange={(e) => handleChange('overallExperience', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        );
        case 'questions':
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Question Type</label>
                <Select
                  options={[
                    { label: 'Behavioral', value: 'behavioral' },
                    { label: 'Technical', value: 'technical' },
                  ]}
                  onChange={(selectedOption) =>
                    setCurrentQuestion((prev) => ({
                      ...prev,
                      type: (selectedOption?.value as 'behavioral' | 'technical') || 'behavioral',
                    }))
                  }
                  placeholder="Select question type"
                />
              </div>
              <div>
                <Input
                  placeholder="Enter question"
                  value={currentQuestion.question}
                  onChange={(e) =>
                    setCurrentQuestion((prev) => ({ ...prev, question: e.target.value }))
                  }
                />
              </div>
              {currentQuestion.type === 'technical' && (
                <div>
                  <Input
                    placeholder="LeetCode link (optional)"
                    value={currentQuestion.leetcodeLink}
                    onChange={(e) =>
                      setCurrentQuestion((prev) => ({
                        ...prev,
                        leetcodeLink: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
              <Button variant="secondary" onClick={addQuestion} type="button">
                Add Question
              </Button>
              <ul className="list-disc pl-6 mt-4">
                {formData.questions.map((q, index) => (
                  <li key={index}>
                    {q.type}: {q.question}{' '}
                    {q.leetcodeLink && <a href={q.leetcodeLink}>LeetCode Link</a>}
                  </li>
                ))}
              </ul>
            </div>
          );
        
      case 'ratings':
        return (
          <div className="space-y-4">
            <h3 className="block text-sm font-medium text-gray-700">Ratings</h3>
            <Select
              options={[
                { label: 'Difficulty', value: 'Difficulty' },
                { label: 'Friendliness', value: 'Friendliness' },
                { label: 'Responsiveness', value: 'Responsiveness' },
              ]}
              onChange={(selectedOption) =>
                setCurrentRating((prev) => ({
                  ...prev,
                  category: selectedOption?.value || '',
                }))
              }
              placeholder="Select a category"
            />
            <Input
              placeholder="Score (1-5)"
              type="number"
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
            />
            <Button onClick={addRating} variant="secondary" type="button">
              Add/Update Rating
            </Button>
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
          <div className="space-y-4">
            <h3 className="block text-sm font-medium text-gray-700">Rounds</h3>
            <Select
              options={[
                { label: 'System Design', value: 'System Design' },
                { label: 'OA', value: 'OA' },
                { label: 'Behavioral', value: 'Behavioral' },
                { label: 'Pre-Screen', value: 'Pre Screen' },
                { label: 'Technical', value: 'Technical' },
                { label: 'Onsite Technical', value: 'Onsite Technical' },
                { label: 'Onsite Behavioral', value: 'Onsite Behavioral' },
                { label: 'HR', value: 'HR' },
                { label: 'Team Matching', value: 'Team Matching' },
              ]}
              onChange={(selectedOption) =>
                setCurrentRound((prev) => ({
                  ...prev,
                  roundType: selectedOption ? selectedOption.value : '',
                }))
              }
              placeholder="Select round type"
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
            <Button onClick={addRound} variant="secondary" type="button">
              Add/Update Round
            </Button>
            <ul className="list-disc pl-6 mt-4">
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

  return (
    <div className="max-w-3xl mx-auto p-4 shadow-2xl rounded-xl bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50">
      <div className="flex justify-between border-b mb-2">
        {['basic', 'questions', 'ratings', 'rounds'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-base ${
              currentTab === tab
                ? 'border-b-2 border-indigo-500 font-extrabold text-indigo-700 text-xs lg:text-lg'
                : 'text-gray-600 text-xs lg:text-lg'
            }`}
            onClick={() => setCurrentTab(tab as typeof currentTab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {renderTabContent()}
        <div className="flex justify-between items-center">
  {currentTab !== 'basic' && (
    <Button variant="secondary" onClick={() => navigateTab('previous')} type="button">
      Previous
    </Button>
  )}
  {currentTab !== 'rounds' && (
    <Button variant="outline" onClick={() => navigateTab('next')} type="button">
      Next
    </Button>
  )}
  {currentTab === 'rounds' && (
    <div className="relative">
      <Button variant="default" type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
      {/* {loading && <Loader/>} */}
    </div>
  )}
</div>

      </form>
    </div>
  );
};

export default InterviewForm;
