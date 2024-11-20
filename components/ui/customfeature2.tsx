import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    title: "Mobile Friendly",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, consectetur.",
  },
  {
    icon: "BadgeCheck",
    title: "Social Proof",
    description:
      "Lorem ipsum dolor sit amet consectetur. Natus consectetur, odio ea accusamus aperiam.",
  },
  {
    icon: "Goal",
    title: "Targeted Content",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. odio ea accusamus aperiam.",
  },
  {
    icon: "PictureInPicture",
    title: "Strong Visuals",
    description:
      "Lorem elit. A odio velit cum aliquam. Natus consectetur dolores, odio ea accusamus aperiam.",
  },
  {
    icon: "MousePointerClick",
    title: "Clear CTA",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing. odio ea accusamus consectetur.",
  },
  {
    icon: "Newspaper",
    title: "Clear Headline",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="ml-8 mr-8 py-0 px-0">
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
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem
        fugiat, odit similique quasi sint reiciendis quidem iure veritatis optio
        facere tenetur.
      </h3>

      {/* Feature List Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map(({ icon, title, description }) => (
          <div key={title} className="flex justify-center items-center">
            <Card className="h-full shadow-none bg-white border-none rounded-lg flex flex-col items-center text-center">
              {/* Card Header */}
              <CardHeader className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-indigo-800 to-indigo-500 p-3 rounded-full mb-4 bg-primary/20 ">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={40}
                    // color="hsl(var(--primary))"
                    className="text-white"
                  />
                </div>
                <CardTitle className="text-xl font-semibold text-indigo-800">{title}</CardTitle>
              </CardHeader>

              {/* Card Content */}
              <CardContent className="text-muted-foreground sm:text-sm  lg:text-base">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
