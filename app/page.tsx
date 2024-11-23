import CustomHero from '@/components/ui/customhero';
import FAQSection from '@/components/ui/customfaq';
import { FeaturesSection } from "@/components/ui/customfeature2";
import Pitch from "@/components/ui/pitch"
import Bento from "@/components/ui/bento"


export default function HomePage() {
  return (
    <main>
      <CustomHero />
      <Bento/>
      <Pitch />
      {/* <CustomFeature/> */}
      <FeaturesSection/>
      < FAQSection />
    </main>
  );
}
