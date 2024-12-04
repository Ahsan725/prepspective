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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Plus } from 'lucide-react';

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
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    company: '',
    interviewDate: '',
    jobOffer: null,
    overallExperience: '',
    questions: [],
    ratings: [],
    rounds: [],
  });

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

  const [loading, setLoading] = useState(false);

  const handleChange = (
    field: keyof FormData,
    value: string | boolean | null | Question[] | Rating[] | Round[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addQuestion = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentQuestion.question) {
      setFormData((prev) => ({
        ...prev,
        questions: [...prev.questions, currentQuestion],
      }));
      setCurrentQuestion({ type: 'behavioral', question: '', leetcodeLink: '' });
    }
  };

  const addRating = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentRating.category && currentRating.score) {
      setFormData((prev) => ({
        ...prev,
        ratings: [...prev.ratings, currentRating],
      }));
      setCurrentRating({ category: '', score: 0 });
    }
  };

  const addRound = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentRound.roundType && currentRound.roundDate) {
      setFormData((prev) => ({ ...prev, rounds: [...prev.rounds, currentRound] }));
      setCurrentRound({ roundType: '', roundDate: '', experience: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.interviewDate) {
      toast({
        title: 'Error',
        description: 'Please fill out all required fields.',
      });
      return;
    }

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
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50 p-4 sm:p-6">
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

      <h3 className="md:w-1/2 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
      Help others prepare by sharing your interview experience. Your insights could be the key to someone else&apos;s success.
      </h3>
          <Button 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 w-full sm:w-auto" 
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Basic Info */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl">
            <CardHeader className="border-b border-gray-100 bg-white p-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">Company</Label>
                <Select
                  inputId="company"
                  options={topTechCompanies.map((company) => ({ label: company, value: company }))}
                  onChange={(selectedOption) =>
                    handleChange('company', selectedOption ? selectedOption.value : '')
                  }
                  placeholder="Select a company"
                  isClearable
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: '#E5E7EB',
                      borderRadius: '0.5rem',
                      backgroundColor: 'white',
                      '&:hover': {
                        borderColor: '#D1D5DB',
                      },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#4F46E5' : 'white',
                      '&:hover': {
                        backgroundColor: state.isSelected ? '#4F46E5' : '#F3F4F6',
                      },
                    }),
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewDate" className="text-sm font-medium text-gray-700">Interview Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white border-gray-200"
                    >
                      {formData.interviewDate
                        ? format(parse(formData.interviewDate, 'yyyy-MM-dd', new Date()), 'MMMM dd, yyyy')
                        : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.interviewDate ? parse(formData.interviewDate, 'yyyy-MM-dd', new Date()) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          handleChange('interviewDate', format(date, 'yyyy-MM-dd'));
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobOffer" className="text-sm font-medium text-gray-700">Job Offer</Label>
                <Select
                  inputId="jobOffer"
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
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: '#E5E7EB',
                      borderRadius: '0.5rem',
                      backgroundColor: 'white',
                      '&:hover': {
                        borderColor: '#D1D5DB',
                      },
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected ? '#4F46E5' : 'white',
                      '&:hover': {
                        backgroundColor: state.isSelected ? '#4F46E5' : '#F3F4F6',
                      },
                    }),
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Overall Experience */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl md:col-span-2">
            <CardHeader className="border-b border-gray-100 bg-white p-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Overall Experience</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                id="overallExperience"
                placeholder="Describe your overall interview experience"
                value={formData.overallExperience}
                onChange={(e) => handleChange('overallExperience', e.target.value)}
                className="min-h-[150px] bg-white border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </CardContent>
          </Card>

          {/* Interview Questions */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl lg:col-span-2">
            <CardHeader className="border-b border-gray-100 bg-white p-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Interview Questions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="questionType" className="text-sm font-medium text-gray-700">Type</Label>
                  <Select
                    inputId="questionType"
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
                    placeholder="Select type"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#E5E7EB',
                        borderRadius: '0.5rem',
                        backgroundColor: 'white',
                        '&:hover': {
                          borderColor: '#D1D5DB',
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#4F46E5' : 'white',
                        '&:hover': {
                          backgroundColor: state.isSelected ? '#4F46E5' : '#F3F4F6',
                        },
                      }),
                    }}
                  />
                </div>
                <div className="flex-[2]">
                  <Label htmlFor="question" className="text-sm font-medium text-gray-700">Question</Label>
                  <div className="flex gap-2">
                    <Input
                      id="question"
                      placeholder="Enter question"
                      value={currentQuestion.question}
                      onChange={(e) =>
                        setCurrentQuestion((prev) => ({ ...prev, question: e.target.value }))
                      }
                      className="flex-1 bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Button onClick={addQuestion} type="button" size="icon" className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {currentQuestion.type === 'technical' && (
                <div>
                  <Label htmlFor="leetcodeLink" className="text-sm font-medium text-gray-700">LeetCode Link (optional)</Label>
                  <Input
                    id="leetcodeLink"
                    placeholder="LeetCode link"
                    value={currentQuestion.leetcodeLink}
                    onChange={(e) =>
                      setCurrentQuestion((prev) => ({
                        ...prev,
                        leetcodeLink: e.target.value,
                      }))
                    }
                    className="bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              )}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Added Questions:</h4>
                <ul className="space-y-2">
                  {formData.questions.map((q, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium text-gray-900">{q.type}:</span>{' '}
                      <span className="text-gray-700">{q.question}</span>{' '}
                      {q.leetcodeLink && (
                        <a href={q.leetcodeLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                          LeetCode Link
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Interview Ratings */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl">
            <CardHeader className="border-b border-gray-100 bg-white p-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Interview Ratings</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ratingCategory" className="text-sm font-medium text-gray-700">Category</Label>
                  <Select
                    inputId="ratingCategory"
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
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#E5E7EB',
                        borderRadius: '0.5rem',
                        backgroundColor: 'white',
                        '&:hover': {
                          borderColor: '#D1D5DB',
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#4F46E5' : 'white',
                        '&:hover': {
                          backgroundColor: state.isSelected ? '#4F46E5' : '#F3F4F6',
                        },
                      }),
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Label htmlFor="ratingScore" className="text-sm font-medium text-gray-700">Score (1-5)</Label>
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
                      className="bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addRating} type="button" size="icon" className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700">
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

          {/* Interview Rounds */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl md:col-span-2 lg:col-span-3">
            <CardHeader className="border-b border-gray-100 bg-white p-6">
              <CardTitle className="text-xl font-semibold text-gray-900">Interview Rounds</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="roundType" className="text-sm font-medium text-gray-700">Round Type</Label>
                  <Select
                    inputId="roundType"
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
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#E5E7EB',
                        borderRadius: '0.5rem',
                        backgroundColor: 'white',
                        '&:hover': {
                          borderColor: '#D1D5DB',
                        },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#4F46E5' : 'white',
                        '&:hover': {
                          backgroundColor: state.isSelected ? '#4F46E5' : '#F3F4F6',
                        },
                      }),
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="roundDate" className="text-sm font-medium text-gray-700">Round Date</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="roundDate"
                          variant="outline"
                          className="w-full justify-start text-left font-normal bg-white border-gray-200"
                        >
                          {currentRound.roundDate
                            ? format(parse(currentRound.roundDate, 'yyyy-MM-dd', new Date()), 'MMMM dd, yyyy')
                            : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={currentRound.roundDate ? parse(currentRound.roundDate, 'yyyy-MM-dd', new Date()) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              setCurrentRound((prev) => ({
                                ...prev,
                                roundDate: format(date, 'yyyy-MM-dd'),
                              }));
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Button onClick={addRound} type="button" size="icon" className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="roundExperience" className="text-sm font-medium text-gray-700">Round Experience</Label>
                <Textarea
                  id="roundExperience"
                  placeholder="Describe your experience in this round"
                  value={currentRound.experience}
                  onChange={(e) =>
                    setCurrentRound((prev) => ({ ...prev, experience: e.target.value }))
                  }
                  className="min-h-[100px] bg-white border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Interview Rounds:</h4>
                <ul className="space-y-2">
                  {formData.rounds.map((r, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-900">{r.roundType}</div>
                      <div className="text-sm text-gray-600">on {r.roundDate}</div>
                      <div className="mt-2 text-gray-700">{r.experience}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default InterviewForm;

