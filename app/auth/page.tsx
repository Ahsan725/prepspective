'use client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};

const logoVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, delay: 0.1 },
  },
};

export default function AuthPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white px-4 pt-12">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="mb-4 text-center" variants={logoVariants}>
          <span className="text-4xl font-extrabold text-indigo-700">
            {'{P}rep'}
            <span className="font-bold text-indigo-700">Spective</span>
          </span>
        </motion.div>

        <motion.div
          className="flex items-center justify-center mb-4"
          variants={itemVariants}
        >
          <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
            AUTHENTICATION
          </h2>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-4xl text-center font-bold mb-4"
          variants={itemVariants}
        >
          Welcome Back
        </motion.h2>

        <motion.h3
          className="mx-auto text-center font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 mb-0 pb-0"
          variants={itemVariants}
        >
          Join or sign in to unlock personalized interview preparation, insights, and expert guidance.
        </motion.h3>

        <Card className="border-none shadow-none mt-0 pt-0">
          <CardHeader className="text-center space-y-1">
            {/* <CardTitle className="text-2xl">Welcome back</CardTitle> */}
            <CardDescription>
              Please sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <motion.div variants={itemVariants}>
              <Button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => router.push('/signin')}
              >
                Sign In
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                variant="outline"
                className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
                onClick={() => router.push('/signup')}
              >
                Sign Up
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}