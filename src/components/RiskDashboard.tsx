import React, { useState } from "react";
import { FarmInsights } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, Button } from "./ui";
import { useAuth } from "./AuthProvider";
import { Phone, Check, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function RiskDashboard({ insights }: { insights: FarmInsights }) {
  const { userProfile, user } = useAuth();
  const [sendingAlert, setSendingAlert] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  
  const isDemo = !user;
  const phoneNumber = userProfile?.phone || (isDemo ? "+1234567890" : "");

  const getBadgeStyle = (level: string) => {
    if (level === "Low") return "bg-[#355E3B]/10 text-primary border border-primary/20";
    if (level === "Medium") return "bg-[#E4B84C]/20 text-[#6A6A6A] border border-[#E4B84C]/30";
    return "bg-[#C48B5A]/20 text-[#C48B5A] border border-[#C48B5A]/20";
  };

  const getCardStyle = (level: string) => {
    if (level === "High" || level === "Critical") return "bg-[#C48B5A]/5 border-[#C48B5A]/20";
    return "bg-black/5 border-border";
  };

  const risks = [
    { name: "Rain", level: insights.risks.rainRisk },
    { name: "Flood", level: insights.risks.floodRisk },
    { name: "Heat Stress", level: insights.risks.heatStressRisk },
    { name: "Wind", level: insights.risks.windDamageRisk },
    { name: "Disease", level: insights.risks.diseaseRisk },
  ];

  const highestRisk = risks.find(r => r.level === "Critical" || r.level === "High")?.name || "Active Risk";

  const handleSendSms = async () => {
    if (!phoneNumber) return;
    setSendingAlert(true);
    
    if (isDemo) {
      setTimeout(() => {
        setAlertSent(true);
        setSendingAlert(false);
        setTimeout(() => setAlertSent(false), 3000);
      }, 1000);
      return;
    }
    
    try {
      await fetch('/api/sms/alert', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: phoneNumber,
          alertType: "rain", // default mapped type
          data: { risk: highestRisk }
        })
      });
      setAlertSent(true);
      setTimeout(() => setAlertSent(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSendingAlert(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4 bg-[#FCFBF8] border-b border-border">
        <CardTitle className="text-xl font-display text-text-primary tracking-tight">Agricultural Risk Dashboard</CardTitle>
        <div className="flex items-center gap-2">
          {phoneNumber ? (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleSendSms} 
              disabled={sendingAlert || alertSent}
              className="text-text-primary bg-white hover:bg-black/5 border border-border"
            >
              {sendingAlert ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : alertSent ? <Check className="w-4 h-4 mr-2" /> : <Phone className="w-4 h-4 mr-2" />}
              {alertSent ? "Alert Sent" : "Test SMS Alert"}
            </Button>
          ) : (
            <div className="text-xs text-text-secondary bg-black/5 px-3 py-1.5 flex items-center gap-2 rounded-full font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> Add phone in Farm Manager for SMS
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {risks.map((risk, idx) => (
            <div key={idx} className={cn("flex flex-col items-center p-6 border-2 rounded-2xl", getCardStyle(risk.level))}>
              <div className="text-[12px] font-semibold tracking-wider uppercase text-text-secondary mb-4">{risk.name}</div>
              <div className={cn("px-3 py-1 rounded-full text-xs font-bold", getBadgeStyle(risk.level))}>{risk.level}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
