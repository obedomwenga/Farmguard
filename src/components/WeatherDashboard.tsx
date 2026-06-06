import React from "react";
import { GeoLocation, WeatherData, FarmInsights } from "@/types";
import { Thermometer, Wind, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui";

interface Props {
  location: GeoLocation;
  weather: WeatherData;
  insights: FarmInsights;
}

export function WeatherDashboard({ location, weather, insights }: Props) {
  // Extract specific times for the timeline: Morning (9am), Afternoon (2pm), Evening (6pm), Night (10pm)
  const timelineIndexes = [9, 14, 18, 22]; // Assuming hourly array starts at midnight
  const timelineSegments = timelineIndexes.map(idx => {
    const hourData = weather.hourly[idx] || weather.hourly[0];
    const timeLabel = idx === 9 ? "Morning" : idx === 14 ? "Afternoon" : idx === 18 ? "Evening" : "Night";
    return {
      time: timeLabel,
      temp: hourData ? hourData.temp : 0,
      precip: hourData ? hourData.precipitation : 0,
      wind: hourData ? hourData.wind_speed : 0
    };
  });

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <h3 className="font-display font-medium text-xl text-text-primary tracking-tight">Today's Microclimate</h3>
      </CardHeader>
      <CardContent>
        {/* Horizontal Timeline */}
        <div className="relative">
          <div className="absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-border z-0" />
          
          <div className="grid grid-cols-4 gap-4 relative z-10 w-full">
            {timelineSegments.map((seg, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
                  {seg.time}
                </div>
                
                <div className="w-4 h-4 rounded-full bg-white border-2 border-primary my-2 shadow-sm relative">
                   <div className="absolute inset-0.5 rounded-full bg-primary opacity-20" />
                </div>
                
                <div className="mt-4 bg-background border border-border rounded-2xl p-4 w-full max-w-[140px] flex flex-col items-center shadow-soft">
                  <div className="text-2xl font-display font-semibold text-text-primary mb-2">
                    {seg.temp}°C
                  </div>
                  <div className="flex gap-3 text-sm text-text-secondary">
                     <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5" />{seg.precip}mm</span>
                     <span className="flex items-center gap-1"><Wind className="w-3.5 h-3.5" />{seg.wind}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 border-t border-border pt-8">
           <div className="flex flex-col">
             <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Max Temperature</span>
             <span className="text-3xl font-display text-text-primary">{weather.daily[0]?.temp_max}°C</span>
           </div>
           <div className="flex flex-col">
             <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Avg Humidity</span>
             <span className="text-3xl font-display text-text-primary">{weather.current.humidity}%</span>
           </div>
           <div className="flex flex-col">
             <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Max Wind Gusts</span>
             <span className="text-3xl font-display text-text-primary">{weather.daily[0]?.wind_max} <span className="text-lg">km/h</span></span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
