import React, { useEffect, useState } from "react";
import { GeoLocation } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui";
import { Loader2, Wind, Droplets, Thermometer, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function SprayWindows({ location }: { location: GeoLocation }) {
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHourly() {
      setLoading(true);
      try {
        const resp = await fetch(`/api/weather/hourly?lat=${location.latitude}&lon=${location.longitude}`);
        const data = await resp.json();
        // Assume next 8 hours for a cleaner UI fit
        setHourlyData(data.slice(0, 8));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadHourly();
  }, [location]);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 flex justify-center text-text-secondary">
          <Loader2 className="w-6 h-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!hourlyData || hourlyData.length === 0) {
    return null; // hide if no data
  }

  const isIdeal = (h: any) => {
    const temp = h.temperature || 0;
    const wind = h.wind_speed || 0;
    const precipProb = h.precipitation_probability || 0;
    return temp >= 15 && temp <= 30 && wind < 15 && precipProb < 30;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-display text-text-primary tracking-tight">Spraying Windows</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {hourlyData.map((h, i) => {
            const time = new Date();
            time.setHours(time.getHours() + i);
            const ideal = isIdeal(h);

            return (
              <div key={i} className={cn(
                "p-4 rounded-2xl border-2 flex flex-col justify-between space-y-4", 
                ideal ? "bg-[#719B77]/10 border-[#719B77]/20" : "bg-black/5 border-border shrink-0"
              )}>
                <div className="flex justify-between items-start">
                  <div className="text-[14px] font-semibold text-text-primary font-mono tracking-tighter">
                    {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                  </div>
                  {ideal ? (
                    <span className="text-[#355E3B] bg-[#355E3B]/10 p-1 rounded-full"><CheckCircle2 className="w-4 h-4" /></span>
                  ) : (
                    <span className="text-text-secondary bg-black/10 p-1 rounded-full"><XCircle className="w-4 h-4" /></span>
                  )}
                </div>
                <div className="flex flex-col gap-1 text-[12px] text-text-secondary font-medium tracking-tight">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5" /> Temp</span>
                    <span>{h.temperature}°</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1"><Wind className="w-3.5 h-3.5" /> Wind</span>
                    <span>{h.wind_speed}km/h</span>
                  </div>
                </div>
                
                <div className={cn(
                  "text-[10px] uppercase tracking-wider font-bold w-full text-center py-1.5 rounded-full",
                  ideal ? "bg-[#355E3B] text-white" : "bg-text-secondary/10 text-text-secondary"
                )}>
                  {ideal ? "Ideal" : "Avoid"}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
