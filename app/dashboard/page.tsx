'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, CheckCircle, Clock, Search, Star, Briefcase, ArrowUpRight } from 'lucide-react'
import Link from "next/link"

// Mock data for the dashboard
const recentActivity = [
  { id: 1, action: "Completed mock interview", company: "Google", date: "2 hours ago" },
  { id: 2, action: "Solved LeetCode problem", title: "Two Sum", date: "Yesterday" },
  { id: 3, action: "Reviewed system design", topic: "Distributed Cache", date: "2 days ago" },
]

const upcomingInterviews = [
  { id: 1, company: "Amazon", role: "Software Engineer", date: "2023-06-15" },
  { id: 2, company: "Microsoft", role: "Senior Developer", date: "2023-06-20" },
]

const progressStats = [
  { category: "Algorithms", completed: 75, total: 150 },
  { category: "System Design", completed: 10, total: 30 },
  { category: "Behavioral", completed: 20, total: 50 },
]

const recommendedQuestions = [
  { id: 1, title: "Implement a LRU Cache", company: "Google", difficulty: "Medium" },
  { id: 2, title: "Design a distributed system", company: "Amazon", difficulty: "Hard" },
  { id: 3, title: "Reverse a linked list", company: "Meta", difficulty: "Easy" },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Interview Prep Dashboard</h1>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            Schedule Mock Interview
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Practice Questions</CardTitle>
              <CheckCircle className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mock Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 scheduled this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
              <Clock className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32.5 min</div>
              <p className="text-xs text-muted-foreground">Per coding challenge</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <BarChart className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {progressStats.map((stat, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{stat.category}</span>
                    <span className="text-sm font-medium text-gray-700">{stat.completed}/{stat.total}</span>
                  </div>
                  <Progress value={(stat.completed / stat.total) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.map((interview) => (
                <div key={interview.id} className="mb-4 last:mb-0">
                  <div className="flex items-center">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={interview.company} />
                      <AvatarFallback>{interview.company[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{interview.company}</p>
                      <p className="text-sm text-gray-500">{interview.role}</p>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{interview.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center mb-4 last:mb-0">
                  <div className="mr-4">
                    <Avatar>
                      <AvatarFallback>{activity.action[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.company || activity.title || activity.topic}
                    </p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recommended Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {recommendedQuestions.map((question) => (
                <div key={question.id} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between">
                    <Link href={`/questions/${question.id}`} className="text-sm font-medium text-indigo-600 hover:underline">
                      {question.title}
                    </Link>
                    <Badge variant={question.difficulty === 'Easy' ? 'success' : question.difficulty === 'Medium' ? 'warning' : 'destructive'}>
                      {question.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{question.company}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Search className="h-6 w-6 mb-2" />
                  <span>Search Questions</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Star className="h-6 w-6 mb-2" />
                  <span>Practice Test</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Briefcase className="h-6 w-6 mb-2" />
                  <span>Company Insights</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <ArrowUpRight className="h-6 w-6 mb-2" />
                  <span>View Progress</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

