'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import NumberTicker from './number-ticker'
import Image from 'next/image'
import FluidCursor from "@/components/ui/fluidCursor"
import styles from '@/components/modern-hero.module.css'
import { motion } from 'framer-motion'

export default function ModernHero() {
  const [email, setEmail] = useState('')
  const [count, setCount] = useState(0)
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

  const clients = [
    { name: 'Google', src: '/google.png' },
    { name: 'Amazon', src: '/amazon.png' },
    { name: 'American Express', src: '/amex.png' },
    { name: 'Apple', src: '/apple.png' },
    { name: 'Datadog', src: '/datadog.png' },
    { name: 'Discord', src: '/discord.png' },
    { name: 'Figma', src: '/figma.png' },
    { name: 'LinkedIn', src: '/linkedin.png' },
    { name: 'Lyft', src: '/lyft.png' },
    { name: 'Meta', src: '/meta.png' },
    { name: 'Microsoft', src: '/microsoft.png' },
    { name: 'Netflix', src: '/netflix.png' },
    { name: 'Salesforce', src: '/salesforce.png' },
    { name: 'Spotify', src: '/spotify.png' },
    { name: 'TikTok', src: '/tiktok.png' },
    { name: 'Uber', src: '/uber.png' },
  ]

  return (
    <>
      {/* Main Hero Section */}
      <section className="relative overflow-hidden mb-[78px] bg-white py-16 sm:py-24">
        <FluidCursor />
        {/* Animated Background Grid Pattern */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Hero Content */}
        <div className="relative container px-4 mx-auto">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            {/* Animated Stats Card */}
            <motion.div
              className="bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 inline-flex items-center gap-2 mx-auto border-2 border-indigo-500"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs lg:text-sm font-bold text-indigo-600 uppercase tracking-wide">
                THE BEST INTERVIEW PREP PLATFORM IN THE WORLD!
              </p>
            </motion.div>

            {/* Animated Main Content */}
            <div className="space-y-4">
              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-indigo-800 via-indigo-600 to-purple-700 bg-clip-text text-transparent"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Your Competitive Advantage in Tech Interviews.
              </motion.h1>
              <motion.p
                className="text-lg lg:text-2xl text-gray-500 max-w-2xl mx-auto"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                The only interview prep platform you&rsquo;ll ever need. We&rsquo;re not saying it&rsquo;s magic, but it&rsquo;s <em>pretty</em> close.
              </motion.p>
            </div>

            {/* Animated Waitlist Form */}
            <motion.div
              className="w-full max-w-md space-y-4 mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
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
                Join <NumberTicker value={count + 287} className="font-extrabold text-indigo-700" /> others on the waitlist
              </p>
            </motion.div>

            {/* Animated Client Logos */}
            <motion.div
              className="mt-12 w-full max-w-3xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-sm text-gray-500 mb-4 text-center">Interviews Sourced from Top Companies</p>
              <div className={styles.marqueeContainer}>
                <div className={styles.marquee}>
                  <div className={styles.marqueeContent}>
                    {clients.map((client, index) => (
                      <motion.div
                        key={`${client.name}-${index}`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Image
                          src={client.src}
                          alt={client.name}
                          width={80}
                          height={32}
                          style={{ 
                            width: 'auto', 
                            height: '32px', 
                            objectFit: 'contain',
                            flexShrink: 0
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className={styles.marqueeContent}>
                    {clients.map((client, index) => (
                      <motion.div
                        key={`${client.name}-${index}-duplicate`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Image
                          src={client.src}
                          alt={client.name}
                          width={80}
                          height={32}
                          style={{ 
                            width: 'auto', 
                            height: '32px', 
                            objectFit: 'contain',
                            flexShrink: 0
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

