"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Book,
  Menu,
  Sunset,
  Trees,
  Zap,
  Brain,
  Target,
  List,
  FileText,
  MousePointerClick,
  NotebookPenIcon,
  Code,
  Globe,
  Users,
  UserCog,
  LogOut,
  Trophy,
  Timer,
} from "lucide-react";
import {
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  useClerk,
} from "@clerk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ui/contactForm";
import { ModernSidebar } from "@/components/ui/modern-sidebar";

// -----------------------------
// Sub‑menu items
// -----------------------------

const subMenuItemsOne = [
  {
    title: "Lists",
    description: "Curated LeetCode Study lists with solutions and tracking",
    icon: <List className="size-5 shrink-0 text-indigo-700" />,
    href: "/lists",
  },
  {
    title: "AI Interview",
    description: "Get Actionable feedback from AI Interview Practice ",
    icon: <Brain className="size-5 shrink-0 text-indigo-700" />,
    href: "/ai",
  },
  {
    title: "Skill Scan",
    description: "Pinpoints your specific data structure knowledge gaps ",
    icon: <Target className="size-5 shrink-0 text-indigo-700" />,
    href: "/skillscan",
  },
  {
    title: "Brag Sheet",
    description: "Track your wins and professional achievements",
    icon: <Trophy className="size-5 shrink-0 text-indigo-700" />,
    href: "/brag",
  },
  {
    title: "Pomodoro Timer",
    description: "Boost productivity with focused work sessions",
    icon: <Timer className="size-5 shrink-0 text-indigo-700" />,
    href: "/pom",
  },
];

const subMenuItemsTwo = [
  {
    title: "LeetCode Tutoring",
    description:
      "Master data structures and algorithms with personalized guidance.",
    icon: <Code className="size-6 shrink-0 text-indigo-700" />,
    href: "/tutor",
  },
  {
    title: "Resume Writing",
    description: "Get an ATS-optimized resume that stands out in tech interviews.",
    icon: <FileText className="size-6 shrink-0 text-indigo-700" />,
    href: "/resume",
  },
  {
    title: "Website Development",
    description:
      "Professional website development to build your personal or business brand.",
    icon: <Globe className="size-6 shrink-0 text-indigo-700" />,
    href: "/webdev",
  },
  {
    title: "Mock Interviews",
    description: "Simulated technical interviews to boost your confidence and skills.",
    icon: <Users className="size-6 shrink-0 text-indigo-700" />,
    href: "/mock-interviews",
  },
];

// -----------------------------
// Helper link component
// -----------------------------

export interface ProtectedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

function ProtectedLink({
  href,
  onClick,
  children,
  ...anchorProps
}: ProtectedLinkProps) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      openSignIn();
    } else {
      router.push(href);
    }
    onClick?.(e);
  };

  return (
    <a href={href} onClick={handleClick} {...anchorProps}>
      {children}
    </a>
  );
}

// -----------------------------
// Main component
// -----------------------------

