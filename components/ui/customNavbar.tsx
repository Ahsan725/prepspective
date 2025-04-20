'use client';

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
];

const subMenuItemsTwo = [
  {
    title: "LeetCode Tutoring",
    description: "Master data structures and algorithms with personalized guidance.",
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
    description: "Professional website development to build your personal or business brand.",
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

const CustomNavbar = () => {
  const { isSignedIn } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathname = usePathname();

  const handleEscapeButtonClick = () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

  // Accepts an optional event so we can call it manually or let React pass the event easily
  const closeSheet = (_?: React.MouseEvent) => {
    setIsSheetOpen(false);
  };

  return (
    <section className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <nav className="hidden justify-between items-center lg:flex">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
              <span className="text-2xl font-extrabold text-indigo-700">
                {"{P}rep"}
                <span className="font-bold text-indigo-700 text-2xl">Spective</span>
              </span>
            </Link>
          </div>

          {/* Center Links */}
          <div className="flex items-center justify-center flex-1">
            <Link
              href="/"
              className={cn("text-muted-foreground bg-white z-20 mr-1", buttonVariants({ variant: "ghost" }))}
            >
              Home
            </Link>

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
                                "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-indigo-50 hover:text-indigo-700 text-gray-600"
                              )}
                              onClick={closeSheet}
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">{item.title}</div>
                                <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
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
                                "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-indigo-50 hover:text-indigo-700 text-gray-600"
                              )}
                              onClick={closeSheet}
                            >
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">{item.title}</div>
                                <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
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
              className={cn("text-muted-foreground bg-white z-20 ml-1", buttonVariants({ variant: "ghost" }))}
              onClick={closeSheet}
            >
              About
            </Link>
            <Link
              href="https://forms.gle/JThZQVQ96ztQ4chS8"
              target="_blank"
              rel="noopener noreferrer"
              className={cn("text-muted-foreground bg-white z-20 ml-1", buttonVariants({ variant: "ghost" }))}
            >
              Careers
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex gap-2">
            {pathname === '/' && (
              <div className="hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleEscapeButtonClick}
                        variant="outline"
                        size="icon"
                        className="rounded-full"
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
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: { width: "2.5rem", height: "2.5rem" },
                    userButtonTrigger: { "&:focus": { boxShadow: "none" } },
                  },
                }}
              />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline" onClick={closeSheet}>
                    Log in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button onClick={closeSheet}>Sign up</Button>
                </SignUpButton>
              </>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity" onClick={closeSheet}>
              <span className="text-2xl font-extrabold text-indigo-700">
                {"{P}rep"}
                <span className="font-bold text-indigo-700 text-2xl">Spective</span>
              </span>
            </Link>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="link" size="icon" className="text-indigo-800" onClick={() => setIsSheetOpen(true)}>
                  <Menu className="size-4 border-none" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto flex flex-col">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="my-8 flex flex-col gap-4 flex-1">
                  <Link href="/" className="text-muted-foreground" onClick={closeSheet}>
                    Home
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className="mb-4 py-0 text-muted-foreground hover:no-underline">
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="mt-2">
                        {subMenuItemsOne.map((item, idx) => (
                          <ProtectedLink
                            key={idx}
                            href={item.href}
                            className={cn(
                              "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-indigo-50"
                            )}
                            onClick={closeSheet}
                          >
                            {item.icon}
                            <div>
                              <div className="text-sm font-semibold">{item.title}</div>
                              <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                            </div>
                          </ProtectedLink>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="resources" className="border-b-0">
                      <AccordionTrigger className="py-0 text-muted-foreground hover:no-underline">
                        Services
                      </AccordionTrigger>
                      <AccordionContent className="mt-2">
                        {subMenuItemsTwo.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            className={cn(
                              "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus=text-accent-foreground hover:bg-indigo-50"
                            )}
                            onClick={closeSheet}
                          >
                            {item.icon}
                            <div>
                              <div className="text-sm font-semibold">{item.title}</div>
                              <p className="text-sm leading-snug text-muted-foreground">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link href="/about" className="text-muted-foreground" onClick={closeSheet}>
                    About
                  </Link>
                </div>

                <div className="border-t pt-4">
                  <div className="mt-2 flex flex-col gap-3">
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
                        <Button
                          variant="outline"
                          className="w-full font-semibold justify-center gap-2 text-indigo-700 hover:bg-indigo-100"
                          onClick={() => {
                            openUserProfile();
                            closeSheet();
                          }}
                        >
                          <UserCog className="h-5 w-5" />
                          Manage Account
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-center gap-2 text-white bg-indigo-700 hover:bg-black hover:text-white"
                          onClick={() => {
                            signOut();
                            closeSheet();
                          }}
                        >
                          <LogOut className="h-5 w-5" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <SignInButton mode="modal">
                          <Button variant="outline" onClick={closeSheet}>
                            Log in
                          </Button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                          <Button onClick={closeSheet}>Sign up</Button>
                        </SignUpButton>
                      </>
                    )}
                  </div>
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
