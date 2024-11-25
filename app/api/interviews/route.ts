import { NextResponse } from 'next/server';
import { db } from '@/db'; // Import your Drizzle ORM database connection
import { interviewsTable, questionsTable, ratingsTable, roundsTable } from '@/db/schema'; // Import your schema

// Define the types for request data
type Question = {
  type: 'behavioral' | 'technical';
  question: string;
  leetcodeLink?: string | null;
};

type Rating = {
  category: string;
  score: number;
};

type Round = {
  roundType: string;
  roundDate: string;
  experience: string;
};

type InterviewRequestBody = {
  company: string;
  interviewDate: string;
  jobOffer: boolean;
  overallExperience: string;
  questions?: Question[];
  ratings?: Rating[];
  rounds?: Round[];
};

// Handle POST requests (add a new interview with related data)
export async function POST(req: Request) {
  try {
    const body: InterviewRequestBody = await req.json();

    // Validate the main interview data
    if (!body.company || !body.interviewDate) {
      return NextResponse.json(
        { success: false, message: 'Invalid interview data.' },
        { status: 400 }
      );
    }

    // Insert the main interview record and get the new ID
    const [newInterview] = await db
      .insert(interviewsTable)
      .values({
        company: body.company,
        interviewDate: body.interviewDate,
        jobOffer: body.jobOffer,
        overallExperience: body.overallExperience,
      })
      .returning();

    const interviewId = newInterview.id;

    // Save related questions
    if (Array.isArray(body.questions) && body.questions.length > 0) {
      await db.insert(questionsTable).values(
        body.questions.map((question: Question) => ({
          interviewId,
          type: question.type,
          question: question.question,
          leetcodeLink: question.leetcodeLink || null,
        }))
      );
    }

    // Save related ratings
    if (Array.isArray(body.ratings) && body.ratings.length > 0) {
      await db.insert(ratingsTable).values(
        body.ratings.map((rating: Rating) => ({
          interviewId,
          category: rating.category,
          score: rating.score,
        }))
      );
    }

    // Save related rounds
    if (Array.isArray(body.rounds) && body.rounds.length > 0) {
      await db.insert(roundsTable).values(
        body.rounds.map((round: Round) => ({
          interviewId,
          roundType: round.roundType,
          roundDate: round.roundDate,
          experience: round.experience,
        }))
      );
    }

    return NextResponse.json(
      { success: true, message: 'Interview and related data saved successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving interview data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save data.' },
      { status: 500 }
    );
  }
}

// Handle GET requests (fetch all interviews and related data)
export async function GET() {
  try {
    // Fetch all interviews
    const interviews = await db.select().from(interviewsTable).all();

    // Optionally, join and fetch related data for questions, ratings, and rounds
    return NextResponse.json(interviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching interview data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch data.' },
      { status: 500 }
    );
  }
}
