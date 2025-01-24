import { JitsiForm } from "./jitsi-form";

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
          MOCK INTERVIEWS
        </h2>
      </div>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Book your Interview
      </h2>
      
      <h3 className="md:w-1/2 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        Practice makes perfect.  With PrepSpective, you can identify your strengths, work on areas of improvement, and step into your next interview with confidence. Remember, the more you prepare, the closer you get to success.
      </h3>

      <JitsiForm />
    </main>
  );
}
