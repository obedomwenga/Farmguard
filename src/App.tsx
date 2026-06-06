import React, { useState, useEffect } from "react";
import { AppState, GeoLocation } from "@/types";
import { ArrowLeft, Loader2, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui";
import { WeatherDashboard } from "@/components/WeatherDashboard";
import { FarmAdvisor } from "@/components/FarmAdvisor";
import { WeeklyPlanner } from "@/components/WeeklyPlanner";
import { RiskDashboard } from "@/components/RiskDashboard";
import { ChatAssistant } from "@/components/ChatAssistant";
import { useAuth } from "@/components/AuthProvider";
import { Navigation } from "@/components/Navigation";
import { LandingView } from "@/components/LandingView";
import { FarmManager } from "@/components/FarmManager";

import { SprayWindows } from "@/components/SprayWindows";
import { CropAnalyzer } from "@/components/CropAnalyzer";

const getWeatherBgImage = (weather: any) => {
  if (!weather || !weather.current) {
    return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000";
  }
  const icon = (weather.current.icon || "").toLowerCase();
  const condition = (weather.current.condition_code || "").toLowerCase();
  const path = (weather.current.icon_path || "").toLowerCase();
  
  let isNight = false;
  try {
    const timeStr = weather.current.time;
    if (timeStr) {
      const hour = new Date(timeStr).getHours();
      if (hour < 6 || hour > 19) {
        isNight = true;
      }
    }
  } catch (e) {
    const hour = new Date().getHours();
    if (hour < 6 || hour > 19) {
      isNight = true;
    }
  }

  const query = `${icon} ${condition} ${path}`;

  if (isNight) {
    if (query.includes("rain") || query.includes("drizzle") || query.includes("showers")) {
      return "https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=2000";
    }
    if (query.includes("cloud") || query.includes("overcast") || query.includes("fog") || query.includes("mist")) {
      return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000";
    }
    return "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=2000";
  }

  if (query.includes("storm") || query.includes("thunder") || query.includes("lightning")) {
    return "https://images.unsplash.com/photo-1461088945293-0c17689e48ac?q=80&w=2000";
  }
  if (query.includes("rain") || query.includes("drizzle") || query.includes("showers")) {
    return "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=2000";
  }
  if (query.includes("snow") || query.includes("ice") || query.includes("frost")) {
    return "https://images.unsplash.com/photo-1485594050903-8e8ee7b071a8?q=80&w=2000";
  }
  if (query.includes("cloud") || query.includes("overcast") || query.includes("fog") || query.includes("mist")) {
    return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000";
  }
  if (query.includes("wind") || query.includes("breeze")) {
    return "https://images.unsplash.com/photo-1470116942485-529226931d7e?q=80&w=2000";
  }
  
  return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000";
};

export default function App() {
  const { user, signIn } = useAuth();
  const [isDemo, setIsDemo] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const [appState, setAppState] = useState<AppState>({
    location: null,
    crop: "Maize",
    weather: null,
    insights: null,
    isLoading: false,
  });

  const loadInsights = async () => {
    if (!appState.location) return;
    setAppState(prev => ({ ...prev, isLoading: true }));
    try {
      const resp = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: appState.location.latitude,
          lon: appState.location.longitude,
          crop: appState.crop,
        })
      });
      const data = await resp.json();
      setAppState(prev => ({
        ...prev,
        weather: data.weather,
        insights: data.insights,
        isLoading: false,
      }));
    } catch (e) {
      console.error(e);
      setAppState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    if (appState.location) {
      loadInsights();
    }
  }, [appState.location, appState.crop]);

  const handleSelectFarm = (farm: any) => {
    setAppState(prev => ({
      ...prev,
      crop: farm.crop,
      location: {
        id: farm.id,
        name: farm.name,
        latitude: farm.latitude,
        longitude: farm.longitude,
        country: "Farm Location",
      }
    }));
  };

  const handleBackToFarms = () => {
    setAppState(prev => ({
      ...prev,
      location: null,
      weather: null,
      insights: null
    }));
  };

  const handleStartDemo = () => {
    setIsDemo(true);
  };

  const handleExitDemo = () => {
    setIsDemo(false);
    setAppState({
      location: null,
      crop: "Maize",
      weather: null,
      insights: null,
      isLoading: false,
    });
  };

  if (!user && !isDemo) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation onStartDemo={handleStartDemo} isDemo={isDemo} />
        <LandingView onSignIn={signIn} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background w-full relative">
      <Navigation onStartDemo={handleStartDemo} isDemo={isDemo} onExitDemo={handleExitDemo} />

      <main className="flex-1 w-full flex flex-col pt-[96px] relative">
        {!appState.location ? (
          <div className="max-w-[1440px] mx-auto px-6 w-full py-12 relative z-10">
            <FarmManager onSelectFarm={handleSelectFarm} isDemo={isDemo} />
          </div>
        ) : (
          <div className="relative w-full">
            {/* dynamic weather background with gradient shader mask */}
            {appState.weather && (
              <div className="absolute top-0 left-0 right-0 h-[480px] z-0 pointer-events-none overflow-hidden select-none opacity-20 transition-all duration-1000">
                <img 
                  src={getWeatherBgImage(appState.weather)} 
                  className="w-full h-full object-cover filter blur-[2px]" 
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FCFBF8]/70 to-[#FCFBF8]" />
              </div>
            )}

            <div className="max-w-[1440px] mx-auto px-6 space-y-12 w-full py-12 relative z-10">
              {/* Premium agricultural farm header banner */}
              <div 
                className="relative w-full rounded-[32px] overflow-hidden shadow-medium p-8 md:p-12 bg-cover bg-center bg-no-repeat min-h-[200px] flex flex-col justify-between"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop")' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/35 z-0" />
                <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <Button variant="outline" className="h-10 text-sm px-4 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-full" onClick={handleBackToFarms}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Farms
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-display text-white font-bold tracking-tight">
                      {appState.location.name}
                    </h2>
                    <div className="flex items-center gap-2 text-white/90 font-medium">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">{appState.crop}</span>
                      <span className="text-white/60">•</span>
                      <span className="text-sm font-mono">{appState.location.latitude.toFixed(4)}, {appState.location.longitude.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {appState.isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 text-text-secondary">
                  <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                  <p className="text-lg">Analyzing farm micro-climate and generating advisory...</p>
                </div>
              ) : appState.weather && appState.insights ? (
                <div className="space-y-12">
                  <WeatherDashboard location={appState.location} weather={appState.weather} insights={appState.insights} />
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-3 space-y-8">
                      <FarmAdvisor insights={appState.insights} />
                      <SprayWindows location={appState.location} />
                      <CropAnalyzer />
                      <RiskDashboard insights={appState.insights} />
                      <WeeklyPlanner insights={appState.insights} weather={appState.weather} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>

      {/* Floating Chat Assistant toggle button & modal */}
      {appState.location && !appState.isLoading && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          {isChatOpen && (
            <div className="w-[360px] sm:w-[420px] h-[550px] mb-4 shadow-large rounded-[32px] border border-border overflow-hidden bg-background animate-in slide-in-from-bottom-5 duration-300 relative">
              <ChatAssistant appState={appState} onClose={() => setIsChatOpen(false)} />
            </div>
          )}
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary-hover text-white shadow-large flex items-center justify-center transition-all duration-300 hover:scale-[1.05] relative cursor-pointer outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            title="Chat with Advisor"
          >
            {isChatOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageSquare className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      )}
      
      <footer className="py-12 bg-surface mt-auto w-full relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center justify-center space-y-4 text-center text-[14px] text-text-secondary">
           <div className="font-display text-xl text-text-primary">FarmGuard AI</div>
           <div>&copy; 2026 FarmGuard AI. Weather intelligence simplified.</div>
        </div>
      </footer>
    </div>
  );
}

