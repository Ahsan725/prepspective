import { NextResponse } from 'next/server';
import { db } from '@/db';
import { waitlistTable } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Insert email into the waitlist table
    await db.insert(waitlistTable).values({ email });

    // Count the total emails in the waitlist
    const count = await db
      .select({ total: sql`COUNT(*)` })
      .from(waitlistTable);

    return NextResponse.json({ message: 'Email added successfully', count: count[0]?.total });
  } catch (error) {
    // Narrowing the error type to 'Error'
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Something went wrong', details: error.message }, { status: 500 });
    }

    // Handle unknown error type as fallback
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
