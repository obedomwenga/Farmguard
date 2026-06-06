import React, { useState } from "react";
import { LogIn, LogOut, User, Play, X, Send, CheckCircle2 } from "lucide-react";
import { Button } from "./ui";
import { useAuth } from "./AuthProvider";

interface NavigationProps {
  onStartDemo?: () => void;
  isDemo?: boolean;
  onExitDemo?: () => void;
}

export function Navigation({ onStartDemo, isDemo, onExitDemo }: NavigationProps) {
  const { user, signIn, logOut, userProfile } = useAuth();
  const [showContact, setShowContact] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const inAppMode = user || isDemo;

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setShowContact(false);
        setContactForm({ name: "", email: "", message: "" });
      }, 2500);
    }, 1200);
  };

  // 1. In-App Header (Dashboard Mode)
  if (inAppMode) {
    return (
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent text-text-primary">
        <div className="max-w-[1440px] mx-auto px-6 h-[96px] flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-medium text-2xl tracking-tight text-[#243126]">
            FarmGuard AI
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex text-sm font-medium bg-white/50 backdrop-blur-md px-4 py-2 rounded-full items-center gap-2 border border-border">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-text-primary">{userProfile?.name || user.displayName || user.email}</span>
                </div>
                <Button variant="outline" onClick={logOut} className="h-10 text-sm px-4 bg-white/50 backdrop-blur-md border-border text-text-primary hover:bg-white transition-all shadow-sm">
                  <LogOut className="h-4 w-4 mr-2 text-primary" />
                  Log Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex text-sm font-medium bg-[#E4B84C]/20 text-[#6A6A6A] border border-[#E4B84C]/30 backdrop-blur-md px-4 py-2 rounded-full items-center gap-2">
                  <Play className="h-4 w-4 text-[#C48B5A]" />
                  Demo Mode
                </div>
                <Button variant="outline" onClick={onExitDemo} className="h-10 text-sm px-4 bg-white/50 backdrop-blur-md border-border text-text-primary hover:bg-white transition-all shadow-sm">
                  <LogOut className="h-4 w-4 mr-2 text-[#C48B5A]" />
                  Exit Demo
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // 2. Landing Page Header
  return (
    <>
      <header className="w-full bg-[#FCFBF8] border-b border-[#E8E3D8]/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-[96px] flex items-center justify-between">
          <a href="/" className="font-display font-semibold text-[24px] tracking-tight text-[#C48B5A] hover:opacity-90 transition-opacity">
            FarmGuard AI
          </a>
          
          <div className="hidden md:flex items-center gap-8 font-sans font-medium text-[15px] text-[#243126]">
            <a href="#" className="hover:text-[#C48B5A] transition-colors ease-hover duration-180">Homepage</a>
            <a href="#solutions" className="hover:text-[#C48B5A] transition-colors ease-hover duration-180">Resources</a>
            <a href="#solutions" className="hover:text-[#C48B5A] transition-colors ease-hover duration-180">Services</a>
            <a href="#story" className="hover:text-[#C48B5A] transition-colors ease-hover duration-180">Prices</a>
            <button 
              onClick={onStartDemo} 
              className="text-[#C48B5A] hover:text-[#B37A49] transition-colors ease-hover duration-180 flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Try Demo
            </button>
          </div>

          <div>
            <button 
              onClick={() => setShowContact(true)} 
              className="bg-[#C48B5A] hover:bg-[#B37A49] text-white text-[14px] font-semibold tracking-wide rounded-full px-5 py-2.5 transition-all duration-300 hover:scale-[1.02] shadow-soft cursor-pointer outline-none"
            >
              Contact Human
            </button>
          </div>
        </div>
      </header>

      {/* Glassmorphic Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#FCFBF8]/95 backdrop-blur-xl border border-white/20 rounded-[32px] max-w-lg w-full p-8 shadow-large relative transition-all duration-300 animate-in slide-in-from-bottom-8">
            <button 
              onClick={() => setShowContact(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#243126]/5 text-[#6A6A6A] hover:text-[#243126] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-[#355E3B] mb-4 animate-bounce" />
                <h3 className="font-display text-2xl font-semibold text-[#243126] mb-2">Message Sent Successfully</h3>
                <p className="text-text-secondary">An agricultural advisor will respond to your email shortly.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-3xl font-semibold text-[#243126]">Contact Advisor</h3>
                  <p className="text-[#5D5D5D] text-sm">Have questions about crop health, planning, or weather telemetry? Send us a message.</p>
                </div>

                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#5D5D5D] block">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={contactForm.name}
                      onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="John Doe" 
                      className="w-full h-12 rounded-xl border border-[#ECE7DE] bg-white px-4 text-sm text-[#1A1A1A] outline-none focus:border-[#355E3B] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#5D5D5D] block">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={contactForm.email}
                      onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="john@farm.com" 
                      className="w-full h-12 rounded-xl border border-[#ECE7DE] bg-white px-4 text-sm text-[#1A1A1A] outline-none focus:border-[#355E3B] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#5D5D5D] block">Message</label>
                    <textarea 
                      required
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we help you prepare for the upcoming season?" 
                      rows={4}
                      className="w-full rounded-xl border border-[#ECE7DE] bg-white p-4 text-sm text-[#1A1A1A] outline-none focus:border-[#355E3B] transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#355E3B] hover:bg-[#2C4E31] text-white rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        Send Message <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-4 border-t border-[#ECE7DE] text-center">
                  <span className="text-xs text-[#5D5D5D]">Want to explore immediately?</span>
                  <button 
                    onClick={() => {
                      setShowContact(false);
                      if (onStartDemo) onStartDemo();
                    }}
                    className="text-[#355E3B] font-semibold text-xs ml-1 hover:underline cursor-pointer"
                  >
                    Launch Demo Mode
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

