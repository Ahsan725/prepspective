'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Briefcase, ArrowUpRight, Star, Clock } from 'lucide-react'
import Link from "next/link"

interface Company {
  name: string
  questionCount: number
  logo: string
}

interface Question {
  id: string
  title: string
  company: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  type: 'Behavioral' | 'Technical'
  askedRecently: boolean
}

// This would come from your API/database
const companies: Company[] = [
  { name: "Google", questionCount: 150, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Meta", questionCount: 120, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Amazon", questionCount: 200, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Microsoft", questionCount: 180, logo: "/placeholder.svg?height=40&width=40" },
  { name: "Apple", questionCount: 90, logo: "/placeholder.svg?height=40&width=40" },
]

// Mock questions data
const questions: Question[] = [
  { id: '1', title: "Implement a LRU Cache", company: "Google", difficulty: "Medium", type: "Technical", askedRecently: true },
  { id: '2', title: "Describe a time you faced a challenge", company: "Amazon", difficulty: "Easy", type: "Behavioral", askedRecently: false },
  { id: '3', title: "Design a distributed system", company: "Microsoft", difficulty: "Hard", type: "Technical", askedRecently: true },
  { id: '4', title: "Reverse a linked list", company: "Meta", difficulty: "Easy", type: "Technical", askedRecently: false },
  { id: '5', title: "Explain your most significant project", company: "Apple", difficulty: "Medium", type: "Behavioral", askedRecently: true },
]

export default function InterviewQuestionsSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredQuestions = questions.filter(question => 
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Interview Questions Search</h1>
          <p className="text-lg text-gray-600 mb-8">
            Find the most relevant interview questions from top tech companies
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search companies, questions, or topics..."
              className="w-full pl-10 h-12 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
            <TabsTrigger value="companies" onClick={() => setActiveTab('companies')}>Companies</TabsTrigger>
            <TabsTrigger value="questions" onClick={() => setActiveTab('questions')}>Questions</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results Section */}
        {activeTab === 'all' || activeTab === 'companies' ? (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Companies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <Link
                  key={company.name}
                  href={`/companies/${company.name.toLowerCase()}`}
                  className="group block"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="w-10 h-10 rounded-full"
                          />
                          <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
                        </div>
                        <ArrowUpRight className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{company.questionCount} questions</span>
                        </div>
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                          View Questions
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === 'all' || activeTab === 'questions' ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Questions</h2>
            <div className="space-y-4">
              {filteredQuestions.map((question) => (
                <Card key={question.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Link href={`/questions/${question.id}`} className="text-lg font-medium text-indigo-600 hover:underline">
                        {question.title}
                      </Link>
                      <Badge variant={question.difficulty === 'Easy' ? 'success' : question.difficulty === 'Medium' ? 'warning' : 'destructive'}>
                        {question.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{question.company}</span>
                      <span>{question.type}</span>
                      {question.askedRecently && (
                        <span className="flex items-center text-green-600">
                          <Clock className="w-4 h-4 mr-1" />
                          Recently Asked
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-lg bg-indigo-50 px-3 py-1 text-sm text-indigo-600 mb-4">
            Contribute to the community
          </div>
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Share Your Interview Experience
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Help others prepare by sharing your interview questions and experiences
            </p>
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
              Share Your Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

