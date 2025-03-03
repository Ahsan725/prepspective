import { NextResponse } from 'next/server';
import { db } from '@/db';
import { waitlistTable } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    // Fetch the count of all rows in the waitlist table
    const count = await db.select({ total: sql`COUNT(*)` }).from(waitlistTable);

    // Return the count in a JSON response
    return NextResponse.json({ count: count[0]?.total || 0 });
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch waitlist count' },
      { status: 500 }
    );
  }
}