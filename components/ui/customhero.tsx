'use client';

import { useState, useEffect } from 'react';
import { ArrowBigRight } from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import NumberTicker from '@/components/ui/number-ticker';
import Glow from '@/components/ui/glow';

const CustomHero = () => {
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist-count', { method: 'GET' });
        const data = await response.json();
        if (response.ok) {
          setCount(data.count || 0);
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error);
      }
    };

    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setCount(data.count);
        setEmail('');
        toast({
          title: `Success, You're in!`,
          description: `The cool kids are waiting for you. Don’t go too far, we’ll be in touch soon.`,
        });
      } else {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: `We’re not saying it’s wrong, but the system is squinting.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <section className="group relative overflow-hidden mt-12 mb-40">
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:gap-8 px-6 py-12">
        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold lg:text-6xl bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-400 text-transparent bg-clip-text">
            <span className="text-5xl font-extrabold lg:text-6xl bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-400 text-transparent bg-clip-text">
              {"{P}rep"}
            </span>
            Spective
          </h1>
          <p className="font-light text-gray-500 mt-10 text-2xl lg:text-4xl mb-16">
            Share Your Interview Story, Learn from Others, and Get Ready to Ace any Interview.
          </p>
          <h2 className="inline-block tracking-tight leading-none mt-4 text-xs font-medium lg:text-md border-2 border-indigo-700 text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full">
            THE <span className="font-bold">BEST</span> INTERVIEW PREP PLATFORM IN THE WORLD!
          </h2>
        </div>

        {/* Waitlist Count */}
        <p className="whitespace-pre-wrap tracking-tighter">
          <NumberTicker value={count + 1003} className="text-xl text-indigo-600 font-extrabold" /> people have already joined the waitlist!
        </p>

        {/* Waitlist Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:gap-3 z-30"
        >
          <div className="w-full sm:w-auto">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              placeholder="steve@jobs.com"
              type="email"
              className="w-full sm:w-[400px] h-10 text-center placeholder:text-center shadow-lg border-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            Join the Waitlist <ArrowBigRight size={24} fill="white" />
          </Button>
        </form>
      </div>
      
      {/* Glowing Effect */}
      <div className="absolute left-0 top-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </section>
  );
};

export default CustomHero;
