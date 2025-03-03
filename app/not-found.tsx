import Link from "next/link";
import { Button } from "@/components/ui/button"; // Ensure you have shadcn button component

export default function NotFound() {
  return (
    <div className="flex flex-col items-center mt-16 bg-white text-center px-6">
      <h1 className="text-8xl font-extrabold text-indigo-700">404</h1>
      <p className="text-3xl mt-4 text-gray-800 font-semibold">Oops! This page disappeared into the void.</p>
      <p className="mt-2 text-lg text-gray-500">
        Either it never existed, got lost, or I forgot to build it. We will pretend this was intentional.
      </p>

      <Button asChild className="mt-6 bg-indigo-700 hover:bg-indigo-800 text-white">
        <Link href="/">Take Me Home</Link>
      </Button>
    </div>
  );
}
