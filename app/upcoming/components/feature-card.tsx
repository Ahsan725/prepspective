'use client'

import { motion } from "framer-motion"
import { type LucideIcon } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className={`transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-background to-background/80 border-primary/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-primary">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

