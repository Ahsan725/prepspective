import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { transcript } = await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
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
          You are an expert interviewer and a harsh grader. Analyze the interview response critically and focus solely on identifying areas for growth and improvement. Return the result in the following **strict JSON format**:
{
            "overallScore": number (1-10),
            "strengths": string[],
            "areasToImprove": string[],
            "detailedFeedback": string
          }
          Your feedback should highlight specific weaknesses or areas that need significant improvement. Do not mention strengths or positive aspects, and ensure your evaluation is critical. Return only the JSON, with no additional text or explanation.Ensure the total response does not exceed 200 characters.`
          }
          ,
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
