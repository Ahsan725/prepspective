'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parse } from 'date-fns';
import { addDays } from 'date-fns';
import { topTechCompanies } from '@/data/companies';


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Edit, Save, X } from 'lucide-react';
import { ErrorMessage } from '@/components/error-message';

type Question = {
  id: string;
  type: 'behavioral' | 'technical';
  question: string;
  leetcodeLink?: string;
};

type Rating = {
  category: string;
  score: number;
};

type Round = {
  id: string;
  roundType: string;
  roundDate: string;
  experience: string;
};

type InterviewLevel =
  | "Intern"
  | "New Grad"
  | "Junior Engineer"
  | "Senior Engineer"
  | "Staff Engineer"
  | "Principal Engineer"
  | "Associate"
  | "Engineering Manager";

type FormData = {
  company: string;
  interviewDate: string;
  level: InterviewLevel;
  jobOffer: boolean | null;
  overallExperience: string;
  questions: Question[];
  ratings: Rating[];
  rounds: Round[];
};


const InterviewForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    company: '',
    interviewDate: '',
    level: 'New Grad', // Default value
    jobOffer: null,
    overallExperience: '',
    questions: [],
    ratings: [],
    rounds: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '',
    type: 'behavioral',
    question: '',
    leetcodeLink: '',
  });

  const [currentRating, setCurrentRating] = useState<Rating>({ category: '', score: 0 });

  const [currentRound, setCurrentRound] = useState<Round>({
    id: '',
    roundType: '',
    roundDate: '',
    experience: '',
  });

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingRoundId, setEditingRoundId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState(new Set<keyof FormData>());

  const handleChange = (
    field: keyof FormData,
    value: string | boolean | null | Question[] | Rating[] | Round[] | InterviewLevel
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

 // Function to handle the selected date and adjust as necessary
 const handleDateSelection = (selectedDate: Date | undefined) => {
  if (selectedDate) {
    // Adjust the date (e.g., select the next day)
    const adjustedDate = addDays(selectedDate, 1); // Add one day

    // Format the adjusted date
    const formattedDate = format(adjustedDate, 'yyyy-MM-dd');

    // Update the formData state
    setFormData((prev) => ({
      ...prev,
      interviewDate: formattedDate, // Update the interviewDate field
    }));

    // Clear any validation errors for interviewDate
    setInvalidFields((prev) => {
      const newSet = new Set(prev);
      newSet.delete('interviewDate');
      return newSet;
    });
  }
};


const allowedDomains = ['leetcode.com', 'geeksforgeeks.org'];

const ensureHttpsAndValidate = (url: string): string | null => {
  let updatedUrl = url.trim();

  if (!updatedUrl.startsWith('https://') && !updatedUrl.startsWith('http://')) {
    updatedUrl = `https://${updatedUrl}`;
  }

  const domainPart = updatedUrl.replace(/https?:\/\//, '');
  if (!domainPart.startsWith('www.')) {
    updatedUrl = updatedUrl.replace(/(https?:\/\/)/, '$1www.');
  }

  // Check if the domain matches allowed domains
  const domain = domainPart.split('/')[0]; // Extract the domain part
  if (!allowedDomains.some((allowedDomain) => domain.endsWith(allowedDomain))) {
    return null; // Invalid domain
  }

  return updatedUrl;
};


const addQuestion = (e: React.MouseEvent) => {
  e.preventDefault();

  if (currentQuestion.question) {
    const validatedLink: string | undefined = currentQuestion.leetcodeLink
      ? ensureHttpsAndValidate(currentQuestion.leetcodeLink) || undefined
      : undefined;

    if (currentQuestion.leetcodeLink && !validatedLink) {
      toast({
        title: 'Invalid Link!',
        description: 'We only support LeetCode and GeeksforGeeks links.',
      });
      return;
    }

    const newQuestion: Question = {
      ...currentQuestion,
      id: Date.now().toString(),
      leetcodeLink: validatedLink,
    };

    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));

    setCurrentQuestion({ id: '', type: 'behavioral', question: '', leetcodeLink: undefined });
  }
};

const saveQuestion = () => {
  const validatedLink: string | undefined = currentQuestion.leetcodeLink
    ? ensureHttpsAndValidate(currentQuestion.leetcodeLink) || undefined
    : undefined;

  if (currentQuestion.leetcodeLink && !validatedLink) {
    toast({
      title: 'Invalid Link!',
      description: 'We only support LeetCode and GeeksforGeeks links.',
    });
    return;
  }

  setFormData((prev) => ({
    ...prev,
    questions: prev.questions.map((q) =>
      q.id === editingQuestionId
        ? {
            ...currentQuestion,
            leetcodeLink: validatedLink,
          }
        : q
    ),
  }));

  setEditingQuestionId(null);
  setCurrentQuestion({ id: '', type: 'behavioral', question: '', leetcodeLink: undefined });
};


