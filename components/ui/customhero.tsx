'use client'; // Add this directive at the very top

import { useState, useEffect } from 'react';
import { ArrowBigRight} from 'lucide-react';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import NumberTicker from "@/components/ui/number-ticker";

const CustomHero = () => {
  const [email, setEmail] = useState('');
  const [count, setCount] = useState(0);
  const { toast } = useToast();
  const [showMessage, setShowMessage] = useState(true);

  const handleEscapePress = () => {
    console.log("Escape key behavior triggered!");
    setShowMessage(false);
  };

  useEffect(() => {
    // Fetch the count of waitlist members
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

    // Check if the user is on a mobile device
    const isOnMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isOnMobile) {
      setShowMessage(false); // Hide the message immediately on mobile
      return;
    }

    // // Set up a timer to hide the message after 15 seconds
    // const timer = setTimeout(() => {
    //   setShowMessage(false);
    // }, 15000);

    // Set up an event listener to hide the message on keypress
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleEscapePress();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the timer and event listener
    // return () => {
    //   clearTimeout(timer);
    //   window.removeEventListener('keydown', handleKeyDown);
    // };
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

  // // Mimic the behavior of pressing the "Escape" key
  // const handleEscapeButtonClick = () => {
  //   const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
  //   window.dispatchEvent(escapeEvent);
  // };

  return (
    <section className="flex items-start justify-center mt-12 mb-40">
      <div className="flex flex-col items-center text-center w-full max-w-4xl px-6 py-12">
        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold lg:text-6xl bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-400 text-transparent bg-clip-text">
            <span className="text-5xl font-extrabold lg:text-6xl bg-gradient-to-b from-indigo-800 via-indigo-700 to-indigo-400 text-transparent bg-clip-text">{"{P}rep"}</span>Spective
          </h1>

          {/* {showMessage && (
            <div id="test-message" className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-indigo-100 px-4 py-2 rounded-md shadow-xl z-50">
              <p className='text-sm text-indigo-700'>Press Escape to start using the website!</p> 
            </div> 
          )} */}
<p className=" font-light text-gray-500 mt-10 text-2xl lg:text-4xl mb-16">
            Share Your Interview Story, Learn from Others, and Get Ready to Ace any Interview.
          </p>
          <h2 className="inline-block tracking-tight leading-none mt-4 text-xs font-medium lg:text-md border-2 border-indigo-700 text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full">
  THE <span className="font-bold">BEST</span> INTERVIEW PREP PLATFORM IN THE WORLD!
</h2>


          

          {/* Button to Mimic Escape Key */}
          {/* <Button
            onClick={handleEscapeButtonClick}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
          >
            Disable Fancy Cursor <MousePointerClick />
          </Button> */}
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
    </section>
  );
};

export default CustomHero;
