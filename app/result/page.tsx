import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RandomLeetCodeQuestion } from "./randomLeetcode"; 

export default async function ResultPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  const link = (await searchParams?.link) as string | undefined;
  const dateRaw = (await searchParams?.date) as string | undefined || "Not provided";
  const timeRaw = (await searchParams?.time) as string | undefined || "Not provided";

  // Convert date to spelled-out format
  const formattedDate = dateRaw !== "Not provided" ? 
    new Date(dateRaw).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }) : "Not provided";

  // Convert time to 12-hour format with AM/PM
  const formattedTime = timeRaw !== "Not provided" ? 
    new Date(`1970-01-01T${timeRaw}Z`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }) : "Not provided";

  if (!link) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>No link was generated. Please try again.</p>
        <Link href="/mock">
          <Button className="mt-4">Go Back</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 space-y-6">
      <section className="bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-4xl font-bold mb-6 text-indigo-700">Your Mock Interview Details</h1>
        <p className="mb-6 text-md">Click below to join your Mock Interview:</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="text-md px-6 py-3">Join Mock Interview</Button>
        </a>

        {formattedDate && formattedTime && (
          <p className="mt-6 text-gray-700 text-lg">
            <strong>Scheduled Date:</strong> {formattedDate}
            <br />
            <strong>Scheduled Time:</strong> {formattedTime}
          </p>
              )}
              <RandomLeetCodeQuestion />

        <p className="mt-6 text-md text-gray-600">
          Please join the session <strong>5 minutes before the scheduled time</strong> to ensure everything is set up correctly. Log in to our meeting provider using your Google account or create an account if you are prompted.
        </p>
      </section>

      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <section className="bg-indigo-50 p-6 rounded-lg shadow-md flex-1">
          <h2 className="text-xl text-gray-400 font-bold mb-4">How to Get the Best Out of Your Mock Interview</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
            <li><strong>Take it seriously.</strong> Treat this as if it is a real technical interview.</li>
            <li>
              If you are matched with a <strong>peer</strong>, take turns interviewing each other. Decide who goes
              first, and make sure to take notes to provide <strong>grows and glows</strong> feedback.
            </li>
            <li>
              If you are matched with a <strong>mentor</strong>, they will interview you and provide detailed feedback
              after the session.
            </li>
            <li>
              Use a question from <strong>LeetCode</strong>, share your screen, and write code in the LeetCode IDE to
              simulate a real interview environment.
            </li>
            <li>
              Focus on explaining your thought process clearly. Communication is as important as solving the problem.
            </li>
            <li>Take detailed feedback from your peer or mentor and work on areas of improvement.</li>
            <li>
              <strong>Set specific goals:</strong> Before the session, decide on one or two specific skills you want to
              improve, such as debugging, problem breakdown, or time management.
            </li>
            <li>
              <strong>Repeat regularly:</strong> We recommend doing a mock interview every week to keep your skills fresh. If
              you have an upcoming interview, aim to do one daily to build confidence.
            </li>
          </ul>
        </section>

        <section className="bg-indigo-50 p-6 rounded-lg shadow-md flex-1">
          <h2 className="text-xl text-gray-400 font-bold mb-4">How the Pairing Works</h2>
          <p className="text-gray-700 text-sm">
            Our goal is to match you with a <strong>mentor</strong> who has experience interviewing at top tech
            companies. However, if there is a shortage of mentors, you will be paired with a <strong>peer</strong>. A
            peer is someone with roughly the same level of experience in interviewing as you.
          </p>
          <p className="mt-2 text-gray-700 text-sm">
            Regardless of who you are paired with, this is an excellent opportunity to improve your interviewing
            skills, gain feedback, and grow as a candidate.
          </p>
        </section>
      </div>

      <div className="text-center">
        <Link href="/mock">
          <Button variant="outline">Generate Another Link</Button>
        </Link>
      </div>
    </main>
  );
}
