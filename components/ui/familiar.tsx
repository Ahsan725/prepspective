'use client';

import { useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const testimonials = [
  {
    id: 'testimonial-1',
    heading: '',
    text: 'You finally land an interview at your dream company, but panic sets in—what do they even ask? Suddenly, you’re neck-deep in Reddit threads, wading through sass, memes, and two-year-old "vague experiences" that might as well be bedtime stories. By the time you’ve pieced together what might happen, you’ve lost precious prep time.',
  },
  {
    id: 'testimonial-2',
    heading: '',
    text: 'You’re searching for "Software Engineer Intern interviews" on Glassdoor and end up reading about marketing intern interviews for that company. The only takeaway? The office has free coffee. PrepSpective? No irrelevant roles, no clutter—just the exact information you need to crush your interview.',
  },
  {
    id: 'testimonial-3',
    heading: '',
    text: 'You’ve shelled out for LeetCode Premium to unlock “company-specific” questions, only to discover inaccurate and outdated tags. Not to mention not everyone is fortunate enough to have money to spend on false promises. PrepSpective solves this with reliable, community-driven insights that keep you focused on what actually matters.',
  },
  {
    id: 'testimonial-4',
    heading: '',
    text: 'You finish your interview, unsure if you crushed it or bombed it. Weeks go by with no callback. Did they love your problem-solving skills or hate your edge-case explanation? With PrepSpective, read real experiences so you’ll know what’s the normal timeline to hear back and what’s worth stressing over.',
  },
  {
    id: 'testimonial-5',
    heading: '',
    text: 'You ace your first question, explaining every detail, only to realize you’ve got five minutes left for the second. Turns out, the expectation was solving two questions to pass. Ouch. PrepSpective prepares you for interview formats and pacing by sharing the interview format and pattern.',
  },
  {
    id: 'testimonial-6',
    heading: '',
    text: 'Most prep platforms offer cookie-cutter advice: “Just practice more!” But how do you practice for an interview round you did not know was part of the hiring process. PrepSpective ensures you know exactly what to prep for, no generic advice required.',
  },
  {
    id: 'testimonial-7',
    heading: '',
    text: 'Sure, Glassdoor and Reddit are “free,” but the hours you’ll waste sorting through junk content? And don’t even get us started on LeetCode Premium draining your wallet. PrepSpective? 100% free, with high-quality, organized content made by people who walked so you could run.',
  },
];

const Testimonial14 = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', updateCurrent);
    return () => {
      api.off('select', updateCurrent);
    };
  }, [api]);

  return (
    <section className="py-16 mx-8 bg-gray-50">
          {/* Heading */}
          <div className="flex items-center justify-center mb-4">
        <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
          MOTIVATION
        </h2>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Does This Sound familiar...
        </h2>
        <p className="md:w-1/2 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          
        </p>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto text-center relative">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="flex flex-col items-center text-center px-4">
                    <h3 className="text-2xl font-medium text-gray-600 mb-4">
                      {testimonial.heading}
                    </h3>
                          <p className="mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-lg dark:text-gray-400">
                          <svg className="w-8 h-8 text-indigo-700 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
                      {testimonial.text}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="hidden lg:flex text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              aria-label="Previous Slide"
            />
            <CarouselNext
              className="hidden lg:flex text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              aria-label="Next Slide"
            />
          </Carousel>
          <div className="flex justify-center py-1 gap-x-6">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                className={`w-3 h-3 rounded-full ${
                  index === current ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial14;
