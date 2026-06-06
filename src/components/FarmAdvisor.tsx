import React from "react";
import { FarmInsights } from "@/types";
import { Card, CardContent } from "./ui";
import { AlertTriangle, CheckCircle, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function FarmAdvisor({ insights }: { insights: FarmInsights }) {
  const getRiskStyle = (level: string) => {
    switch (level) {
      case "Low": 
        return { wrapper: "bg-[#719B77]/10", border: "border-[#719B77]/30", icon: "text-[#355E3B]", pill: "bg-[#355E3B]/10 text-[#355E3B]" };
      case "Medium": 
        return { wrapper: "bg-[#F0C85E]/10", border: "border-[#F0C85E]/30", icon: "text-[#6A6A6A]", pill: "bg-[#F0C85E]/30 text-[#6A6A6A]" };
      case "High": 
      case "Critical": 
        return { wrapper: "bg-[#C48B5A]/10", border: "border-[#C48B5A]/30", icon: "text-[#C48B5A]", pill: "bg-[#C48B5A]/20 text-[#C48B5A]" };
      default: 
        return { wrapper: "bg-[#719B77]/10", border: "border-[#719B77]/30", icon: "text-[#355E3B]", pill: "bg-[#355E3B]/10 text-[#355E3B]" };
    }
  };

  const style = getRiskStyle(insights.advisor.riskLevel);
  const isSafe = insights.advisor.riskLevel === "Low";

  return (
    <Card className={cn("overflow-hidden border-2", style.wrapper, style.border)}>
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="flex-1 space-y-4">
             <div className="flex items-center gap-3">
               {isSafe ? <ShieldCheck className={cn("h-8 w-8", style.icon)} /> : <AlertTriangle className={cn("h-8 w-8", style.icon)} />}
               <div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-text-primary">
                    Farm Advisory
                  </h3>
               </div>
             </div>

             <div className="text-xl md:text-2xl text-text-primary font-medium tracking-tight">
               {insights.advisor.today}
             </div>
             
             {insights.advisor.warnings.length > 0 && (
               <ul className="space-y-2 mt-4 text-text-secondary">
                 {insights.advisor.warnings.map((w, idx) => (
                   <li key={idx} className="flex items-start gap-2">
                     <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-text-secondary flex-shrink-0" />
                     <span>{w}</span>
                   </li>
                 ))}
               </ul>
             )}
          </div>

          <div className="flex flex-col gap-4 min-w-[200px]">
             <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
                <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Risk Level</div>
                <div className={cn("inline-flex px-3 py-1 rounded-full text-sm font-semibold mb-4", style.pill)}>
                  {insights.advisor.riskLevel} Risk
                </div>
                
                <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-1">Confidence Score</div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-display font-semibold text-text-primary">92</span>
                  <span className="text-text-secondary mb-1">%</span>
                </div>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
