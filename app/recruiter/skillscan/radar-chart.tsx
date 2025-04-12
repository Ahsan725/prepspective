"use client";

import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
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
        <PolarGrid stroke="#393AA8" strokeDasharray="3 3" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={false} // Hide the radial axis labels (e.g. 50, 75, 100)
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#4338CA"
          fill="#4338CA"
          fillOpacity={0.6}
          animationDuration={1200}
          dot={{ fill: "#4338CA", stroke: "#4338CA", r: 2 }}
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
