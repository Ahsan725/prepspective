import CustomHero from '@/components/ui/customhero';
import FAQSection from '@/components/ui/customfaq';
import { FeaturesSection } from "@/components/ui/customfeature2";
import Familiar from "@/components/ui/familiar";
import Bento from "@/components/ui/bento"

const scenarios = [
  {
    title: "The Reddit Rabbit Hole",
    text: "You finally land an interview at your dream company, but panic sets in—what do they even ask?",
  },
  {
    title: "Glassdoor Guesswork",
    text: "Searching for 'Software Engineer Intern interviews' on Glassdoor and reading about marketing intern interviews instead?",
  },
  {
    title: "The LeetCode Premium Gamble",
    text: "You paid for LeetCode Premium, expecting gold, but instead found Meta tagged with dynamic programming.",
  },
];
export default function HomePage() {
  return (
    <main>
      <CustomHero />
      <Bento/>
      {/* <CustomFeature/> */}
      <Familiar />
      <FeaturesSection/>
      < FAQSection />
    </main>
  );
}
