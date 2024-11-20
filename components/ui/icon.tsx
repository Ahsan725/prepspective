import React from "react";
import { icons } from "lucide-react";

interface IconProps {
  name: keyof typeof icons; // Name of the icon (must match lucide-react icons)
  size?: number; // Size of the icon in pixels
  color?: string; // Color of the icon (CSS-compatible string)
  className?: string; // Additional Tailwind CSS or custom classes
}

const Icon: React.FC<IconProps> = ({ name, size = 24, color, className }) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" does not exist in lucide-react.`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      className={className}
      style={{ color }}
    />
  );
};

export { Icon };
