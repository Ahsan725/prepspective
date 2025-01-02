import { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/icon";
import { icons } from 'lucide-react';

interface Item {
  icon: string;
  title: string;
  description: string;
}

interface Props {
  items: Item[];
  wrapperClasses?: string;
  itemClasses?: string;
}

const CardClickEffect: FC<Props> = ({ items, wrapperClasses, itemClasses }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3 lg:gap-y-10", wrapperClasses)}>
      {items.map(({ icon, title, description }, idx) => (
        <motion.div
          key={title}
          className={cn("relative pl-16 cursor-pointer", itemClasses)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
          onClick={() => setSelectedIdx(selectedIdx === idx ? null : idx)}
        >
          <AnimatePresence>
            {selectedIdx === idx && (
              <motion.div
                className="absolute inset-0 -m-2 rounded-lg bg-indigo-50"
                layoutId="clickBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
          <div className="absolute left-0 top-0 flex w-10 h-10 items-center justify-center rounded-lg bg-indigo-600">
            <Icon
              name={icon as keyof typeof icons}
              size={20}
              className="text-white"
              aria-hidden="true"
            />
          </div>
          <motion.div
            className="relative z-10 font-semibold text-lg text-indigo-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 + 0.1 }}
          >
            {title}
          </motion.div>
          <motion.div
            className="relative z-10 text-foreground/60 mt-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
          >
            {description}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardClickEffect;

