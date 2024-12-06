'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Plus, Save } from 'lucide-react';
import { FormData, Question } from '../types';
import { useToast } from '@/hooks/use-toast';
import { ensureHttpsAndValidate } from '../utils/validation';
import React from 'react';

type InterviewQuestionsProps = {
  formData: FormData;
  handleChange: (field: keyof FormData, value: Question[]) => void;
};

export function InterviewQuestions({ formData, handleChange }: InterviewQuestionsProps) {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = React.useState<Question>({
    id: '',
    type: 'behavioral',
    question: '',
    leetcodeLink: '',
  });
  const [editingQuestionId, setEditingQuestionId] = React.useState<string | null>(null);

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

      handleChange('questions', [...formData.questions, newQuestion]);
      setCurrentQuestion({ id: '', type: 'behavioral', question: '', leetcodeLink: undefined });
    }
  };

  const saveQuestion = () => {
    if (editingQuestionId) {
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

      if (!currentQuestion.question.trim()) {
        handleChange(
          'questions',
          formData.questions.filter((q) => q.id !== editingQuestionId)
        );

        toast({
          title: 'Question Deleted',
          description: 'The question was deleted as the text was cleared.',
        });
      } else {
        handleChange(
          'questions',
          formData.questions.map((q) =>
            q.id === editingQuestionId
              ? {
                  ...currentQuestion,
                  leetcodeLink: validatedLink,
                }
              : q
          )
        );

        toast({
          title: 'Question Updated',
          description: 'The question was updated successfully.',
        });
      }

      setEditingQuestionId(null);
      setCurrentQuestion({ id: '', type: 'behavioral', question: '', leetcodeLink: undefined });
    }
  };

  const editQuestion = (id: string) => {
    const questionToEdit = formData.questions.find((q) => q.id === id);
    if (questionToEdit) {
      setCurrentQuestion(questionToEdit);
      setEditingQuestionId(id);

      toast({
        title: 'Edit Mode',
        description: 'You are now editing the selected question. Scroll Up to make changes.',
      });
    }
  };

  return (
    <Card className="bg-white shadow-xl border border-gray-100 rounded-xl lg:col-span-2">
      <CardHeader className="border-b border-gray-100 bg-white p-6">
        <CardTitle className="text-xl font-semibold text-gray-900">Interview Questions</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Question Form */}
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
                className="flex-1 min-h-[150px] bg-white border-gray-200 rounded-lg resize-none"
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

        {/* LeetCode Link */}
        {currentQuestion.type === 'technical' && (
          <div>
            <Label htmlFor="leetcodeLink" className="text-sm font-medium text-gray-700">Question Link</Label>
            <Input
              id="leetcodeLink"
              placeholder="LeetCode or GeeksforGeeks only"
              value={currentQuestion.leetcodeLink}
              onChange={(e) =>
                setCurrentQuestion((prev) => ({
                  ...prev,
                  leetcodeLink: e.target.value,
                }))
              }
              className="bg-white border-gray-200 rounded-lg"
            />
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Added Questions:</h4>
          <ul className="space-y-2">
            {formData.questions.map((q) => (
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
  );
}