import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Personalized Preparation",
    description: "Tailor your study plan based on company-specific trends.",
  },
  {
    icon: "BadgeCheck",
    title: "Time-Saving",
    description: "Skip irrelevant prep by focusing on what actually matters.",
  },
  {
    icon: "Goal",
    title: "Company-Specific Prep",
    description: "Know what to expect from each company.",
  },
  {
    icon: "PictureInPicture",
    title: "Strong Visuals",
    description: "Engage with clean, modern, and visually appealing designs.",
  },
  {
    icon: "MousePointerClick",
    title: "Clear CTA",
    description: "Get actionable steps and know exactly how to move forward.",
  },
  {
    icon: "Newspaper",
    title: "Clear Headline",
    description: "Understand key information quickly with focused headlines.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="ml-8 mr-8 py-16 px-0">
      {/* Section Header */}
      <div className="flex items-center justify-center mb-4">
        <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-sm lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
          FEATURES
        </h2>
      </div>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes Us Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Our platform stands out by combining actionable insights, user-focused
        design, and a supportive community to help you ace your interviews.
      </h3>

      {/* Feature List */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
          {featureList.map(({ icon, title, description }) => (
            <div key={title} className="relative pl-16">
              <div className="absolute left-0 top-0 flex w-10 h-10 items-center justify-center rounded-lg bg-indigo-600">
                <Icon
                  name={icon as keyof typeof icons}
                  size={25}
                  className="text-white"
                  aria-hidden="true"
                />
              </div>
              <div className="font-semibold text-lg text-indigo-800">
                {title}
              </div>
              <div className="text-foreground/60 mt-2 text-sm">
                {description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
