import CustomHero from '@/components/ui/customhero';
import FAQSection from '@/components/ui/customfaq';
import { FeaturesSection } from "@/components/ui/customfeature2";
import Pitch from "@/components/ui/pitch"


export default function HomePage() {
  return (
    <main>
      <CustomHero />
      <Pitch />
      {/* <CustomFeature/> */}
      <FeaturesSection/>
      < FAQSection />
    </main>
  );
}