const editQuestion = (id: string) => {
  const questionToEdit = formData.questions.find((q) => q.id === id);
  if (questionToEdit) {
    setCurrentQuestion(questionToEdit);
    setEditingQuestionId(id);
  }
};



  const addOrUpdateRating = () => {
    if (currentRating.category && currentRating.score >= 1 && currentRating.score <= 5) {
      setFormData(prev => {
        const existingIndex = prev.ratings.findIndex(r => r.category === currentRating.category)
        if (existingIndex !== -1) {
          // Update existing rating
          const updatedRatings = [...prev.ratings]
          updatedRatings[existingIndex] = currentRating
          return { ...prev, ratings: updatedRatings }
        } else {
          // Add new rating
          return { ...prev, ratings: [...prev.ratings, currentRating] }
        }
      })
      setCurrentRating({ category: '', score: 0 }) // Reset current rating
    }
  }

  const addRound = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentRound.roundType && currentRound.roundDate) {
      const newRound = { ...currentRound, id: Date.now().toString() };
      setFormData((prev) => ({
        ...prev,
        rounds: [...prev.rounds, newRound],
      }));
      setCurrentRound({ id: '', roundType: '', roundDate: '', experience: '' });
    }
  };

  const editRound = (id: string) => {
    const roundToEdit = formData.rounds.find(r => r.id === id);
    if (roundToEdit) {
      setCurrentRound(roundToEdit);
      setEditingRoundId(id);
    }
  };

  const saveRound = () => {
    setFormData(prev => ({
      ...prev,
      rounds: prev.rounds.map(r => r.id === editingRoundId ? currentRound : r)
    }));
    setEditingRoundId(null);
    setCurrentRound({ id: '', roundType: '', roundDate: '', experience: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof FormData)[] = ['company', 'interviewDate', 'level', 'overallExperience'];
    const newInvalidFields = new Set<keyof FormData>();

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newInvalidFields.add(field);
      }
    });

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
          description: 'Interview entry submitted successfully!',
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
    <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 p-4 sm:p-6">
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
          <div className="flex justify-center items-center">
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Basic Info */}
<Card className="bg-white shadow-sm border border-gray-100 rounded-xl">
  <CardHeader className="border-b border-gray-100 bg-white p-6">
    <CardTitle className="text-xl font-semibold text-gray-900">
      Basic Information
    </CardTitle>
  </CardHeader>
  <CardContent className="p-6 space-y-4">
    {/* Company Field */}
    <div className="space-y-2">
      <Label htmlFor="company" className="text-sm font-medium text-gray-700">
        Company
      </Label>
      <Select
  onValueChange={(value) => {
    handleChange('company', value);
    setInvalidFields((prev) => {
      const newSet = new Set(prev);
      newSet.delete('company');
      return newSet;
    });
  }}
