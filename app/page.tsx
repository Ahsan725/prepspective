'use client'
import React, { useState, useEffect } from "react";
import CustomHero from '@/components/ui/customhero';
import FAQSection from '@/components/ui/customfaq';
import { FeaturesSection } from "@/components/ui/customfeature2";
import Familiar from "@/components/ui/familiar";
import Bento from "@/components/ui/bento";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Loader from "@/components/ui/loader";
import SvgImage from '@/components/ui/heroimg';
import Test from "@/components/ui/test";
import ServiceShowcase from "@/components/ServiceShow";
import Footer from "@/components/ui/footer";
// import Feature from "@/components/ui/FeatureShowcase";


export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-28">
        <Loader />
      </div>
    );
  }

  return (
    <main>
      <CustomHero />
      {/* <Feature/> */}
      <Bento />
      {/* <SvgImage src="/mockup.svg" alt="Example SVG Image" /> */}
      {/* <Familiar /> */}
      <FeaturesSection />
      <FAQSection />
      <ServiceShowcase />
      <Footer/>
      {/* <Test /> */}
      <SpeedInsights />
    </main>
  );
}
