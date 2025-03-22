import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

const services: Service[] = [
  {
    title: "Resume Writing",
    description: "Get your ATS-optimized resume crafted by experts. Stand out from the competition with our proven templates.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    link: "/resume"
  },
  {
    title: "LeetCode Tutoring",
    description: "Master coding interviews with personalized 1-on-1 tutoring sessions. Learn problem-solving strategies that work.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    link: "/tutor"
  },
  {
    title: "Web Dev Services",
    description: "Launch your dream project with expert web development. From idea to deployment — we’ll build it with you.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    link: "/webdev"
  },
  {
    title: "Mock Interviews",
    description: "Practice makes perfect. Get real interview experience with detailed feedback and improvement strategies.",
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    link: "/mock-interviews"
  }
];

export default function ServiceShowcaseSection() {
  const [currentService, setCurrentService] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentService((prev) => (prev + 1) % services.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const service = services[currentService];

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
  };

  const changeService = (newIndex: number) => {
    setDirection(newIndex > currentService ? 1 : -1);
    setCurrentService(newIndex);
  };

  return (
    <section className="relative w-full max-w-[99%] mx-auto font-['Segoe UI'] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] mb-0">
      <div className="absolute inset-0 bg-gradient-to-l from-indigo-800 via-indigo-600 to-indigo-800 z-0 rounded-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,transparent_0%,rgba(0,0,0,0.2)_100%)] rounded-3xl" />
          </div>
          <div className="absolute top-5 left-5 z-50">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-indigo-50 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                {"{P}rep"}
                <span className="font-bold text-indigo-50 text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                  Spective
                </span>
              </span>
            </div>
          </div>

      <div className="relative z-10 px-6 py-20 text-center flex flex-col items-center justify-center space-y-10">
        <h3 className="text-indigo-200 text-5xl sm:text-6xl font-extrabold tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]">
          Struggling to land roles?
        </h3>
        <p className="uppercase tracking-widest text-sm font-semibold text-white/60">
          Trusted by 400+ Developers
        </p>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentService}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            className="space-y-6 max-w-2xl"
          >
            <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-[0_2px_6px_rgba(255,255,255,0.1)]">
              {service.title}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              {service.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = service.link}
              className="group relative px-10 py-4 bg-white rounded-xl text-gray-900 font-semibold text-lg shadow-lg hover:shadow-white/10 transition-all duration-300 overflow-hidden border border-white"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            <motion.div
  className="flex items-center justify-center space-x-1 text-yellow-400 text-2xl font-bold pt-4"
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
>
  {[...Array(5)].map((_, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
    </motion.div>
  ))}
  <motion.span
    className="ml-2"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9, duration: 0.4 }}
  >
    4.9/5
  </motion.span>
</motion.div>

          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-30">
          {services.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => changeService(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentService ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
