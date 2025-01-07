"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Home,
  Users,
  LogOut,
  FileText,
  X,
  UserCog,
  NotebookPen,
  HelpCircle,
  Briefcase,
  Lightbulb,
  Brain,
  Calendar,
  List,
  CheckCircle,
  Cloud,
  EyeOff,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CommandIcon as CmdIcon } from "lucide-react";

const sidebarItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: FileText,
    label: "Search",
    href: "/search",
  },
  {
    icon: NotebookPen,
    label: "Add Entry",
    href: "/exp",
  },
  {
    icon: List,
    label: "Leetcode Lists",
    href: "/soon",
    subItems: [
      { icon: CheckCircle, label: "Leetcode 150", href: "/soon" },
      { icon: EyeOff, label: "Blind 75", href: "/soon" },
      { 
        icon: Briefcase,
        label: "Company-Based Lists",
        href: "/soon",
      },
    ],
  },
  {
    icon: FileText,
    label: "About Us",
    href: "/about",
  },
  {
    icon: HelpCircle,
    label: "Guide",
    href: "/soon",
  },
  {
    icon: Lightbulb,
    label: "Upcoming Features",
    href: "/soon",
    subItems: [
      { icon: Brain, label: "AI Interview Help", href: "/soon" },
      { icon: Users, label: "Peer Mock Interviews", href: "/soon" },
      { icon: Calendar, label: "Events", href: "/soon" },
    ],
  },
  {
    icon: Briefcase,
    label: "Careers",
    href: "https://forms.gle/JThZQVQ96ztQ4chS8", // External link
    external: true, // Custom flag for external links
  },
  {
    icon: Mail,
    label: "Contact Us",
    href: "/contact",
  },
];


function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
}

export function ModernSidebar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<string | null>(null);
  const { signOut, openUserProfile } = useClerk();
  const { user } = useUser();

  const handleClose = () => {
    setIsOpen(false);
    setActiveItem(null);
  };

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest(".sidebar-content")) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{/* Trigger button remains unchanged */}</SheetTrigger>
      <SheetContent
        side="left"
        className="sidebar-content w-[300px] p-0 border-r-0 flex flex-col bg-gradient-to-r from-black/95 to-indigo-700/95 "
      >
        <SheetHeader className="p-6 relative">
          <SheetTitle className="text-2xl font-bold text-indigo-100">
            <span className="text-2xl font-extrabold text-white">
              {"{P}rep"}
              <span className="font-bold text-white text-2xl">Spective</span>
            </span>
          </SheetTitle>
          <motion.button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none"
            onClick={handleClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-5 w-5 text-indigo-50" />
            <span className="sr-only">Close</span>
          </motion.button>
        </SheetHeader>
        <div className="border-t border-white/30 mx-4"></div>

        <nav className="flex flex-col gap-1 p-6 pt-0 overflow-y-auto flex-grow custom-scrollbar">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              item={item}
              isActive={activeItem === item.label}
              setActiveItem={setActiveItem}
              onSelect={handleClose}
            />
          ))}
        </nav>

        <div className="p-6 mt-auto space-y-4 relative z-50">
          <div className="flex items-center justify-center text-indigo-400 max-w-sm mx-auto">
            <div className="flex items-center gap-2">
              <CmdIcon className="w-3 h-3" />
              <span className="text-sm font-medium">+</span>
              <span className="text-xs font-medium">K</span>
            </div>
          </div>
          <div className="space-y-4">
            <SignedIn>
              <div className="flex flex-col items-start space-y-4 relative">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-indigo-100 hover:bg-indigo-600 hover:text-white"
                  onClick={() => openUserProfile()}
                >
                  <UserCog className="h-5 w-5" />
                  Manage Account
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-indigo-100 hover:bg-indigo-600 hover:text-white"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </Button>
                {user && (
                  <div className="flex items-center space-x-3 w-full">
                    <UserAvatar name={user.fullName || ""} />
                    <span className="text-lg font-semibold text-white">{user.fullName}</span>
                  </div>
                )}
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-indigo-100 hover:bg-indigo-600 hover:text-white"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface SidebarItemProps {
  item: {
    icon: React.ElementType;
    label: string;
    href: string;
    subItems?: Array<{
      icon: React.ElementType;
      label: string;
      href: string;
    }>;
  };
  isActive: boolean;
  setActiveItem: (label: string | null) => void;
  onSelect: () => void;
}

function SidebarItem({ item, isActive, setActiveItem, onSelect }: SidebarItemProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 text-indigo-100 hover:bg-indigo-700/50 hover:text-white",
            "transition-all duration-200 ease-in-out",
            "focus:bg-indigo-600/50 focus:text-white",
            "active:scale-95",
            isActive && "bg-indigo-600/50 text-white"
          )}
          onClick={() => setActiveItem(item.label)}
          asChild
        >
          <a href={item.href}>
            <Icon className="h-5 w-5" />
            <span className="text-xs">{item.label}</span>
            {item.subItems && (
              <ChevronRight
                className={cn(
                  "ml-auto h-4 w-4 transition-transform duration-200",
                  isHovered ? "rotate-90" : ""
                )}
              />
            )}
          </a>
        </Button>
      </motion.div>
      {item.subItems && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-indigo-800/50 rounded-md mt-1"
            >
              {item.subItems.map((subItem, index) => (
                <SubItem key={index} item={subItem} onSelect={onSelect} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

function SubItem({ item, onSelect }: { item: { icon: React.ElementType; label: string; href: string }; onSelect: () => void }) {
  const Icon = item.icon;

  return (
    <motion.div whileHover={{ scale: 1.0 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 text-indigo-100 hover:bg-indigo-700/50 hover:text-white",
          "transition-all duration-200 ease-in-out",
          "focus:bg-indigo-600/50 focus:text-white",
          "active:scale-95",
          "pl-8"
        )}
        asChild
      >
        <a href={item.href}>
          <Icon className="h-4 w-4" />
          <span className="text-xs">{item.label}</span>
        </a>
      </Button>
    </motion.div>
  );
}