const CustomNavbar: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  const handleEscapeButtonClick = () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

  // Close mobile sheet helper
  const closeSheet = (_?: React.MouseEvent) => {
    setIsSheetOpen(false);
  };

  return (
    <section className="w-full py-4 px-4 sm:px-6 lg:px-8 relative z-50">
      <div className="container mx-auto max-w-7xl">
        {/* ---------------- Desktop Navbar ---------------- */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 hover:opacity-90 transition-opacity"
          >
            <span className="text-2xl font-extrabold text-indigo-700">
              {"{P}rep"}
              <span className="font-bold text-2xl text-indigo-700">Spective</span>
            </span>
          </Link>

          {/* Center nav items */}
          <div className="flex-1 flex items-center justify-center">
            <Link
              href="/"
              className={cn(
                "mr-1 z-20 text-muted-foreground bg-white",
                buttonVariants({ variant: "ghost" })
              )}
            >
              Home
            </Link>

            {/* Products + Mentor Services dropdowns */}
            <NavigationMenu>
              <NavigationMenuList>
                {/* Products */}
                <NavigationMenuItem className="text-muted-foreground">
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-80 p-3">
                      <NavigationMenuLink>
                        {subMenuItemsOne.map((item, idx) => (
                          <li key={idx}>
                            <ProtectedLink
                              href={item.href}
                              className={cn(
                                "flex gap-4 select-none rounded-md p-3 transition-colors hover:bg-indigo-50 hover:text-indigo-700 text-gray-600"
                              )}
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">{item.title}</div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </ProtectedLink>
                          </li>
                        ))}
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Mentor Services */}
                <NavigationMenuItem className="text-muted-foreground">
                  <NavigationMenuTrigger>Mentor Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-80 p-3">
                      <NavigationMenuLink>
                        {subMenuItemsTwo.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              href={item.href}
                              className={cn(
                                "flex gap-4 select-none rounded-md p-3 transition-colors hover:bg-indigo-50 hover:text-indigo-700 text-gray-600"
                              )}
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">{item.title}</div>
                                <p className="text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </NavigationMenuLink>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/about"
              className={cn(
                "ml-1 z-20 text-muted-foreground bg-white",
                buttonVariants({ variant: "ghost" })
              )}
            >
              About
            </Link>
            <Link
              href="https://forms.gle/JThZQVQ96ztQ4chS8"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "ml-1 z-20 text-muted-foreground bg-white",
                buttonVariants({ variant: "ghost" })
              )}
            >
              Careers
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {pathname === "/" && (
              <div className="hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={handleEscapeButtonClick}
                      >
                        <MousePointerClick />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Press ESC or click to disable the cursor.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            <ModernSidebar />

            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: { width: "2.5rem", height: "2.5rem" },
                      userButtonTrigger: { "&:focus": { boxShadow: "none" } },
                    },
                  }}
                />
                {/* First name next to avatar (desktop/≥sm) */}
                <span className="hidden sm:inline-block text-sm text-slate-500 font-light">
                  {firstName}
                </span>
              </div>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline">Log in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign up</Button>
                </SignUpButton>
              </>
            )}
          </div>
        </nav>

        {/* ---------------- Mobile Navbar ---------------- */}
        <div className="lg:hidden block">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1 hover:opacity-90 transition-opacity"
            >
              <span className="text-2xl font-extrabold text-indigo-700">
                {"{P}rep"}
                <span className="font-bold text-2xl text-indigo-700">Spective</span>
              </span>
            </Link>

            {/* Sheet trigger */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="link"
                  size="icon"
                  className="text-indigo-800"
                  onClick={() => setIsSheetOpen(true)}
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              {/* Sheet content */}
              <SheetContent className="overflow-y-auto flex flex-col">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                {/* ---------------- Links block ---------------- */}
                <div className="my-8 flex flex-col gap-4 flex-1">
                  <Link href="/" onClick={closeSheet} className="text-muted-foreground">
                    Home
                  </Link>

                  {/* Accordion items */}
                  <Accordion type="single" collapsible className="w-full">
                    {/* Products accordion */}
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className="py-0 mb-4 text-muted-foreground hover:no-underline">
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 space-y-2">
                        {subMenuItemsOne.map((item, idx) => (
                          <ProtectedLink
                            key={idx}
                            href={item.href}
                            onClick={closeSheet}
                            className="flex gap-4 rounded-md p-3 hover:bg-indigo-50"
                          >
                            {item.icon}
                            <div>
                              <div className="text-sm font-semibold">{item.title}</div>
                              <p className="text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </ProtectedLink>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Services accordion */}
                    <AccordionItem value="services" className="border-b-0">
                      <AccordionTrigger className="py-0 text-muted-foreground hover:no-underline">
                        Services
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 space-y-2">
                        {subMenuItemsTwo.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={closeSheet}
                            className="flex gap-4 rounded-md p-3 hover:bg-indigo-50"
                          >
                            {item.icon}
                            <div>
                              <div className="text-sm font-semibold">{item.title}</div>
                              <p className="text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link href="/about" onClick={closeSheet} className="text-muted-foreground">
                    About
                  </Link>
                </div>

                {/* ---------------- Auth block ---------------- */}
                <div className="border-t pt-4 flex flex-col items-center gap-3">
                  {isSignedIn ? (
                    <>
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: { width: "3rem", height: "3rem" },
                            userButtonTrigger: { "&:focus": { boxShadow: "none" } },
                          },
                        }}
                      />
                      {/* First name under avatar (mobile) */}
                      <span className="text-base font-medium mt-1">{firstName + " " + lastName}</span>

                      <Button
                        variant="outline"
                        className="w-full justify-center gap-2"
                        onClick={() => {
                          openUserProfile();
                          closeSheet();
                        }}
                      >
                        <UserCog className="h-5 w-5" /> Manage Account
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-center gap-2 bg-indigo-700 text-white hover:bg-black"
                        onClick={() => {
                          signOut();
                          closeSheet();
                        }}
                      >
                        <LogOut className="h-5 w-5" /> Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <Button variant="outline" onClick={closeSheet} className="w-full">
                          Log in
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button onClick={closeSheet} className="w-full">
                          Sign up
                        </Button>
                      </SignUpButton>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomNavbar;
