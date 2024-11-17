'use client';

import { useState, useEffect } from 'react';
import { Star, ArrowBigRight } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Hero7 = () => {
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch the current waitlist count on component load
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
        setMessage('Great! You have joined the waitlist!');
        setCount(data.count);
        setEmail('');
      } else {
        setMessage(data.error || 'Failed to add email.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-300 to-purple-100">
      <div className="text-center flex flex-col items-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1 className="text-6xl font-extrabold lg:text-6xl">PrepSpective</h1>
          <h2 className="text-3xl lg:text-5xl">The number one interview prep app in the world!</h2>
          <p className="text-balance lg:text-xl">
            Share Your Interview Story, Learn from Others, and Get Ready to Ace any Interview.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 lg:mt-8 flex flex-col sm:items-center gap-4 sm:flex-row sm:gap-3">
          <div className="w-6xl max-w-6xl sm:max-w-lg lg:w-auto">
            <Label className="sr-only">Email</Label>
            <Input
              placeholder="steve@jobs.com"
              type="email"
              className="w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            Join the Waitlist <ArrowBigRight size={24} color="slate" fill="white" />
          </Button>
        </form>

        {message && <p className="mt-4 text-lg text-green-700">{message}</p>}
        <p className="mt-2 text-lg">
          <span className="font-bold">{count}</span> people have already joined the waitlist!
        </p>

        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-1.webp"
                alt="Placeholder Avatar 1"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-2.webp"
                alt="Placeholder Avatar 2"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-3.webp"
                alt="Placeholder Avatar 3"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-4.webp"
                alt="Placeholder Avatar 4"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-5.webp"
                alt="Placeholder Avatar 5"
              />
            </Avatar>
          </span>
          <div>
            <div className="flex items-center gap-1">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">5.0</span>
            </div>
            <p className="text-left font-medium text-muted-foreground">
              from 200+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero7;
