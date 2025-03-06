"use client";
import {
  Book,
  Menu,
  Sunset,
  Trees,
  Zap,
  Brain,
  List,
  FileText,
  MousePointerClick,
  NotebookPenIcon,
  Code,
  Globe,
  Users,
} from "lucide-react";
import Link from "next/link";

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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ContactForm from "@/components/ui/contactForm";
import { ModernSidebar } from "@/components/ui/modern-sidebar";

const subMenuItemsOne = [
  {
    title: "Experiences",
    description: "The latest industry news, updates, and info",
    icon: <FileText className="size-5 shrink-0 text-indigo-700" />,
    href: "/search",
  },
  {
    title: "Add Entry",
    description: "Our mission is to innovate and empower the world",
    icon: <NotebookPenIcon className="size-5 shrink-0 text-indigo-700" />,
    href: "/exp",
  },
  {
    title: "Lists",
    description: "Browse job listing and discover our workspace",
    icon: <List className="size-5 shrink-0 text-indigo-700" />,
    href: "/lists",
  },
  {
    title: "AI Interview",
    description: "Get Actionable feedback from AI Interview Practice ",
    icon: <Brain className="size-5 shrink-0 text-indigo-700" />,
    href: "/soon",
  },
];

const subMenuItemsTwo = [
  {
    title: "LeetCode Tutoring",
    description: "Master data structures and algorithms with personalized guidance.",
    icon: <Code className="size-6 shrink-0 text-indigo-700" />,
    href: "/leet-code-tutoring",
  },
  {
    title: "Resume Writing",
    description: "Get an ATS-optimized resume that stands out in tech interviews.",
    icon: <FileText className="size-6 shrink-0 text-indigo-700" />,
    href: "/resume-writing",
  },
  {
    title: "Website Development",
    description: "Professional website development to build your personal or business brand.",
    icon: <Globe className="size-6 shrink-0 text-indigo-700" />,
    href: "/website-development",
  },
  {
    title: "Mock Interviews",
    description: "Simulated technical interviews to boost your confidence and skills.",
    icon: <Users className="size-6 shrink-0 text-indigo-700" />,
    href: "/mock-interviews",
  },
];

const CustomNavbar = () => {
  const handleEscapeButtonClick = () => {
    const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
    window.dispatchEvent(escapeEvent);
  };
  return (
    <section className="w-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <nav className="hidden justify-between items-center lg:flex">
          {/* Logo on the left */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-indigo-700">
              {"{P}rep"}
              <span className="font-bold text-indigo-700 text-2xl">
                Spective
              </span>
            </span>
          </div>

          {/* Centered Navigation Items */}
          <div className="flex items-center justify-center flex-1">
            <Link
              href="/"
              className={cn(
                "text-muted-foreground bg-white z-20 mr-1",
                navigationMenuTriggerStyle,
                buttonVariants({
                  variant: "ghost",
                })
              )}>
              HOME
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="text-muted-foreground">
                  <NavigationMenuTrigger>
                    <span>PRODUCTS</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-80 p-3">
                      <NavigationMenuLink>
                        {subMenuItemsOne.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              className={cn(
                                "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-indigo-50 hover:text-indigo-700 text-gray-600"
                              )}
                              href={item.href}>
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">
                                  {item.title}
                                </div>
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
                <NavigationMenuItem className="text-muted-foreground">
                  <NavigationMenuTrigger>SERVICES</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-80 p-3">
                      <NavigationMenuLink>
                        {subMenuItemsTwo.map((item, idx) => (
                          <li key={idx}>
                            <Link
                              className={cn(
                                "flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-indigo-50 hover:text-indigo-700 text-gray-600"
                              )}
                              href={item.href}>
                              {item.icon}
                              <div>
                                <div className="text-sm font-semibold">
                                  {item.title}
                                </div>
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
                "text-muted-foreground bg-white z-20 ml-1",
                navigationMenuTriggerStyle,
                buttonVariants({
                  variant: "ghost",
                })
              )}>
              ABOUT
            </Link>
            <Link
              className={cn(
                "text-muted-foreground bg-white z-20 ml-1",
                navigationMenuTriggerStyle,
                buttonVariants({
                  variant: "ghost",
                })
              )}
              href="https://forms.gle/JThZQVQ96ztQ4chS8"
              target="_blank"
              rel="noopener noreferrer">
              CAREERS
            </Link>
          </div>

          {/* Buttons on the right */}
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleEscapeButtonClick}
                    variant="outline"
                    size="icon">
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
            <Button variant={"outline"}>Log in</Button>
            <Button>Sign up</Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-indigo-700">
                <span className="text-xl font-extrabold lg:text-xl text-indigo-700">
                  {"{P}rep"}
                </span>
                Spective
              </span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant={"link"}
                  size={"icon"}
                  className="text-indigo-800">
                  <Menu className="size-4 border-none" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-indigo-700">
                        <span className="text-xl font-extrabold lg:text-xl text-indigo-700">
                          {"{P}rep"}
                        </span>
                        Spective
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-8 flex flex-col gap-4">
                  <Link href="/" className="text-muted-foreground">
                    HOME
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="products" className="border-b-0">
                      <AccordionTrigger className="mb-4 py-0 text-muted-foreground hover:no-underline">
                        PRODUCTS
                      </AccordionTrigger>
                      <AccordionContent className="mt-2">
                        {subMenuItemsOne.map((item, idx) => (
                          <Link
                            key={idx}
                            className={cn(
                              "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-indigo-50"
                            )}
                            href={item.href}>
                            {item.icon}
                            <div>
                              <div className="text-sm font-semibold">
                                {item.title}
                              </div>
                              <p className="text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="resources" className="border-b-0">
                      <AccordionTrigger className="py-0 text-muted-foreground hover:no-underline">
                        SERVICES
                      </AccordionTrigger>
                      <AccordionContent className="mt-2">
                        {subMenuItemsTwo.map((item, idx) => (
                          <Link
                            key={idx}
                            className={cn(
                              "flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:bg-indigo-50"
                            )}
                            href={item.href}>
                            {item.icon}
                            <div>
                              <div className="text-sm font-semibold">
                                {item.title}
                              </div>
                              <p className="text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Link href="/about" className="text-muted-foreground">
                    ABOUT
                  </Link>
                  <a href="/soon" className="text-muted-foreground">
                    Blog
                  </a>
                </div>
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 justify-start">
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground"
                      )}
                      href="/soon">
                      Press
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground"
                      )}
                      href="#">
                      Imprint
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground"
                      )}
                      href="#">
                      Sitemap
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground"
                      )}
                      href="#">
                      Legal
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground"
                      )}
                      href="#">
                      Cookie Settings
                    </a>
                  </div>
                  <div className="mt-2 flex flex-col gap-3">
                    <Button variant={"outline"}>Log in</Button>
                    <Button>Sign up</Button>
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