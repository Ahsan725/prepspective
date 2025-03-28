// app/api/updateStatus/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db"; // your Turso database client
import { userProblemStatusTable } from "@/db/schema";
import { eq, and } from "drizzle-orm/expressions";

export async function GET(req: Request) {
  const clerkAuth = await auth();
  const { userId } = clerkAuth;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const progress = await db
      .select()
      .from(userProblemStatusTable)
      .where(eq(userProblemStatusTable.userId, userId));

    // Map each record to a boolean (0 becomes false, non-zero becomes true)
    const progressMap: Record<number, boolean> = {};
    progress.forEach((record) => {
      progressMap[record.problemId] = Boolean(record.completed);
    });

    return NextResponse.json(progressMap);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
    const clerkAuth = await auth();
    const { userId } = clerkAuth;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const { problemId, completed } = await req.json();
  
    try {
      if (completed) {
        // If the question is marked complete, insert or update the record.
        await db
          .insert(userProblemStatusTable)
          .values({
            userId,
            problemId,
            completed, // boolean value as expected
          })
          .onConflictDoUpdate({
            target: [userProblemStatusTable.userId, userProblemStatusTable.problemId],
            set: { completed },
          });
      } else {
        // If the question is unchecked, delete the record from the DB.
        await db
          .delete(userProblemStatusTable)
          .where(
            and(
              eq(userProblemStatusTable.userId, userId),
              eq(userProblemStatusTable.problemId, problemId)
            )
          );
      }
  
      return NextResponse.json({ success: true });
    } catch (error: any) {
      console.error("Error in POST /api/updateStatus", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  
  
