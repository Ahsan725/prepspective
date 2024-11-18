'use client';

import { useState, useEffect } from 'react';
import { Star, ArrowBigRight } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
        const errorMessage = data.error || 'Failed to add email.';
        toast({
          title: "Uh oh! Something went wrong.",
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
    <section className="flex min-h-screen items-start justify-center mt-12">
      <div className="flex flex-col items-center text-center w-full max-w-4xl px-6 py-12">
        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold lg:text-6xl text-indigo-700" ><span className="text-5xl font-extrabold lg:text-6xl text-indigo-700">{"{P}rep"}</span>Spective</h1>
          <h2 className="mt-4 text-2xl font-semibold lg:text-3xl">
            The number one interview prep app in the world!
          </h2>
          <p className="mt-10 text-lg lg:text-xl">
            Share Your Interview Story, Learn from Others, and Get Ready to Ace any Interview.
          </p>
        </div>

        {/* Waitlist Count */}
        <p className="mt-2 text-md">
          <span className="font-bold text-indigo-600">{count + 1003}</span> people have already joined the waitlist!
        </p>

        {/* Waitlist Form */}
        <form
  onSubmit={handleSubmit}
  className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:gap-3"
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
    Join the Waitlist <ArrowBigRight size={24}  fill='white'/>
  </Button>
</form>

      </div>
    </section>
  );
};

export default CustomHero;
