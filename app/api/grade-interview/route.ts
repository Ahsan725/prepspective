import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { transcript, question, mode } = await req.json();

    if (!transcript || !question || !mode) {
      return NextResponse.json(
        { error: 'Transcript, question, and mode are required' },
        { status: 400 }
      );
    }

    // OpenAI API call
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
You are an expert interviewer and a harsh grader specializing in ${mode === 'software' ? 'technical software engineering' : 'behavioral'} interviews. 

You will grade the following response to this specific interview question: "${question}"

Analyze the interview response critically and focus on identifying areas for growth and improvement. Return the result in the following **strict JSON format**:
{
  "overallScore": number (1-5),
  "strengths": string[],
  "areasToImprove": string[],
  "detailedFeedback": string
}

${mode === 'software' 
  ? 'Focus on technical accuracy, depth of understanding, and clarity of explanation.' 
  : 'Focus on structure, specific examples, impact, and communication clarity using the STAR method.'}

Give higher score but critical feedback. Do not focus too much on STAR format just recommend it. Give unique insights and tricks to make the response better. Your feedback should highlight specific weaknesses or areas that need significant improvement. Return only the JSON, with no additional text or explanation. Ensure the total response does not exceed 200 characters.`
        },
        {
          role: "user",
          content: transcript
        }
      ],
      temperature: 0.7,
      max_tokens: 120,
    });

    // Safely parse the response
    let feedback;
    const content = completion.choices[0].message.content;

    try {
      feedback = JSON.parse(content || '{}');
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      console.error("OpenAI Response Content:", content);
      return NextResponse.json(
        { error: "Failed to parse JSON from OpenAI response", responseContent: content },
        { status: 500 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error grading interview:', error);
    return NextResponse.json(
      { error: 'Failed to grade interview' },
      { status: 500 }
    );
  }
}