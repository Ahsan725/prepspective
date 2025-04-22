// app/api/updateStatus/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db"; // your Turso database client
import { userProblemStatusTable } from "@/db/schema";
import { eq, and } from "drizzle-orm/expressions";
import { createHash } from "crypto";

export async function GET(req: Request) {
  const clerkAuth = await auth();
  const userId = clerkAuth.userId;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1) fetch all progress rows
    const rows = await db
      .select()
      .from(userProblemStatusTable)
      .where(eq(userProblemStatusTable.userId, userId));

    // 2) build a map { problemId: { completed, lastCompleted } }
    const progressMap: Record<number, { completed: boolean; lastCompleted: string | null }> = {};
    for (const r of rows) {
      progressMap[r.problemId] = {
        completed: Boolean(r.completed),
        lastCompleted: r.lastCompleted ?? null,
      };
    }

    // 3) compute an ETag by hashing the JSON
    const payload = JSON.stringify(progressMap);
    const etag = createHash("sha1").update(payload).digest("hex");

    // 4) if client sent the same ETag, no need to resend
    const ifNone = req.headers.get("if-none-match");
    if (ifNone === etag) {
      return new NextResponse(null, { status: 304 });
    }

    // 5) otherwise, return data + the new ETag
    return NextResponse.json(progressMap, {
      status: 200,
      headers: {
        "ETag": etag,
        // optionally: "Cache-Control": "private, max-age=0, must-revalidate"
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const clerkAuth = await auth();
  const userId = clerkAuth.userId;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { problemId, completed } = await req.json();

  try {
    if (completed) {
      // mark complete or update timestamp
      await db
        .insert(userProblemStatusTable)
        .values({
          userId,
          problemId,
          completed,
          lastCompleted: new Date().toISOString(),
        })
        .onConflictDoUpdate({
          target: [userProblemStatusTable.userId, userProblemStatusTable.problemId],
          set: {
            completed,
            lastCompleted: new Date().toISOString(),
          },
        });
    } else {
      // uncheck → delete row
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
