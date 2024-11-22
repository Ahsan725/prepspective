import CustomHero from '@/components/ui/customhero';
import { CustomFeature } from '@/components/ui/customfeature';
import FAQSection from '@/components/ui/customfaq';
import { FeaturesSection } from "@/components/ui/customfeature2";
import Pitch from "@/components/ui/pitch"
import Pitch2 from "@/components/ui/pitch2"
import CTA from "@/components/ui/cta"


export default function HomePage() {
  return (
    <main>
      <CustomHero />
      <CTA />
      <Pitch />
      <Pitch2/>
      {/* <CustomFeature/> */}
      <FeaturesSection/>
      < FAQSection />
    </main>
  );
}
