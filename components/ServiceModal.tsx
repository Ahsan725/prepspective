import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogClose } from '../components/ui/dialog';
import { X, ArrowRight, Star } from 'lucide-react';

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

export function ServiceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentService, setCurrentService] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
  
      const isInBottom25Percent = scrollPosition > pageHeight * 0.75;
  
      if (!isInBottom25Percent) {
        setIsOpen(true);
      }
    }, 30000);
  
    return () => clearTimeout(timer);
  }, []);
  

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentService((prev) => (prev + 1) % services.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] max-w-[1000px] w-[95vw] bg-transparent rounded-3xl border-none">
        <DialogClose className="absolute right-6 top-6 z-50">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white/10 p-3 backdrop-blur-md border border-white/20 cursor-pointer"
          >
            <X className="h-6 w-6 text-white" />
          </motion.div>
        </DialogClose>

        <div className="relative w-full" style={{ minHeight: '600px' }}>
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-l from-indigo-800 via-indigo-600 to-indigo-800 z-0 rounded-3xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,transparent_0%,rgba(0,0,0,0.5)_100%)] rounded-3xl" />
          </div>

          {/* Smaller Logo */}
          <div className="absolute top-5 left-5 z-50">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-indigo-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                {"{P}rep"}
                <span className="font-bold text-indigo-300 text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                  Spective
                </span>
              </span>
            </div>
          </div>

          {/* Content Slides */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentService}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="relative z-20 h-full flex flex-col items-center justify-center px-10 py-16 text-center space-y-8"
            >
              {/* Big Headline */}
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]"
              >
                Struggling to land roles?
              </motion.h3>

              {/* Trust tag */}
              <p className="uppercase tracking-widest text-sm font-semibold text-white/60">
                Trusted by 1,200+ Developers
              </p>

              {/* Service Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 max-w-2xl"
              >
                <h2 className="text-3xl font-bold text-white leading-tight drop-shadow-[0_2px_6px_rgba(255,255,255,0.1)]">
                  {service.title}
                </h2>
                <p className="text-lg text-white/90 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = service.link}
                  className="group relative px-10 py-4 bg-white rounded-xl text-gray-900 font-semibold text-lg shadow-lg
                    hover:shadow-white/40 transition-all duration-300 overflow-hidden border border-white"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.div>

              {/* Enhanced Rating */}
              <div className="flex items-center justify-center space-x-1 text-yellow-400 text-xl font-bold pt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2">4.9/5</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
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
      </DialogContent>
    </Dialog>
  );
}
