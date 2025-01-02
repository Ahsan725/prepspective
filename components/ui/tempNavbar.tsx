'use client';

import { Menu } from 'lucide-react';
import Link from "next/link";
import { ArrowBigRight, MousePointerClick } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { cn } from "@/lib/utils";
import ContactForm from "@/components/ui/contactForm";
import { ConfettiSideCannons } from "@/components/ui/confettiSideCannons";
import { ModernSidebar } from '@/components/ui/modern-sidebar'

const TempNavbar = () => {
  const handleEscapeButtonClick = () => {
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    window.dispatchEvent(escapeEvent);
  };

  return (
    <section className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Desktop Navbar */}
        <nav className="hidden lg:flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-indigo-700">
                {"{P}rep"}<span className="font-bold text-indigo-700 text-2xl">Spective</span> 
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleEscapeButtonClick}
                    variant="outline"
                    size="icon"
                  >
                    <MousePointerClick />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Press ESC or click to disable the cursor.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <ModernSidebar />
            <ContactForm />
            <ConfettiSideCannons />
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-indigo-700">
              {"{P}rep"}<span className="font-bold text-indigo-700 text-2xl">Spective</span> 
            </span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-indigo-700">
                  {"{P}rep"}Spective
                </SheetTitle>
              </SheetHeader>
              <div className="border-t pt-4 flex flex-col gap-3">
                <Button
                  onClick={handleEscapeButtonClick}
                  variant="outline"
                  size="icon"
                >
                  <MousePointerClick />
                </Button>
                <ContactForm />
                <ConfettiSideCannons />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default TempNavbar;

