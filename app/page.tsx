import CustomHero from '@/components/ui/customhero';
import FAQSection from '@/components/ui/customfaq';
import { FeaturesSection } from "@/components/ui/customfeature2";
import Familiar from "@/components/ui/familiar";
import Bento from "@/components/ui/bento"
import { SpeedInsights } from "@vercel/speed-insights/next"


export default function HomePage() {
  return (
    <main>
      <CustomHero />
      <Bento/>
      {/* <CustomFeature/> */}
      <Familiar />
      <FeaturesSection/>
      < FAQSection />
      <SpeedInsights />
    </main>
  );
}
