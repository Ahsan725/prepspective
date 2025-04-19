"use client";

import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FluidCursor from "@/components/ui/fluidCursor";
import styles from "@/components/modern-hero.module.css";
import { motion } from "framer-motion";
import { ServiceModal } from "@/components/ServiceModal";

export default function ModernHero() {
  const { isSignedIn } = useUser();

  const clients = [
    { name: "Google", src: "/google.png" },
    { name: "Amazon", src: "/amazon.png" },
    { name: "American Express", src: "/amex.png" },
    { name: "Apple", src: "/apple.png" },
    { name: "Datadog", src: "/datadog.png" },
    { name: "Discord", src: "/discord.png" },
    { name: "Figma", src: "/figma.png" },
    { name: "LinkedIn", src: "/linkedin.png" },
    { name: "Lyft", src: "/lyft.png" },
    { name: "Meta", src: "/meta.png" },
    { name: "Microsoft", src: "/microsoft.png" },
    { name: "Netflix", src: "/netflix.png" },
    { name: "Salesforce", src: "/salesforce.png" },
    { name: "Spotify", src: "/spotify.png" },
    { name: "TikTok", src: "/tiktok.png" },
    { name: "Uber", src: "/uber.png" },
  ];

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
        <ServiceModal />

        {/* Hero Content */}
        <div className="relative container px-4 mx-auto">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            {/* Animated Stats Card */}
            <motion.div
              className="bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 inline-flex items-center gap-2 mx-auto border-2 border-indigo-500"
              initial={{ y: -50, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.1 }}>
              <p className="text-[0.55rem] lg:text-sm font-bold text-indigo-600 tracking-wide">
                Sign-ups are now live. Create your account today to start using PrepSpective.
              </p>
            </motion.div>

            {/* Animated Main Content */}
            <div>
              <motion.h1
                className="text-5xl font-bold tracking-tight md:text-7xl lg:text-9xl bg-gradient-to-b from-indigo-700 via-indigo-400 to-indigo-800 bg-clip-text text-transparent"
                style={{ fontFamily: "Segoe" }}
                initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.2 }}>
                <span className="font-extralight italic">Walk in Ready.</span> <br />
                Walk Out Hired.
              </motion.h1>

              <motion.p
                className="text-lg lg:text-2xl text-gray-500 max-w-2xl mx-auto"
                initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.3 }}>
                The only interview prep platform you&rsquo;ll ever need.
                We&rsquo;re not saying it&rsquo;s magic, but it&rsquo;s <em>pretty</em> close.
              </motion.p>
            </div>

            {/* Conditional Buttons */}
            <motion.div
              className="w-full max-w-md mx-auto"
              initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3 }}>
              {isSignedIn ? (
                <div className="flex justify-center gap-4">
                  <Link href="/ai">
                    <Button size="default" variant="default">Interview Expert</Button>
                  </Link>
                  <Link href="/skillscan">
                    <Button size="default" variant="outline">Technical SkillScan</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex justify-center gap-4">
                  <SignInButton>
                    <Button size="default">Login</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button size="default" variant="outline">Sign Up</Button>
                  </SignUpButton>
                </div>
              )}
            </motion.div>

            {/* Animated Client Logos */}
            <motion.div
              className="mt-12 w-full max-w-3xl mx-auto"
              initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 2, delay: 0 }}>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Our Users have landed offers at Top Companies
              </p>
              <div className={styles.marqueeContainer}>
                <div className={styles.marquee}>
                  <div className={styles.marqueeContent}>
                    {clients.map((client, index) => (
                      <motion.div
                        key={`${client.name}-${index}`}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <Image
                          src={client.src}
                          alt={client.name}
                          width={80}
                          height={32}
                          style={{
                            width: "auto",
                            height: "32px",
                            objectFit: "contain",
                            flexShrink: 0,
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className={styles.marqueeContent}>
                    {clients.map((client, index) => (
                      <motion.div
                        key={`${client.name}-${index}-duplicate`}
                        whileHover={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <Image
                          src={client.src}
                          alt={client.name}
                          width={80}
                          height={32}
                          style={{
                            width: "auto",
                            height: "32px",
                            objectFit: "contain",
                            flexShrink: 0,
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
  );
}
