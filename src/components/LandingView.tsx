import React from "react";
import { motion } from "motion/react";
import { Droplet, Leaf, Wind, CloudLightning, CloudRain, Sun, ShieldAlert } from "lucide-react";
import { Button } from "./ui";

interface LandingViewProps {
  onSignIn: () => void;
}

export function LandingView({ onSignIn }: LandingViewProps) {
  return (
    <div className="w-full bg-[#FCFBF8] text-[#1A1A1A] flex flex-col font-sans overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-6 pb-16">
        <div className="relative h-[85vh] min-h-[620px] w-full rounded-[48px] overflow-hidden shadow-large flex flex-col items-center justify-center p-8 md:p-16 text-center">
          
          {/* Hero Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform hover:scale-102 transition-transform duration-1000 ease-primary"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2000&auto=format&fit=crop")' }}
          >
            {/* Ambient Dark Overlay for Typography Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10" />
          </div>

          {/* Centered Headline Content */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans font-bold text-white text-[52px] md:text-[80px] lg:text-[96px] leading-[1.05] tracking-tight mb-8"
            >
              Every Season<br />Starts With<br />Better Decisions.
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="z-10"
            >
              <Button 
                onClick={onSignIn} 
                className="bg-[#355E3B] hover:bg-[#2C4E31] text-white hover:scale-102 transition-all duration-300 shadow-medium h-[56px] px-8 text-[16px] rounded-full font-medium"
              >
                Explore Your Farm's Future
              </Button>
            </motion.div>
          </div>

          {/* Glassmorphic Telemetry Widgets (Right Aligned) */}
          <div className="absolute bottom-12 right-12 hidden lg:flex flex-col gap-4 z-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-5 flex items-center gap-4 text-white shadow-soft min-w-[220px]"
            >
              <div className="bg-white/15 rounded-full p-2.5 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Live Data</div>
                <div className="text-[17px] font-medium tracking-tight">TEMP: 52°F</div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-5 flex items-center gap-4 text-white shadow-soft min-w-[220px]"
            >
              <div className="bg-white/15 rounded-full p-2.5 flex items-center justify-center">
                <Droplet className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs text-white/70 uppercase tracking-wider font-semibold">Telemetry</div>
                <div className="text-[17px] font-medium tracking-tight">MOISTURE: 85%</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FARM PLANNING SECTION */}
      <section id="solutions" className="w-full bg-[#FCFBF8] py-24 md:py-40 px-6 md:px-12 border-b border-[#ECE7DE]/50">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center text-xs font-bold tracking-[0.2em] uppercase text-[#6A6A6A] mb-16">
            Farm Planning
          </div>
          
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Col - Content */}
            <div className="lg:col-span-5 space-y-12">
              <h2 className="font-display text-5xl md:text-7xl text-[#1A1A1A] leading-[1.1] tracking-tight">
                Intelligent Farm Planning
              </h2>
              
              <div className="rounded-[32px] overflow-hidden shadow-medium max-w-md h-[260px] md:h-[320px] relative border border-[#ECE7DE]">
                <img 
                  src="https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=1000&auto=format&fit=crop" 
                  className="w-full h-full object-cover" 
                  alt="Farmer checking crop health data on tablet" 
                />
              </div>

              <p className="font-display text-2xl md:text-3xl text-[#243126] pl-6 border-l-4 border-[#C48B5A] leading-snug italic">
                "Sustainable Growth Through Data"
              </p>
            </div>

            {/* Right Col - High Fidelity Mock UI */}
            <div className="lg:col-span-7 relative rounded-[40px] overflow-hidden h-[540px] md:h-[620px] shadow-medium border border-[#ECE7DE] bg-[#E1EDD9] p-6 md:p-10 flex flex-col justify-end group">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-[1.03] transition-transform duration-1000 ease-primary" 
                alt="Aerial view of green crop sectors" 
              />
              
              {/* GIS Mock Dashboard Card */}
              <div className="relative z-10 w-full bg-white/95 backdrop-blur-md rounded-[32px] border border-[#ECE7DE] shadow-large overflow-hidden flex flex-col h-[420px] md:h-[480px] transform group-hover:-translate-y-2 transition-transform duration-500 ease-primary">
                
                {/* Browser Title Bar */}
                <div className="h-14 border-b border-[#ECE7DE]/50 flex items-center justify-between px-6 bg-white/80">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#E4B84C]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#719B77]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#C48B5A]"></div>
                    </div>
                    <span className="font-medium text-sm text-[#243126]">Interactive Farm Map</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4D8B55] animate-pulse"></span>
                    <span className="text-[11px] font-semibold text-[#6A6A6A] uppercase tracking-wider">Live Telemetry</span>
                  </div>
                </div>

                {/* Dashboard Panels */}
                <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 overflow-hidden">
                  {/* GIS Field Map Panel */}
                  <div className="flex-1 rounded-2xl overflow-hidden relative shadow-inner border border-[#ECE7DE] min-h-[160px] md:min-h-auto">
                    <img 
                      src="https://images.unsplash.com/photo-1586771107445-d3af9e147e09?q=80&w=800&auto=format&fit=crop" 
                      className="w-full h-full object-cover" 
                      alt="Crop parcel map" 
                    />
                    
                    {/* SVG overlay polygon representations */}
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      {/* Sector A */}
                      <div className="w-2/3 h-[45%] bg-[#355E3B]/20 border-2 border-[#355E3B] rounded-xl flex flex-col items-center justify-center text-white shadow-sm backdrop-blur-[1px] p-2">
                        <span className="font-bold text-[13px] tracking-wide">Sector A</span>
                        <span className="text-[10px] text-white/90">Wheat · Healthy</span>
                      </div>
                      
                      {/* Sector B */}
                      <div className="w-[80%] h-[40%] bg-[#E4B84C]/25 border-2 border-[#E4B84C] rounded-xl flex flex-col items-center justify-center text-white shadow-sm backdrop-blur-[1px] p-2 ml-auto">
                        <span className="font-bold text-[13px] tracking-wide">Sector B</span>
                        <span className="text-[10px] text-white/90">Barley · Warning</span>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Data Panel */}
                  <div className="w-full md:w-[240px] flex flex-col gap-4 overflow-y-auto pr-1">
                    {/* Crop Rotation Schedule */}
                    <div className="bg-[#FCFBF8] rounded-2xl p-4 border border-[#ECE7DE] shadow-soft">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6A6A6A] mb-3">Crop Schedule</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#355E3B]"></span>
                            <span className="text-xs font-semibold text-[#1A1A1A]">Wheat</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#6A6A6A]">Jul 12</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#E4B84C]"></span>
                            <span className="text-xs font-semibold text-[#1A1A1A]">Corn</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#6A6A6A]">Sep 05</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#C48B5A]"></span>
                            <span className="text-xs font-semibold text-[#1A1A1A]">Soybeans</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#6A6A6A]">Oct 20</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Advisory Summary */}
                    <div className="bg-[#355E3B]/5 rounded-2xl p-4 border border-[#355E3B]/25">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#355E3B] mb-2">Advisory</h4>
                      <p className="text-[11px] text-[#5D5D5D] leading-relaxed">
                        Delay irrigation in Sector B. Incoming rain within 48h. Estimated savings: <span className="font-semibold text-[#355E3B]">40K Liters</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WEATHER INTELLIGENCE SECTION */}
      <section className="w-full bg-[#FCFBF8] py-24 md:py-40 px-6 md:px-12 border-b border-[#ECE7DE]/50">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center text-xs font-bold tracking-[0.2em] uppercase text-[#6A6A6A] mb-16">
            Weather Intelligence
          </div>
          
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Col - Content */}
            <div className="lg:col-span-5 space-y-8 lg:order-2">
              <h2 className="font-display text-5xl md:text-7xl text-[#1A1A1A] leading-[1.1] tracking-tight">
                Advanced Weather Intelligence
              </h2>
              
              <p className="text-[18px] text-[#5D5D5D] font-light leading-relaxed max-w-md pl-6 border-l-2 border-[#ECE7DE]">
                Live weather parameters and soil moisture telemetry delivered directly to your dashboard. Avoid surprises by having high-resolution data exactly when you need it.
              </p>
            </div>

            {/* Right Col - High Fidelity Mock UI */}
            <div className="lg:col-span-7 relative rounded-[40px] overflow-hidden h-[540px] md:h-[620px] shadow-medium border border-[#ECE7DE] bg-[#2E3532] p-6 md:p-10 flex flex-col justify-end group lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1200&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-[1.03] transition-transform duration-1000 ease-primary" 
                alt="Storm over agricultural field" 
              />
              
              {/* Weather Radar Mock Card */}
              <div className="relative z-10 w-full bg-[#FCFBF8]/95 backdrop-blur-md rounded-[32px] border border-white/20 shadow-large overflow-hidden flex flex-col h-[420px] md:h-[480px] transform group-hover:-translate-y-2 transition-transform duration-500 ease-primary">
                
                {/* Header */}
                <div className="h-14 border-b border-[#ECE7DE]/50 flex items-center justify-between px-6 bg-white/80">
                  <div className="flex items-center gap-2 font-medium text-sm text-[#243126]">
                    <Wind className="w-4 h-4 text-[#355E3B]" />
                    <span>Live Weather Dashboard</span>
                  </div>
                  <span className="bg-[#D96B4E]/10 text-[#D96B4E] text-[10px] px-3 py-1 rounded-full font-bold tracking-wider border border-[#D96B4E]/20 flex items-center gap-1.5 animate-pulse">
                    <ShieldAlert className="w-3.5 h-3.5" /> STORM WARNING
                  </span>
                </div>

                {/* Main Body */}
                <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 overflow-hidden">
                  {/* Radar Screen Area */}
                  <div className="flex-1 rounded-2xl overflow-hidden relative shadow-inner bg-[#1A231C] border border-[#ECE7DE]/30 min-h-[160px] md:min-h-auto">
                    <img 
                      src="https://images.unsplash.com/photo-1498354136128-58f790218158?q=80&w=800&auto=format&fit=crop" 
                      className="w-full h-full object-cover opacity-25 mix-blend-luminosity" 
                      alt="Local topography vector map" 
                    />
                    
                    {/* Glowing weather cells */}
                    <div className="absolute top-1/4 left-1/3 w-36 h-36 bg-red-500/35 rounded-full blur-[35px] animate-pulse" />
                    <div className="absolute top-[20%] left-[25%] w-52 h-52 bg-yellow-500/25 rounded-full blur-[30px]" />
                    <div className="absolute top-[35%] left-[40%] w-24 h-24 bg-green-500/35 rounded-full blur-[20px]" />
                    
                    {/* Ping Indicator */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-xl text-white font-mono text-[9px] uppercase tracking-wider flex items-center gap-2 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      High Severity Cell
                    </div>
                  </div>

                  {/* Right Panel */}
                  <div className="w-full md:w-[240px] flex flex-col gap-4 overflow-y-auto pr-1">
                    {/* Soil Moisture telemetry */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ECE7DE] shadow-soft">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6A6A6A] mb-2">Soil Moisture</h4>
                      <div className="flex items-baseline gap-1 text-[#355E3B] font-display text-4xl font-semibold leading-none">
                        42<span className="text-sm font-sans font-medium text-[#6A6A6A]">%</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-[#ECE7DE] text-[10px] text-[#5D5D5D] leading-snug">
                        Optimal range: <span className="font-semibold text-[#1A1A1A]">45-55%</span>. Irrigation recommended.
                      </div>
                    </div>

                    {/* Compact Forecast list */}
                    <div className="bg-white rounded-2xl p-4 border border-[#ECE7DE] shadow-soft flex-1 min-h-[140px]">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#6A6A6A] mb-3">3-Day Outlook</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#1A1A1A]">
                          <span className="font-medium w-8">Mon</span>
                          <CloudLightning className="w-4 h-4 text-[#C48B5A]" />
                          <span className="font-mono text-[11px] text-right w-12">72°F / 85%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#1A1A1A]">
                          <span className="font-medium w-8">Tue</span>
                          <CloudRain className="w-4 h-4 text-[#78BCE6]" />
                          <span className="font-mono text-[11px] text-right w-12">68°F / 60%</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#1A1A1A]">
                          <span className="font-medium w-8">Wed</span>
                          <Sun className="w-4 h-4 text-[#E4B84C]" />
                          <span className="font-mono text-[11px] text-right w-12">75°F / 10%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Centered Quote at bottom */}
          <div className="mt-20 text-center">
            <p className="font-display text-3xl md:text-4xl text-[#243126] italic">
              "Anticipate. Prepare. Thrive."
            </p>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY SECTION */}
      <section id="story" className="w-full bg-[#F8F5F0] py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A] tracking-tight">
              Cultivating a Sustainable Future, Guided by Intelligence.
            </h2>
            <p className="text-md text-[#5D5D5D] leading-relaxed max-w-xl">
              At FarmGuard AI, we believe agricultural longevity is powered by precision telemetry. Our mission is to translate complex climate science and machine learning models into simple, actionable daily directives, helping growers optimize seed density, reduce water overhead, and mitigate frost risks.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="bg-[#355E3B] text-white p-8 md:p-12 rounded-[40px] shadow-medium space-y-6 relative overflow-hidden">
              {/* Subtle background flow graphic representation */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
              
              <h3 className="font-display text-2xl md:text-3xl text-[#FCFBF8]">The FarmGuard Pledge</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                "We pledge to support agricultural communities globally by providing access to localized weather models and automated risk assessment algorithms. Preparedness breeds resilience."
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <span className="text-xs tracking-wider uppercase text-white/60">Earth Pulse v1.0 Framework</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="w-full bg-[#C48B5A] text-white pt-24 pb-10 px-6 md:px-12 overflow-hidden relative border-t border-[#C48B5A]/25">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
            {/* Column 1: Home */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-[#FCFBF8]">Home</h3>
              <ul className="space-y-3 text-white/80 text-[15px]">
                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Good</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
              </ul>
            </div>
            
            {/* Column 2: Links */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-[#FCFBF8]">Links</h3>
              <ul className="space-y-3 text-white/80 text-[15px]">
                <li><a href="#" className="hover:text-white transition-colors">Organization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog posts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>

            {/* Column 3: Pledge */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-[#FCFBF8]">Cultivating a Sustainable Future</h3>
              <p className="text-white/95 text-[15px] leading-relaxed max-w-sm mt-4">
                Cultivating a sustainable future starts with conscious choices. Empowering farmers worldwide through actionable weather intelligence and precision agricultural data.
              </p>
              
              <div className="mt-8 flex gap-4">
                 <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 shadow-sm border border-white/20">
                   <img src="https://images.unsplash.com/photo-1592982537447-6f228c253ff6?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                 </div>
                 <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 shadow-sm border border-white/20">
                   <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
                 </div>
              </div>
            </div>
            
            {/* Column 4: Newsletter */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-[#FCFBF8]">Newsletter</h3>
              <p className="text-white/95 text-[15px] mt-4 max-w-sm">
                Receive daily resilience strategies and agricultural updates to your inbox.
              </p>
              <form 
                onSubmit={(e) => { e.preventDefault(); alert("Mock Event: Newsletter Subscription Saved."); }}
                className="flex mt-6 bg-white/10 rounded-full overflow-hidden border border-white/20 p-1.5 focus-within:bg-white/20 transition-all duration-300"
              >
                <input 
                  type="email" 
                  required
                  placeholder="Email address" 
                  className="bg-transparent border-none text-white px-4 py-2 text-sm w-full outline-none placeholder:text-white/60" 
                />
                <button 
                  type="submit"
                  className="bg-[#FCFBF8] text-[#C48B5A] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white transition-colors shadow-sm whitespace-nowrap"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
          
          {/* Copyright row */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/20 text-[13px] text-white/70">
            <div className="flex items-center gap-2">
              <span className="font-display text-lg text-white">FarmGuard AI</span>
              <span className="opacity-50">|</span>
              <span>&copy; 2026. All rights reserved.</span>
            </div>
            <div className="mt-4 md:mt-0 flex gap-8 font-medium">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
