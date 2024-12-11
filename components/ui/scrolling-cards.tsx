import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import styles from './scrolling-cards.module.css'

interface TestimonialCard {
  id: number;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatar: string;
}

const testimonials: TestimonialCard[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Software Engineer",
    company: "TechCorp",
    testimonial: "This platform revolutionized my interview prep. I landed my dream job!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Product Manager",
    company: "InnovateCo",
    testimonial: "The practice questions were spot-on. I felt so prepared for my interviews.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Davis",
    role: "Data Scientist",
    company: "DataDriven",
    testimonial: "The AI-powered feedback was incredibly helpful. It's like having a personal coach.",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Frontend Developer",
    company: "WebWizards",
    testimonial: "I improved my problem-solving skills dramatically. Highly recommended!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Eva Martinez",
    role: "DevOps Engineer",
    company: "CloudNine",
    testimonial: "The system design questions were particularly useful. I aced that part of my interview!",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ScrollingCards() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTrack}>
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={`${testimonial.id}-${index}`} className={styles.cardWrapper}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role} at {testimonial.company}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{testimonial.testimonial}</p>
              </CardContent>
              <CardFooter>
                <Badge variant="secondary">Verified User</Badge>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