>
  <SelectTrigger
    className={`w-full ${
      invalidFields.has('company') ? 'border-red-500' : ''
    }`}
  >
    <SelectValue placeholder="Select a company" />
  </SelectTrigger>
  <SelectContent>
    {topTechCompanies.map((company) => (
      <SelectItem key={company} value={company}>
        {company}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

      {invalidFields.has('company') && (
        <ErrorMessage message="Please select a company" />
      )}
    </div>

    {/* Interview Date Field */}
    <div className="space-y-2">
      <Label htmlFor="interviewDate" className="text-sm font-medium text-gray-700">
        Interview Date
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="interviewDate"
            variant="ghost"
            className={`w-full justify-start text-left font-normal ${
              invalidFields.has('interviewDate') ? 'border-red-500' : ''
            }`}
          >
            {formData.interviewDate
              ? format(new Date(formData.interviewDate), 'MMMM dd, yyyy')
              : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
         <Calendar
        mode="single"
        selected={
          formData.interviewDate
            ? new Date(formData.interviewDate) // Parse stored string into a Date object
            : undefined
        }
        onSelect={handleDateSelection} // Use the new handler
        initialFocus
      />
        </PopoverContent>
      </Popover>
      {invalidFields.has('interviewDate') && (
        <ErrorMessage message="Please select a valid interview date" />
      )}
    </div>

    {/* Interview Level Field */}
    <div className="space-y-2">
      <Label htmlFor="level" className="text-sm font-medium text-gray-700">
        Interview Level
      </Label>
      <Select
        value={formData.level}
        onValueChange={(value: InterviewLevel) => {
          handleChange('level', value);
          setInvalidFields((prev) => {
            const newSet = new Set(prev);
            newSet.delete('level');
            return newSet;
          });
        }}
      >
        <SelectTrigger
          className={`w-full ${
            invalidFields.has('level') ? 'border-red-500' : ''
          }`}
        >
          <SelectValue placeholder="Select interview level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Intern">Intern</SelectItem>
          <SelectItem value="New Grad">New Grad</SelectItem>
          <SelectItem value="Junior Engineer">Junior Engineer</SelectItem>
          <SelectItem value="Senior Engineer">Senior Engineer</SelectItem>
          <SelectItem value="Staff Engineer">Staff Engineer</SelectItem>
          <SelectItem value="Principal Engineer">Principal Engineer</SelectItem>
          <SelectItem value="Associate">Associate</SelectItem>
          <SelectItem value="Engineering Manager">Engineering Manager</SelectItem>
        </SelectContent>
      </Select>
      {invalidFields.has('level') && (
        <ErrorMessage message="Please select an interview level" />
      )}
    </div>

    {/* Job Offer Field */}
    <div className="space-y-2">
      <Label htmlFor="jobOffer" className="text-sm font-medium text-gray-700">
        Job Offer
      </Label>
      <Select
        onValueChange={(value) =>
          handleChange(
            'jobOffer',
            value === 'true' ? true : value === 'false' ? false : null
          )
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Yes</SelectItem>
          <SelectItem value="false">No</SelectItem>
          <SelectItem value="null">Pending/Unsure</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </CardContent>
</Card>


          {/* Overall Experience */}
          <Card className="bg-white shadow-sm border border-gray-100 rounded-xl md:col-span-2 flex flex-col">
  <CardHeader className="border-b border-gray-100 bg-white p-6">
    <CardTitle className="text-xl font-semibold text-gray-900">Overall Experience</CardTitle>
  </CardHeader>
  <CardContent className="p-6 flex-1 flex flex-col">
    <Textarea
      id="overallExperience"
      placeholder="Describe your overall interview experience"
      value={formData.overallExperience}
      onChange={(e) => handleChange('overallExperience', e.target.value)}
      className="flex-1 min-h-[250px] bg-white border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
          value={currentQuestion.type}
          onValueChange={(value) =>
            setCurrentQuestion((prev) => ({ ...prev, type: value as 'behavioral' | 'technical' }))
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="behavioral">Behavioral</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-[2]">
        <Label htmlFor="question" className="text-sm font-medium text-gray-700">Question</Label>
        <div className="flex gap-2">
          <Textarea
            id="question"
            placeholder="Enter question"
            value={currentQuestion.question}
            onChange={(e) =>
              setCurrentQuestion((prev) => ({ ...prev, question: e.target.value }))
            }
            className="flex-1 min-h-[150px] bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
          <Button
            onClick={editingQuestionId ? saveQuestion : addQuestion}
            type="button"
            size="icon"
            className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700"
          >
            {editingQuestionId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
          <li key={q.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
            <div>
              <span className="font-semibold text-indigo-600">
                {q.type.charAt(0).toUpperCase() + q.type.slice(1)}
              </span>
              {': '}
              <span className="text-gray-700 text-sm">{q.question}</span>{' '}
              {q.leetcodeLink && (
                <a
                  href={q.leetcodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  LeetCode Link
                </a>
              )}
            </div>
            <Button onClick={() => editQuestion(q.id)} type="button" size="sm" variant="ghost">
              <Edit className="h-4 w-4" />
            </Button>
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
                    value={currentRating.category}
                    onValueChange={(value) => setCurrentRating(prev => ({ ...prev, category: value }))}
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
                          setCurrentRating(prev => ({
                            ...prev,
                            score: value === '' ? 0 : +value,
                          }));
                        }
                      }}
                      className="bg-white border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addOrUpdateRating} type="button" size="icon" className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700">
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
                    value={currentRound.roundType}
                    onValueChange={(value) => setCurrentRound(prev => ({ ...prev, roundType: value }))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select round type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="System Design">System Design</SelectItem>
                      <SelectItem value="OA">OA</SelectItem>
                      <SelectItem value="Behavioral">Behavioral</SelectItem>
                      <SelectItem value="Pre Screen">Pre-Screen</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Onsite Technical">Onsite Technical</SelectItem>
                      <SelectItem value="Onsite Behavioral">Onsite Behavioral</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Team Matching">Team Matching</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="roundDate" className="text-sm font-medium text-gray-700">Round Date</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="roundDate"
                          variant="ghost"
                          className={`w-full justify-start text-left font-normal`}
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
                    <Button onClick={editingRoundId ? saveRound : addRound} type="button" size="icon" className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700">
                      {editingRoundId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
                  {formData.rounds.map((r) => (
                    <li key={r.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">{r.roundType}</div>
                          <div className="text-sm text-gray-600">on {r.roundDate}</div>
                          <div className="mt-2 text-gray-700 text-sm">{r.experience}</div>
                        </div>
                        <Button onClick={() => editRound(r.id)} type="button" size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center items-center">
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

      </div>
    </form>
  );
};

export default InterviewForm;

