'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, X, ArrowRight } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import NumberTicker from './number-ticker'
import Link from 'next/link'
import Image from 'next/image';

export default function ModernHero() {
  const [email, setEmail] = useState('')
  const [count, setCount] = useState(0)
  const [showBanner, setShowBanner] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch('/api/waitlist-count', { method: 'GET' })
        const data = await response.json()
        if (response.ok) {
          setCount(data.count || 0)
        }
      } catch (error) {
        console.error('Failed to fetch waitlist count:', error)
      }
    }

    fetchCount()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (response.ok) {
        setCount(data.count)
        setEmail('')
        toast({
          title: `Success, You're in!`,
          description: `The cool kids are waiting for you. Don't go too far, we'll be in touch soon.`,
        })
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: `We're not saying it's wrong, but the system is squinting.`,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
      })
    }
  }

  return (
    <>
      {/* Top Banner */}
      {/* {showBanner && (
        <div className="relative bg-indigo-50 px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-x-3">
            <span className="text-sm font-medium">
              🎉 Big news, we will be launching soon!{' '}
              <Link href="#" className="inline-flex items-center font-semibold text-indigo-600 hover:text-indigo-500">
                Learn More <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-500"
            onClick={() => setShowBanner(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
      )} */}

      {/* Main Hero Section */}
      <section className="relative overflow-hidden bg-white h-screen flex items-start justify-center pt-16">
  {/* Background Grid Pattern */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

  {/* Hero Content */}
  <div className="relative container px-4 space-y-8 text-center">
    {/* Stats Card */}
    <div className="bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 inline-flex items-center gap-2 mx-auto">
      <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
        THE BEST INTERVIEW PREP PLATFORM IN THE WORLD!
      </p>
    </div>

    {/* Main Content */}
    <div className="space-y-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-b from-indigo-800 via-indigo-400 to-purple-700 bg-clip-text text-transparent">
        Learn from Others & Get Ready to Ace any Interview.
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover the ultimate platform to share your journey, gain invaluable insights from others to confidently conquer every interview.
      </p>
    </div>

    {/* Waitlist Form */}
    <div className="w-full max-w-md space-y-4 mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-12 px-4 text-base border-2 border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <Button type="submit" size="lg" className="h-12 bg-indigo-600 hover:bg-indigo-700 text-white">
          Join Waitlist
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
      <p className="text-md text-indigo-700">
        Join <NumberTicker value={count + 217} className="font-extrabold text-indigo-700" /> others on the waitlist
      </p>
    </div>

    {/* Client Logos */}
    <div className="mt-16 w-full">
      <p className="text-sm text-gray-500 mb-4">Interviews from Top Companies</p>
      <div className="flex justify-center items-center space-x-4">
        {[
          { name: 'Discord', src: '/a.png' },
          { name: 'Monday', src: '/b.png' },
          { name: 'NCR', src: '/c.png' },
          { name: 'Vice', src: '/d.png' },
          { name: 'Dropbox', src: '/e.png' },
          { name: 'Rakuten', src: '/f.png' },
          { name: 'Extra1', src: '/g.png' },
          { name: 'Extra2', src: '/h.png' },
          { name: 'Extra3', src: '/i.png' },
        ].map((client) => (
          <Image
            key={client.name}
            src={client.src}
            alt={client.name}
            width={80}
            height={40}
            className="object-contain h-8"
          />
        ))}
      </div>
    </div>
  </div>
</section>


    </>
  )
}

