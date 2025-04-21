// File: app/customize/page.tsx
'use client';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OpenInOverleafButton } from '@/components/OpenInOverleafButton';
import Loader from '@/components/ui/loader';

export default function ResumeCustomizerPage() {
  const RESUME_LIMIT = 4000;
  const JD_LIMIT = 1500;

  const [resumeText, setResumeText] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [tex, setTex] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTex, setShowTex] = useState(false);

  const isValid =
    resumeText.length > 0 &&
    jobDesc.length > 0 &&
    resumeText.length <= RESUME_LIMIT &&
    jobDesc.length <= JD_LIMIT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setTex(null);
    setShowTex(false);
    try {
      const res = await fetch('/api/generate-latex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription: jobDesc }),
      });
      const data = await res.json();
      setTex(data.tex);
    } catch (error) {
      console.error('Request failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Tailor Your Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="resume">Your Resume</Label>
          <Textarea
            id="resume"
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            rows={10}
            maxLength={RESUME_LIMIT}
          />
          <p className="mt-1 text-sm text-gray-500">
            {resumeText.length}/{RESUME_LIMIT} characters
          </p>
        </div>
        <div>
          <Label htmlFor="jobDesc">Job Description</Label>
          <Textarea
            id="jobDesc"
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
            rows={10}
            maxLength={JD_LIMIT}
          />
          <p className="mt-1 text-sm text-gray-500">
            {jobDesc.length}/{JD_LIMIT} characters
          </p>
        </div>
        <Button type="submit" disabled={loading || !isValid}>
          {loading ? 'Generating...' : 'Generate LaTeX'}
        </Button>
        {(!isValid && (resumeText.length > RESUME_LIMIT || jobDesc.length > JD_LIMIT)) && (
          <p className="text-red-500 text-sm">
            Please ensure your resume ≤ {RESUME_LIMIT} chars and JD ≤ {JD_LIMIT} chars.
          </p>
        )}
      </form>

      {loading && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}

      {!loading && tex && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              id="toggleTex"
              type="checkbox"
              checked={showTex}
              onChange={e => setShowTex(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <Label htmlFor="toggleTex">Show LaTeX Code</Label>
          </div>

          {showTex && (
            <pre className="p-4 bg-gray-100 rounded overflow-auto text-sm">
              <code>{tex}</code>
            </pre>
          )}

          <OpenInOverleafButton tex={tex} />
        </div>
      )}
    </div>
  );
}