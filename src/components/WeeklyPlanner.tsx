import React from "react";
import { FarmInsights, WeatherData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui";
import { format, addDays } from "date-fns";

export function WeeklyPlanner({ insights, weather }: { insights: FarmInsights, weather: WeatherData }) {
  const today = new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-display text-text-primary tracking-tight">7-Day Farm Planner</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.weeklyPlan.map((plan, idx) => {
            const date = addDays(today, plan.dayIndex);
            const dateStr = format(date, "EEEE, MMM d");
            const d = weather.daily[plan.dayIndex] || weather.daily[weather.daily.length - 1];
            const tempMax = d?.temp_max || "--";
            const tempMin = d?.temp_min || "--";
            const rainProb = d?.precipitation_probability || "--";
            
            return (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-[16px] hover:bg-black/5 transition-colors">
                <div className="flex-1">
                  <div className="font-semibold text-text-primary">
                    {plan.dayIndex === 0 ? "Today" : plan.dayIndex === 1 ? "Tomorrow" : dateStr}
                  </div>
                  <div className="text-[14px] text-primary font-medium mt-1 leading-snug tracking-tight">
                    {plan.action}
                  </div>
                </div>
                <div className="flex gap-6 mt-4 sm:mt-0 text-[14px] text-text-secondary">
                  <div className="flex flex-col items-end">
                    <span className="font-mono text-text-primary">{tempMax}° / {tempMin}°</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Temp</span>
                  </div>
                  <div className="flex flex-col items-end w-16">
                    <span className="font-mono text-text-primary">{rainProb}%</span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold">Rain Prob</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
