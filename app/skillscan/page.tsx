// app/(your-route)/quiz/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import QuizClient from "./clientPage";

export default async function QuizPageWrapper() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/signin?redirect_url=/skillscan");
  }

  return <QuizClient />;
}
