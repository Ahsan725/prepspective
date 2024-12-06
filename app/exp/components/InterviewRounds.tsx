'use client';

import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Edit, Plus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FormData, Round } from '../types';

type InterviewRoundsProps = {
  formData: FormData;
  handleChange: (field: keyof FormData, value: Round[]) => void;
};

export function InterviewRounds({ formData, handleChange }: InterviewRoundsProps) {
  const { toast } = useToast();
  const [currentRound, setCurrentRound] = useState<Round>({
    id: '',
    roundType: '',
    roundDate: '',
    experience: '',
  });
  const [editingRoundId, setEditingRoundId] = useState<string | null>(null);

  const addRound = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!currentRound.roundType || !currentRound.roundDate || !currentRound.experience.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill out all the fields: type, date and experience, before adding the round.',
      });
      return;
    }

    const newRound = { ...currentRound, id: Date.now().toString() };
    handleChange('rounds', [...formData.rounds, newRound]);
    setCurrentRound({ id: '', roundType: '', roundDate: '', experience: '' });
  };

  const editRound = (id: string) => {
    const roundToEdit = formData.rounds.find((r) => r.id === id);
    if (roundToEdit) {
      setCurrentRound(roundToEdit);
      setEditingRoundId(id);

      toast({
        title: 'Edit Mode',
        description: 'You are now editing the selected round. Scroll Up to make changes.',
      });
    }
  };

  const saveRound = () => {
    if (editingRoundId) {
      if (!currentRound.experience.trim()) {
        handleChange(
          'rounds',
          formData.rounds.filter((r) => r.id !== editingRoundId)
        );
        toast({
          title: 'Round Deleted',
          description: 'The round was deleted as the experience field was cleared.',
        });
      } else {
        handleChange(
          'rounds',
          formData.rounds.map((r) => (r.id === editingRoundId ? currentRound : r))
        );
        toast({
          title: 'Round Updated',
          description: 'The round was successfully updated.',
        });
      }
      setEditingRoundId(null);
      setCurrentRound({ id: '', roundType: '', roundDate: '', experience: '' });
    }
  };

  return (
    <Card className="bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 shadow-xl border border-gray-100 rounded-xl md:col-span-2 lg:col-span-3">
      <CardHeader className="border-b border-gray-100 bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 p-6">
        <CardTitle className="text-xl font-semibold text-gray-900">Interview Rounds</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="roundType" className="text-sm font-medium text-gray-700">Round Type</Label>
            <Select
              value={currentRound.roundType}
              onValueChange={(value) => setCurrentRound((prev) => ({ ...prev, roundType: value }))}
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
                    variant="ghost2"
                    className="w-full justify-start text-left font-normal"
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
              <Button
                onClick={editingRoundId ? saveRound : addRound}
                type="button"
                size="icon"
                className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700"
              >
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
            onChange={(e) => setCurrentRound((prev) => ({ ...prev, experience: e.target.value }))}
            className="min-h-[100px] bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 border-gray-200 rounded-lg resize-none"
          />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Interview Rounds:</h4>
          <ul className="space-y-2">
            {formData.rounds.map((r) => (
              <li key={r.id} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-indigo-600">{r.roundType}</div>
                    <div className="text-sm pt-0 mt-0 text-indigo-600">
                      {format(parse(r.roundDate, 'yyyy-MM-dd', new Date()), 'MMMM dd, yyyy')}
                    </div>
                    <div className="mt-2 text-gray-700 text-sm leading-loose">{r.experience}</div>
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
  );
}