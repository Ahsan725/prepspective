import CustomHero from '@/components/ui/customhero';
import { CustomFeature } from '@/components/ui/customfeature';
import FAQSection from '@/components/ui/customfaq';
import { FeaturesSection } from "@/components/ui/customfeature2";


export default function HomePage() {
  return (
    <main>
      <CustomHero />
      {/* <CustomFeature/> */}
      <FeaturesSection/>
      < FAQSection/>
    </main>
  );
}
