'use client';
import { Menu } from "lucide-react";
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
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ui/contactForm"; // Import the ContactForm component
import { ConfettiSideCannons } from "@/components/ui/confettiSideCannons";

const TempNavbar = () => {

    // Mimic the behavior of pressing the "Escape" key
    const handleEscapeButtonClick = () => {
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(escapeEvent);
    };
  return (
    <section className="py-4 px-4">
      <div className="container">
        {/* Desktop Navbar */}
        <nav className="hidden lg:flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-indigo-700">
                {"{P}rep"}Spective
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className={cn(
                  "text-indigo-700 font-medium hover:underline",
                  "transition-colors duration-300"
                )}
              >
                
              </Link>
              <Link
                href="/about"
                className={cn(
                  "text-indigo-700 font-medium hover:underline",
                  "transition-colors duration-300"
                )}
              >
                
              </Link>
              {/* Placeholder for other links */}
            </div>
          </div>
          <div className="flex gap-2">
            {/* Embed the ContactForm Component */}
            <ContactForm />
            <Button
            onClick={handleEscapeButtonClick}
            variant="outline"
          >
            Disable Fancy Cursor <MousePointerClick />
            </Button>
            <ConfettiSideCannons />
          </div>
        </nav>

        {/* Mobile Navbar */}
        <div className="lg:hidden flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-indigo-700">
              {"{P}rep"}Spective
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
              <div className="my-4 flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-indigo-700 font-medium hover:underline"
                >
                  
                </Link>
                <Link
                  href="/about"
                  className="text-indigo-700 font-medium hover:underline"
                >
                  
                </Link>
              </div>
              <div className="border-t pt-4 flex flex-col gap-3">
                {/* Embed the ContactForm Component */}
                <ContactForm />

                <Button
            onClick={handleEscapeButtonClick}
            variant="outline"
          >
            Disable Fancy Cursor <MousePointerClick />
                </Button>
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
