/* eslint-enable @typescript-eslint/no-explicit-any */

'use client'
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
import { History } from 'lucide-react';
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

  // Helper function to load an image and return a Base64 data URL
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
  
  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
  
    // Load logo
    const logoData = await loadImageAsBase64("/pdflogo.png");
  
    // Style configuration
    const indigo700: [number, number, number] = [67, 56, 202];
    const textColor: [number, number, number] = [0, 0, 0];
    const headingFontSize = 8;
    const bodyFontSize = 8;
    const titleFontSize = 12;
  
    // Layout configuration
    const marginLeft = 10;
    const marginRight = 10;
    const marginTop = 10;
    const marginBottom = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const effectiveWidth = pageWidth - marginLeft - marginRight;
    const sessionsPerPage = 2;
  
    const renderSession = (session: any, sessionIndex: number, yStart: number): number => {
      let yPos = yStart;
      const lineHeight = 4;
  
      // Session Header
      doc.setFont("times", "bold");
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text(`Session ${sessionIndex + 1}:`, marginLeft, yPos);
      yPos += lineHeight;
  
      // Mode
      doc.setFont("times", "normal");
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      doc.text(
        `Mode: ${session.mode === 'software' ? 'Software Engineering' : 'Behavioral'} Interview`,
        marginLeft,
        yPos
      );
      yPos += lineHeight;
  
      // Date
      doc.text(`Date: ${new Date(session.date).toLocaleDateString()}`, marginLeft, yPos);
      yPos += lineHeight;
  
      // Question Header
      doc.setFont("times", "bold");
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text("Question:", marginLeft, yPos);
      yPos += lineHeight;
  
      // Question Body
      doc.setFont("times", "normal");
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const questionLines = doc.splitTextToSize(session.question, effectiveWidth);
      doc.text(questionLines, marginLeft, yPos);
      yPos += lineHeight * questionLines.length;
  
      // Response Header
      doc.setFont("times", "bold");
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text("Your Response:", marginLeft, yPos);
      yPos += lineHeight;
  
      // Response Body
      doc.setFont("times", "normal");
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const responseLines = doc.splitTextToSize(session.transcript, effectiveWidth);
      doc.text(responseLines, marginLeft, yPos);
      yPos += lineHeight * responseLines.length;
  
      // Score Header
      doc.setFont("times", "bold");
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text("Score:", marginLeft, yPos);
      yPos += lineHeight;
  
      // Score Body
      doc.setFont("times", "normal");
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      doc.text(`${session.feedback.overallScore}/5`, marginLeft, yPos);
      yPos += lineHeight;
  
      // Feedback Header
      doc.setFont("times", "bold");
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text("Feedback:", marginLeft, yPos);
      yPos += lineHeight;
  
      // Feedback Body
      doc.setFont("times", "normal");
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const feedbackLines = doc.splitTextToSize(session.feedback.detailedFeedback, effectiveWidth);
      doc.text(feedbackLines, marginLeft, yPos);
      yPos += lineHeight * feedbackLines.length;
  
      // Strengths Header
      doc.setFont("times", "bold");
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text("Strengths:", marginLeft, yPos);
      yPos += lineHeight;
  
      // Strengths Body
      doc.setFont("times", "normal");
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const strengthsText = Array.isArray(session.feedback.strengths)
        ? session.feedback.strengths.join(', ')
        : '';
      const strengthsLines = doc.splitTextToSize(strengthsText, effectiveWidth);
      doc.text(strengthsLines, marginLeft, yPos);
      yPos += lineHeight * strengthsLines.length;
  
      // Weaknesses Header
      doc.setFont("times", "bold");
      doc.setFontSize(headingFontSize);
      doc.setTextColor(...indigo700);
      doc.text("Weaknesses:", marginLeft, yPos);
      yPos += lineHeight;
  
      // Weaknesses Body
      doc.setFont("times", "normal");
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
      const weaknessesText = Array.isArray(session.feedback.areasToImprove)
        ? session.feedback.areasToImprove.join(', ')
        : '';
      const weaknessesLines = doc.splitTextToSize(weaknessesText, effectiveWidth);
      doc.text(weaknessesLines, marginLeft, yPos);
      yPos += lineHeight * weaknessesLines.length;
  
      yPos += 10;
      return yPos;
    };
  
    // Generate pages
    for (let i = 0; i < sessions.length; i += sessionsPerPage) {
      if (i > 0) doc.addPage();
      
      // Add logo
      doc.addImage(logoData, "PNG", marginLeft, marginTop, 30, 5);
      
      // Page title
      let yPosition = marginTop + 20;
      doc.setFont("times", "bold");
      doc.setFontSize(titleFontSize);
      doc.setTextColor(...indigo700);
      doc.text("Interview Grade Report", pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
  
      // Reset to body style
      doc.setFont("times", "normal");
      doc.setFontSize(bodyFontSize);
      doc.setTextColor(...textColor);
  
      // Render sessions
      for (let j = i; j < Math.min(i + sessionsPerPage, sessions.length); j++) {
        yPosition = renderSession(sessions[j], j, yPosition);
      }
    }
  
    doc.save("PrepSpective_interview_history.pdf");
  };
  
  
  
  

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={onToggleHistory}
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" />
          {showHistory ? 'Hide History' : 'Show Interview History'}
        </Button>
        <Button
          variant="outline"
          onClick={handleDownloadPDF}
          className="flex items-center gap-2"
        >
          Download History PDF
        </Button>
      </div>

      {showHistory && (
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card key={session.id} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {session.mode === 'software'
                        ? 'Software Engineering'
                        : 'Behavioral'}{' '}
                      Interview
                    </CardTitle>
                    <CardDescription>
                      {new Date(session.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-indigo-600">
                      {session.feedback.overallScore}/5
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">Question:</p>
                  <p className="text-gray-600">{session.question}</p>
                  <p className="font-medium mt-4">Your Response:</p>
                  <p className="text-gray-600">{session.transcript}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50">
                <div className="w-full">
                  <p className="font-medium text-sm text-gray-600">
                    Key Feedback:
                  </p>
                  <p className="text-sm mt-1">
                    {session.feedback.detailedFeedback}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
