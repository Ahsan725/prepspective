import { NextResponse } from 'next/server';
import { db } from '@/db';
import { interviewsTable, questionsTable, ratingsTable, roundsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const interviewId = parseInt(params.id);

  if (isNaN(interviewId)) {
    return NextResponse.json({ error: 'Invalid interview ID' }, { status: 400 });
  }

  try {
    // Fetch the main interview data
    const [interview] = await db
      .select()
      .from(interviewsTable)
      .where(eq(interviewsTable.id, interviewId));

    if (!interview) {
      return NextResponse.json({ error: 'Interview not found' }, { status: 404 });
    }

    // Fetch related questions
    const questions = await db
      .select()
      .from(questionsTable)
      .where(eq(questionsTable.interviewId, interviewId));

    // Fetch related ratings
    const ratings = await db
      .select()
      .from(ratingsTable)
      .where(eq(ratingsTable.interviewId, interviewId));

    // Fetch related rounds
    const rounds = await db
      .select()
      .from(roundsTable)
      .where(eq(roundsTable.interviewId, interviewId));

    // Combine all data into a single object
    const interviewDetails = {
      ...interview,
      questions,
      ratings,
      rounds,
    };

    return NextResponse.json(interviewDetails, { status: 200 });
  } catch (error) {
    console.error('Error fetching interview:', error);
    return NextResponse.json({ error: 'Failed to fetch interview' }, { status: 500 });
  }
}
