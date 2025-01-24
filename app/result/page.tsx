import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function ResultPage(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  // Explicitly await searchParams if it requires asynchronous resolution
  const link = (await searchParams?.link) as string | undefined;

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
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Jitsi Link</h1>
      <p className="mb-4">Here is your randomly generated Jitsi link:</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline break-all"
      >
        {link}
      </a>
      <div className="mt-4">
        <Link href="/mock">
          <Button>Generate Another Link</Button>
        </Link>
      </div>
    </main>
  );
}
