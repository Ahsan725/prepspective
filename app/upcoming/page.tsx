'use client';

import { Icon } from "@/components/ui/icon";
import { icons } from 'lucide-react';
import CardHoverEffect from "@/components/ui/card-hover-effect";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
    {
      icon: "Brain",
      title: "AI-Powered Interview Practice",
      description: "Engage with an AI-driven interview simulator to practice technical and behavioral questions tailored to your target roles.",
    },
    {
      icon: "Briefcase",
      title: "Real-Time Job Aggregator",
      description: "Discover jobs posted within the last hour to maximize your chances of landing an interview before the competition.",
    },
    {
      icon: "Mic",
      title: "Mock Interview Sessions",
      description: "Participate in realistic mock interviews with peers or mentors to gain confidence and identify areas for improvement.",
    },
    {
      icon: "List",
      title: "Company-Specific LeetCode Practice Lists",
      description: "Access curated question lists tailored to the technical expectations of top tech companies, helping you focus your preparation.",
    },
    {
      icon: "Book",
      title: "Comprehensive Interview Guides",
      description: "Learn step-by-step processes for succeeding in interviews, from application tips to final-round preparations for top companies.",
    },
    {
      icon: "FileText",
      title: "ATS-Optimized Resume Templates",
      description: "Use professionally designed resume templates that are tested to pass Applicant Tracking Systems (ATS) and grab recruiters’ attention.",
    },
    {
      icon: "TrendingUp",
      title: "Career Growth Roadmaps",
      description: "Explore structured career paths, skill-building plans, and mentorship resources to accelerate your journey to big tech.",
    },
    {
      icon: "MessageCircle",
      title: "Community Q&A and Support",
      description: "Connect with a community of job seekers and industry professionals for advice, tips, and encouragement throughout your job search.",
    },
    {
      icon: "Calendar",
      title: "Personalized Study Plans",
      description: "Receive customized preparation timelines based on your target companies, role, and current skills to stay organized and efficient.",
    },
    {
      icon: "Monitor",
      title: "Practice Tests for CodeSignal and More",
      description: "Boost your online assessment scores by 120-200 points with targeted practice tests designed for platforms like CodeSignal, HackerRank, and others.",
    },    
  ];
  

export default function UpcomingFeatures() {
  return (
<section id="features" className="ml-8 mr-8 py-16 px-0">
  {/* Section Header */}
  <div className="flex items-center justify-center mb-4">
    <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
      UPCOMING FEATURES
    </h2>
  </div>

  <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
  What We&apos;re Building Next
</h2>

<h3 className="md:w-1/2 mx-auto text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
  We&apos;re pushing the boundaries of interview preparation by crafting innovative tools, personalized insights, and community-driven solutions to help you secure your dream role.
</h3>


  <div className="max-w-5xl mx-auto mt-12">
    <CardHoverEffect items={featureList} />
  </div>
</section>

  );
}
