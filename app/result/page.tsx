import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ResultPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  const link = (await searchParams?.link) as string | undefined;
  const date = (await searchParams?.date) as string | undefined;
  const time = (await searchParams?.time) as string | undefined;

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
      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Your Mock Interview Details</h1>
        <p className="mb-4">Here is your Mock Interview link:</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-blue-500 hover:underline break-all"
        >
          {link}
        </a>

        {date && time && (
          <p className="mt-4 text-gray-700 text-lg">
            <strong>Scheduled Date:</strong> {date}
            <br />
            <strong>Scheduled Time:</strong> {time}
          </p>
        )}

        <p className="mt-4 text-sm text-gray-600">
          Please join the session <strong>5 minutes before the scheduled time</strong> to ensure everything is set up correctly. Log in to Jitsi using your Google account or create an account if you are prompted.
        </p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">How to Get the Best Out of Your Mock Interview</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Take it seriously:</strong> Treat this as if it is a real technical interview.</li>
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
        </ul>
      </section>

      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">How the Pairing Works</h2>
        <p className="text-gray-700">
          Our goal is to match you with a <strong>mentor</strong> who has experience interviewing at top tech
          companies. However, if there is a shortage of mentors, you will be paired with a <strong>peer</strong>. A
          peer is someone with roughly the same level of experience in interviewing as you.
        </p>
        <p className="mt-2 text-gray-700">
          Regardless of who you are paired with, this is an excellent opportunity to improve your interviewing
          skills, gain feedback, and grow as a candidate.
        </p>
      </section>

      <div className="text-center">
        <Link href="/mock">
          <Button>Generate Another Link</Button>
        </Link>
      </div>
    </main>
  );
}
