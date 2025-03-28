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

// Animation variants
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

const Index = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white px-4 pt-16">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="mb-6 text-center" variants={logoVariants}>
          <span className="text-4xl font-extrabold text-indigo-700">
            {'{P}rep'}
            <span className="font-bold text-indigo-700">Spective</span>
          </span>
        </motion.div>

        <Card className="border-none shadow-none">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
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
};

export default Index;
