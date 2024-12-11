import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Preview() {
  return (
    <section
      className="flex w-full items-start justify-center bg-[url('https://tailframes.com/images/squares-bg.webp')] bg-cover bg-center bg-no-repeat overflow-hidden mb-16 mt-0"
    >
      <div
        className="flex max-w-screen-2xl grow flex-col lg:items-start lg:justify-start justify-center gap-12 px-3 py-12 md:pt-24 lg:px-0 xl:flex-row"
      >
        <div className="sm:pl-8 lg:pl-16 xl:pl-32 mb-0 flex flex-1 flex-col items-center lg:items-start gap-12 px-0 xl:mb-24">
          <Badge variant="outline">
          <span className="text-2xl font-extrabold text-indigo-700">
                {"{P}rep"}<span className="font-bold text-indigo-700 text-2xl">Spective</span> 
              </span>
          </Badge>
          <div className="flex max-w-lg flex-col gap-6">
            <h3 className="text-2xl font-semibold text-slate-950 md:text-4xl text-center lg:text-left">
            What If You Could Predict Your Next Interview?
            </h3>
            <p className="text-lg font-normal leading-7 text-slate-500 text-center lg:text-left">
            Discover what separates the good from the great. Dive into exclusive insights, unfiltered experiences, and game-changing tips to crush your next interview.
            </p>
          </div>
          <div className="flex gap-4 justify-center lg:justify-start items-center w-full">
            <Button size="sm">
              Get Started
            </Button>
            <Button size="sm" variant="default">
              Sign Up
            </Button>
          </div>
        </div>
        <div
          className="relative flex flex-1 flex-col drop-shadow-2xl lg:px-16 xl:translate-x-1/5 xl:translate-y-1/3 xl:scale-[1.75] xl:px-0 min-[1440px]:translate-x-[10%] min-[1440px]:translate-y-1/4 2xl:translate-x-[5%] 2xl:translate-y-1/4 2xl:scale-[1.5] min-[1900px]:translate-x-[0%] min-[1900px]:translate-y-[15%] min-[1900px]:scale-[1.4]"
        >
          <img
            src="/mockup.svg"
            role="presentation"
            alt=""
            width={0}
            height={0}
            sizes="100vw"
            className="w-full object-cover xl:absolute xl:inset-0 xl:h-auto"
          />
        </div>
      </div>
    </section>
  );
};
