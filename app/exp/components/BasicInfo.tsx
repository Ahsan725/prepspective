'use client';

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { ErrorMessage } from '@/components/error-message';
import { topTechCompanies } from '@/data/companies';
import { FormData, InterviewLevel } from '../types';

type BasicInfoProps = {
    formData: FormData;
    invalidFields: Set<keyof FormData>;
    handleChange: <T extends keyof FormData>(field: T, value: FormData[T]) => void;
    handleDateSelection: (date: Date | undefined) => void;
    setInvalidFields: (setter: (prev: Set<keyof FormData>) => Set<keyof FormData>) => void;
  };  

export function BasicInfo({
  formData,
  invalidFields,
  handleChange,
  handleDateSelection,
  setInvalidFields,
}: BasicInfoProps) {
  return (
    <Card className="bg-white shadow-xl border border-gray-100 rounded-xl">
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
                selected={formData.interviewDate ? new Date(formData.interviewDate) : undefined}
                onSelect={handleDateSelection}
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
  );
}