"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Search,
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useUser } from "@clerk/nextjs";

// Define the Problem type (updated with lastCompleted)
type Problem = {
  id: number; // Unique identifier
  title: string;
  link: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  videoLink?: string;
  lastCompleted?: string | null;
};

// Custom Active Shape Function (unchanged)
const CustomActiveShape = (props: any): JSX.Element => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin((-RADIAN * (startAngle + endAngle)) / 2);
  const cos = Math.cos((-RADIAN * (startAngle + endAngle)) / 2);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333">
        {`${payload.name} (${payload.value})`}
      </text>
    </g>
  );
};

// Helper: Returns inline status based on lastCompleted date.
const getReviewStatus = (lastCompleted?: string | null) => {
  if (!lastCompleted) return null;
  const lastDate = new Date(lastCompleted);
  const diffDays =
    (new Date().getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 7 ? (
    <div className="flex items-center gap-1 font-extrabold text-xs text-indigo-400">
      <RotateCcw className="h-4 w-4" />
      <span>Review</span>
    </div>
  ) : (
    <div className="text-xs lg:text-xs text-slate-400">
      Completed: {lastDate.toLocaleDateString()}
    </div>
  );
};

export default function Home() {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "Easy" | "Medium" | "Hard">(
    "all"
  );
  const [selectedList, setSelectedList] = useState<string>("list2");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Fetch data when selectedList changes
  useEffect(() => {
    if (!isLoaded) return;

    async function fetchData() {
      try {
        const problemsRes = await fetch(`/${selectedList}.json`);
        if (!problemsRes.ok) {
          throw new Error(`HTTP error! status: ${problemsRes.status}`);
        }
        const problems: Problem[] = await problemsRes.json();

        // Fetch the user's progress (which now includes "lastCompleted")
        const progressRes = await fetch("/api/updateStatus", {
          credentials: "include",
        });
        let progressMapping: Record<
          number,
          { completed: boolean; lastCompleted: string | null }
        > = {};
        if (progressRes.ok) {
          progressMapping = await progressRes.json();
        }

        // Merge the progress data into the problems list
        const merged = problems.map((problem) => {
          const progressData = progressMapping[problem.id];
          return {
            ...problem,
            completed: progressData
              ? progressData.completed
              : problem.completed,
            lastCompleted: progressData ? progressData.lastCompleted : null,
          };
        });

        setData(merged);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load problems. Please try again later.");
      }
    }
    fetchData();
  }, [selectedList, isLoaded]);

  // Filter problems based on search term and difficulty
  const filteredData = useMemo(() => {
    return data
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) => filter === "all" || item.difficulty === filter);
  }, [data, searchTerm, filter]);

  const displayData = useMemo(() => filteredData, [filteredData]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "x") {
      setActiveVideo(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Compute totals and completed counts
  const totalEasy = data.filter((item) => item.difficulty === "Easy").length;
  const totalMedium = data.filter(
    (item) => item.difficulty === "Medium"
  ).length;
  const totalHard = data.filter((item) => item.difficulty === "Hard").length;

  const easyCompleted = data.filter(
    (item) => item.difficulty === "Easy" && item.completed
  ).length;
  const mediumCompleted = data.filter(
    (item) => item.difficulty === "Medium" && item.completed
  ).length;
  const hardCompleted = data.filter(
    (item) => item.difficulty === "Hard" && item.completed
  ).length;

  const getBadgeColor = (difficulty: "Easy" | "Medium" | "Hard") => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-200 text-emerald-800 border-emerald-200";
      case "Medium":
        return "bg-amber-200 text-amber-800 border-amber-200";
      case "Hard":
        return "bg-rose-200 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const chartDataEasy = useMemo(
    () => [
      { name: "Completed", value: easyCompleted },
      { name: "Remaining", value: totalEasy - easyCompleted },
    ],
    [easyCompleted, totalEasy]
  );

  const chartDataMedium = useMemo(
    () => [
      { name: "Completed", value: mediumCompleted },
      { name: "Remaining", value: totalMedium - mediumCompleted },
    ],
    [mediumCompleted, totalMedium]
  );

  const chartDataHard = useMemo(
    () => [
      { name: "Completed", value: hardCompleted },
      { name: "Remaining", value: totalHard - hardCompleted },
    ],
    [hardCompleted, totalHard]
  );

  const COLORS = { Remaining: "#EDF1FF" };
  const DIFFICULTY_COLORS = {
    Easy: "#6EE7B7",
    Medium: "#FDE046",
    Hard: "#F77171",
  };

  const toggleCompleted = useCallback((id: number, completed: boolean) => {
    // Optimistically update the UI.
    setData((prevData) =>
      prevData.map((problem) =>
        problem.id === id ? { ...problem, completed } : problem
      )
    );

    // Send the update to the API.
    fetch("/api/updateStatus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: id, completed }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Update success:", data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  }, []);

  const onPieEnter = useCallback((_: unknown, index: number) => {}, []);

  return (
    <>
      <div className="overflow-hidden bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 dark:bg-slate-900">
        <main className="w-full h-full p-2">
          <div className="flex flex-col md:flex-row gap-2 h-full">
            {/* Left Column */}
            <div className="w-full md:w-1/6 h-full md:h-[calc(100vh-6rem)] overflow-auto">
              <Card className="w-full p-2 flex-shrink-0 px-2 py-2 mb-4 border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-center">
                    <h2 className="inline-block font-extrabold text-xs sm:text-xs md:text-xs lg:text-md text-indigo-700 text-center tracking-wider bg-indigo-200 rounded-md px-2 py-0">
                      CURATED LISTS
                    </h2>
                    <p className="text-xl md:text-4xl text-center font-bold mb-4">
                      Study Lists
                    </p>
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Total Problems: {data.length}
                  </p>
                </CardHeader>
                <CardContent className="py-1 px-1">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedList === "list1" ? "default" : "outline"}
                      onClick={() => setSelectedList("list1")}
                      className="text-sm">
                      Blind 150
                    </Button>
                    <Button
                      variant={selectedList === "list2" ? "default" : "outline"}
                      onClick={() => setSelectedList("list2")}
                      className="text-sm">
                      Blind 75
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full p-2 flex-grow px-4 py-2 border-none pt-0 shadow-none mb-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-600">
                    Your Progress
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    Track your problem-solving journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-2 px-1 flex flex-col h-full">
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="bg-emerald-300 p-1 rounded-lg text-center">
                      <p className="text-3xl font-bold text-black">
                        {easyCompleted}
                      </p>
                      <p className="text-xs text-black">Easy</p>
                    </div>
                    <div className="bg-yellow-300 p-1 rounded-lg text-center">
                      <p className="text-3xl font-bold text-black">
                        {mediumCompleted}
                      </p>
                      <p className="text-xs text-black">Medium</p>
                    </div>
                    <div className="bg-red-400 p-1 rounded-lg text-center">
                      <p className="text-3xl font-bold text-black">
                        {hardCompleted}
                      </p>
                      <p className="text-xs text-black">Hard</p>
                    </div>
                  </div>
                  <div className="w-full h-48 flex-grow">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={chartDataEasy}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={80}
                          paddingAngle={1}
                          startAngle={90}
                          endAngle={-270}
                          isAnimationActive={true}
                          animationDuration={1500}
                          onMouseEnter={onPieEnter}>
                          {chartDataEasy.map((entry, index) => (
                            <Cell
                              key={`cell-easy-${index}`}
                              fill={
                                entry.name === "Completed"
                                  ? DIFFICULTY_COLORS.Easy
                                  : COLORS.Remaining
                              }
                            />
                          ))}
                        </Pie>
                        <Pie
                          data={chartDataMedium}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={60}
                          paddingAngle={1}
                          startAngle={90}
                          endAngle={-270}
                          isAnimationActive={true}
                          animationDuration={1500}
                          onMouseEnter={onPieEnter}>
                          {chartDataMedium.map((entry, index) => (
                            <Cell
                              key={`cell-medium-${index}`}
                              fill={
                                entry.name === "Completed"
                                  ? DIFFICULTY_COLORS.Medium
                                  : COLORS.Remaining
                              }
                            />
                          ))}
                        </Pie>
                        <Pie
                          data={chartDataHard}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={40}
                          paddingAngle={1}
                          startAngle={90}
                          endAngle={-270}
                          isAnimationActive={true}
                          animationDuration={1500}
                          onMouseEnter={onPieEnter}>
                          {chartDataHard.map((entry, index) => (
                            <Cell
                              key={`cell-hard-${index}`}
                              fill={
                                entry.name === "Completed"
                                  ? DIFFICULTY_COLORS.Hard
                                  : COLORS.Remaining
                              }
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <Link href="/upcoming">
                    <Button
                      variant="outline"
                      className="flex items-center text-sm mx-2 my-2 mt-0 justify-center shadow-none hover:shadow-none px-4 py-2 rounded-lg hover:bg-indigo-700 hover:text-white transition-colors"
                      size="sm">
                      Company Specific Lists
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Problem List */}
            <div className="w-full md:w-4/6 overflow-auto h-[calc(100vh-6rem)]">
              <Card className="border-none p-2 shadow-none flex flex-col h-full">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-2">
                  <CardTitle className="text-2xl font-bold text-gray-600">
                    Problem List
                  </CardTitle>
                  <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-80 lg:w-[30rem]">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder="Search by title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 text-sm"
                        aria-label="Search by title"
                      />
                    </div>
                    <div className="w-full md:w-auto">
                      <Select
                        value={filter}
                        onValueChange={(value) => {
                          setFilter(
                            value as "all" | "Easy" | "Medium" | "Hard"
                          );
                        }}
                        aria-label="Filter by difficulty">
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Filter by difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow overflow-y-auto">
                  <ul className="space-y-0">
                    {displayData.map((item) => (
                      <li
                        key={item.id}
                        className="bg-white dark:bg-slate-800 px-4 py-2 border border-slate-100 rounded-xl hover:bg-indigo-50 ml-0 mr-0">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-3">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Checkbox
                                      checked={item.completed}
                                      onCheckedChange={(checked) =>
                                        toggleCompleted(
                                          item.id,
                                          checked === true
                                        )
                                      }
                                      aria-label={`Mark ${item.title} as ${
                                        item.completed
                                          ? "incomplete"
                                          : "complete"
                                      }`}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      {item.completed
                                        ? "Mark as incomplete"
                                        : "Mark as complete"}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <h3 className="text-md font-semibold">
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-500 hover:text-indigo-600 hover:underline">
                                  {item.title}
                                </a>
                              </h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {item.completed &&
                              item.lastCompleted &&
                              getReviewStatus(item.lastCompleted)}
                            <Badge
                              className={`px-2 py-0 rounded-2xl border ${getBadgeColor(
                                item.difficulty
                              )} text-sm`}>
                              {item.difficulty}
                            </Badge>

                            {item.videoLink && (
                              <Button
                                variant="outline"
                                onClick={() =>
                                  setActiveVideo(item.videoLink || null)
                                }
                                className="flex items-center gap-1 hover:bg-indigo-700 hover:text-white"
                                aria-label={`View video solution for ${item.title}`}>
                                <Video className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                  Solution
                                </span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/6 h-full md:h-[calc(100vh-6rem)] overflow-auto p-2">
              <div className="space-y-4">
                <Link href="/upcoming">
                  <div className="cursor-pointer border border-indigo-200 bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 rounded-md p-4 mx-0 my-2">
                    <h3 className="text-black font-bold text-md mb-1">
                      Targeting a Specific Company?
                    </h3>
                    <p className="text-black text-sm">
                      Check out our company-specific question sets from real
                      interviews.
                    </p>
                  </div>
                </Link>
                <Link href="/tutor">
                  <div className="cursor-pointer border border-emerald-200 bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 rounded-md p-4 my-2 hover:shadow-md transition">
                    <h3 className="font-bold text-md mb-1">
                      1:1 LeetCode Tutoring
                    </h3>
                    <p className="text-sm text-black">
                      Personalized sessions to help you crush your coding
                      interviews.
                    </p>
                  </div>
                </Link>
                <Link href="/resume">
                  <div className="cursor-pointer border border-pink-200 bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 rounded-md p-4 my-2 hover:shadow-md transition">
                    <h3 className="font-bold text-md mb-1">
                      Grinding LeetCode but Resume Not Getting You Interviews?
                    </h3>
                    <p className="text-sm text-black">
                      Let us optimize it to beat ATS filters and land recruiter
                      calls.
                    </p>
                  </div>
                </Link>
                <Link href="/mock-interviews">
                  <div className="cursor-pointer border border-indigo-200 bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 rounded-md p-4 my-2 hover:shadow-md transition">
                    <h3 className="font-bold text-md mb-1">
                      Mock Interviews with Mentors
                    </h3>
                    <p className="text-sm text-black">
                      Practice live interviews with experts. Get real feedback.
                    </p>
                  </div>
                </Link>
                <Link href="/webdev">
                  <div className="cursor-pointer border border-blue-200 bg-gradient-to-l from-teal-50 via-indigo-50 to-purple-50 rounded-md p-4 my-2 hover:shadow-md transition">
                    <h3 className="font-bold text-md mb-1">
                      Need a Portfolio or SaaS Site?
                    </h3>
                    <p className="text-sm text-black">
                      We build clean, modern websites tailored to your goals.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="fixed top-1/2 right-2 -translate-y-1/2 flex flex-col gap-2 z-50">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="bg-indigo-700/50 text-white border-white/20 hover:bg-indigo-700 hover:text-white p-6 rounded-xl"
                    aria-label={
                      isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                    }>
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setActiveVideo(null)}
                    className="bg-indigo-700/50 text-white border-white/20 hover:bg-indigo-700 hover:text-white p-6 rounded-xl"
                    aria-label="Close video">
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Close video</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="w-full h-full p-1">
            <iframe
              src={activeVideo}
              title="Video Solution"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}
