'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, X } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

interface InterviewTipsProps {
  showTips: boolean;
  onToggleTips: () => void;
}

export const InterviewTips: React.FC<InterviewTipsProps> = ({
  showTips,
  onToggleTips,
}) => {
  const [isGuideOpen, setGuideOpen] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto relative px-4 sm:px-6">
      {showTips && (
        <Card className="mb-4 bg-white border-none shadow-none rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-800">
                Quick Interview Tips
              </h3>
            </div>
            <ul className="space-y-2 text-slate-700 text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-indigo-500">•</span>
                <p>
                  Structure your answers using the STAR method (Situation, Task,
                  Action, Result).
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-indigo-500">•</span>
                <p>
                  Speak clearly, enunciate properly, and include slight pauses.
                  If the AI cannot decipher your speech, a human interviewer likely
                  would not either.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-indigo-500">•</span>
                <p>Use specific examples to support your points.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-indigo-500">•</span>
                <p>
                  Keep your answers focused and relevant to the question.
                </p>
              </li>
            </ul>
            <div className="mt-4">
              <Button variant="default" onClick={() => setGuideOpen(true)}>
                How To Use Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isGuideOpen} onOpenChange={setGuideOpen}>
        <DialogContent
          className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          w-[95%] sm:w-full sm:max-w-4xl 
          max-h-[80vh] sm:max-h-[90vh] 
          p-0 rounded-lg shadow-lg bg-white"
        >
          {/* Sticky Close Button */}
          <div className="flex justify-end p-2 sticky top-0 z-50 bg-white border-b">
            <DialogClose>
              <Button variant="ghost" size="icon">
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-4 py-2 sm:px-8 sm:py-6 max-h-[calc(80vh-3rem)] sm:max-h-[calc(90vh-3rem)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">
                How to Use Guide
              </DialogTitle>
              <DialogDescription>
                <ul className="list-disc ml-6 text-left space-y-4 text-base sm:text-lg">
                  <li>
                    <strong>Allow Microphone Access:</strong> Click the <em>Allow Microphone Access</em> button.
                  </li>
                  <li>
                    <strong>We Recommend Using Headphones:</strong> Use the same headphones/earbuds you would for a video interview.
                  </li>
                  <li>
                    <strong>Select Interview Mode:</strong> Choose the interview mode you want to practice. Once selected, you will be given a question. If you do not want to answer that question, you can change it (though we highly recommend practicing even the challenging ones).
                  </li>
                  <li>
                    <strong>Step 1 - Record:</strong> Record your audio response. You have one minute; if you are not satisfied with your performance, you can record again before submitting. <strong>You have unlimited tries before you submit for grading.</strong>
                  </li>
                  <li>
                    <strong>Step 2 - Submit:</strong> Once you are satisfied with your response submit it for grading.
                  </li>
                  <li>
                    <strong>Step 3 - Review:</strong> Review the results. Our fine-tuned Interview Expert AI will analyze your response. It will show your strengths, areas for improvement, a score out of 5, and actionable feedback.
                  </li>
                  <li>
                    <strong>Download Feedback History:</strong> We purge the interview history periodically. If you would like a copy click on the download button.
                  </li>
                  <li>
                    <strong>How Credits Work:</strong> You have 3 free credits to use every 3 days. They recharge after 3 days so you can use them again. If you have a promo code you may get more credits per session. Some promo codes are reusable after 3 days while some are one-time only.
                  </li>
                </ul>
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
