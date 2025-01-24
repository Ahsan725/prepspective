"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateJitsiLink } from "./actions"

interface GenerateJitsiLinkResult {
  success: boolean;
  link?: string;
  error?: string;
}

export function JitsiForm() {
  const router = useRouter()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("startDate", startDate)
    formData.append("endDate", endDate)
    formData.append("startTime", startTime)
    formData.append("endTime", endTime)

    const result: GenerateJitsiLinkResult = await generateJitsiLink(formData)
    if (result.success && result.link) { // Ensure `result.link` is defined
      router.push(
        `/result?link=${encodeURIComponent(result.link)}&date=${encodeURIComponent(
          startDate
        )}&time=${encodeURIComponent(startTime)}`
      )
    } else {
      alert(result.error || "Error generating link. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="startTime">Start Time</Label>
        <Input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="endTime">End Time</Label>
        <Input type="time" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </div>
      <Button type="submit">Generate Link</Button>
    </form>
  )
}
