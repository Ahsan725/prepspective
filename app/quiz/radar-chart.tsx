"use client";

import { useEffect, useState } from "react";

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarChartProps {
  data: {
    subject: string;

    score: number;

    fullMark: number;
  }[];
}

export function RadarChart({ data }: RadarChartProps) {
  const [mounted, setMounted] = useState(false);

  // This ensures the chart only renders on the client side

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#e5e7eb" />

        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#6b7280", fontSize: 12 }}
        />

        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: "#6b7280", fontSize: 10 }}
        />

        <Tooltip
          formatter={(value) => [`${value}%`, "Score"]}
          contentStyle={{
            backgroundColor: "white",

            borderRadius: "0.375rem",

            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",

            border: "none",
          }}
        />

        <Radar
          name="Score"
          dataKey="score"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.6}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
