'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { History, Star } from 'lucide-react';
import { InterviewSession } from '../../types';
import jsPDF from 'jspdf';

interface InterviewHistoryProps {
  showHistory: boolean;
  sessions: InterviewSession[];
  onToggleHistory: () => void;
}

export const InterviewHistory: React.FC<InterviewHistoryProps> = ({
  showHistory,
  sessions,
  onToggleHistory,
}) => {
  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    const loadImageAsBase64 = async (url: string): Promise<string> => {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    const logoData = await loadImageAsBase64('/pdflogo.png');
    const indigo700: [number, number, number] = [67, 56, 202];
    const textColor: [number, number, number] = [0, 0, 0];
    const headingFontSize = 8;
    const bodyFontSize = 8;
    const titleFontSize = 12;
    const marginLeft = 10;
    const marginRight = 10;
    const marginTop = 10;
    const marginBottom = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const effectiveWidth = pageWidth - marginLeft - marginRight;
    const sessionsPerPage = 2;

    const renderSession = (
      session: any,
      sessionIndex: number,
      yStart: number
    ): number => {
      let yPos = yStart;
      const lineHeight = 4;

      doc.setFont('times', 'bold');
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text(`Session ${sessionIndex + 1}:`, marginLeft, yPos);
      yPos += lineHeight;

      doc.setFont('times', 'normal');
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      doc.text(
        `Mode: ${
          session.mode === 'software' ? 'Software Engineering' : 'Behavioral'
        } Interview`,
        marginLeft,
        yPos
      );
      yPos += lineHeight;

      doc.text(
        `Date: ${new Date(session.date).toLocaleDateString()}`,
        marginLeft,
        yPos
      );
      yPos += lineHeight;

      doc.setFont('times', 'bold');
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text('Question:', marginLeft, yPos);
      yPos += lineHeight;

      doc.setFont('times', 'normal');
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const questionLines = doc.splitTextToSize(
        session.question,
        effectiveWidth
      );
      doc.text(questionLines, marginLeft, yPos);
      yPos += lineHeight * questionLines.length;

      doc.setFont('times', 'bold');
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text('Your Response:', marginLeft, yPos);
      yPos += lineHeight;

      doc.setFont('times', 'normal');
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const responseLines = doc.splitTextToSize(
        session.transcript,
        effectiveWidth
      );
      doc.text(responseLines, marginLeft, yPos);
      yPos += lineHeight * responseLines.length;

      doc.setFont('times', 'bold');
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text('Score:', marginLeft, yPos);
      yPos += lineHeight;

      doc.setFont('times', 'normal');
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      doc.text(`${session.feedback.overallScore}/5`, marginLeft, yPos);
      yPos += lineHeight;

      doc.setFont('times', 'bold');
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text('Feedback:', marginLeft, yPos);
      yPos += lineHeight;

      doc.setFont('times', 'normal');
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const feedbackLines = doc.splitTextToSize(
        session.feedback.detailedFeedback,
        effectiveWidth
      );
      doc.text(feedbackLines, marginLeft, yPos);
      yPos += lineHeight * feedbackLines.length;

      doc.setFont('times', 'bold');
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text('Strengths:', marginLeft, yPos);
      yPos += lineHeight;

      doc.setFont('times', 'normal');
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const strengthsText = Array.isArray(session.feedback.strengths)
        ? session.feedback.strengths.join(', ')
        : '';
      const strengthsLines = doc.splitTextToSize(strengthsText, effectiveWidth);
      doc.text(strengthsLines, marginLeft, yPos);
      yPos += lineHeight * strengthsLines.length;

      doc.setFont('times', 'bold');
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text('Weaknesses:', marginLeft, yPos);
      yPos += lineHeight;

      doc.setFont('times', 'normal');
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const weaknessesText = Array.isArray(session.feedback.areasToImprove)
        ? session.feedback.areasToImprove.join(', ')
        : '';
      const weaknessesLines = doc.splitTextToSize(
        weaknessesText,
        effectiveWidth
      );
      doc.text(weaknessesLines, marginLeft, yPos);
      yPos += lineHeight * weaknessesLines.length;

      yPos += 10;
      return yPos;
    };

    for (let i = 0; i < sessions.length; i += sessionsPerPage) {
      if (i > 0) doc.addPage();

      doc.addImage(logoData, 'PNG', marginLeft, marginTop, 30, 5);

      let yPosition = marginTop + 20;
      doc.setFont('times', 'bold');
      doc.setFontSize(titleFontSize);
      doc.setTextColor(...indigo700);
      doc.text('Interview Grade Report', pageWidth / 2, yPosition, {
        align: 'center',
      });
      yPosition += 10;

      doc.setFont('times', 'normal');
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);

      for (let j = i; j < Math.min(i + sessionsPerPage, sessions.length); j++) {
        yPosition = renderSession(sessions[j], j, yPosition);
      }
    }

    doc.save('PrepSpective_interview_history.pdf');
  };

  const renderStars = (score: number) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${score >= star ? 'text-yellow-400' : 'text-gray-300'}`}
          fill={score >= star ? '#facc15' : 'none'}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={onToggleHistory} className="flex items-center gap-2">
          <History className="h-4 w-4" />
          {showHistory ? 'Hide History' : 'View History'}
        </Button>
        <Button variant="outline" onClick={handleDownloadPDF} className="flex items-center gap-2">
          Download
        </Button>
      </div>

      {showHistory && (
        <div className="space-y-6">
          {sessions.map((session) => (
            <Card key={session.id} className="rounded-xl border border-slate-200 shadow-md hover:shadow-lg transition-shadow bg-white">
              <CardHeader className="p-6 border-b bg-slate-100 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {session.mode === 'software' ? 'Technical Interview' : 'Behavioral Interview'}
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-sm mt-1">
                      {new Date(session.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {renderStars(session.feedback.overallScore)}
                    <p className="text-sm mt-1 font-medium">
                      {session.feedback.overallScore}/5
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Question</p>
                  <p className="text-base text-slate-800 leading-relaxed">{session.question}</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Your Response</p>
                  <p className="text-base text-slate-800 whitespace-pre-wrap leading-relaxed">{session.transcript}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-green-700 font-semibold mb-1">Strengths</p>
                    <ul className="text-slate-700 list-disc list-inside space-y-1 text-sm">
                      {session.feedback.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-yellow-700 font-semibold mb-1">Areas to Improve</p>
                    <ul className="text-slate-700 list-disc list-inside space-y-1 text-sm">
                      {session.feedback.areasToImprove.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50 px-6 py-4 rounded-b-xl">
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  <p className="font-medium text-slate-800 mb-1">Detailed Feedback:</p>
                  {session.feedback.detailedFeedback}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};