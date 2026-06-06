import React, { useState } from "react";
import { AppState } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, Input, Button } from "./ui";
import { Send, Bot, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatAssistantProps {
  appState: AppState;
  onClose?: () => void;
}

export function ChatAssistant({ appState, onClose }: ChatAssistantProps) {
  const [messages, setMessages] = useState<{ role: "user" | "model"; content: string }[]>([
    { role: "model", content: "Hello! I am your FarmGuard AI Assistant. How can I help you today regarding your farm and weather conditions?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          context: {
             crop: appState.crop,
             weather: appState.weather,
          }
        })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error);

      setMessages([...newMessages, { role: "model", content: data.text }]);
    } catch (e: any) {
      console.error(e);
      setMessages([...newMessages, { role: "model", content: "Sorry, I encountered an error while trying to answer." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full border-text-primary overflow-visible shadow-none border-none rounded-none">
      <CardHeader className="bg-primary text-white rounded-t-[32px] pb-4 pt-6 border-none shrink-0">
        <CardTitle className="flex items-center justify-between font-display tracking-tight text-white font-medium w-full">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-white" />
            Agronomist AI Chat
          </div>
          {onClose && (
            <button 
              type="button" 
              onClick={onClose} 
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] px-5 py-4 text-[14px] leading-relaxed flex gap-3 shadow-soft", msg.role === "user" ? "bg-primary text-white rounded-2xl rounded-tr-sm" : "bg-white border border-border text-text-primary rounded-2xl rounded-tl-sm")}>
                {msg.role === "model" && <Bot className="h-5 w-5 shrink-0 opacity-40 mt-1" />}
                <div className="prose-sm">{msg.content}</div>
                {msg.role === "user" && <User className="h-5 w-5 shrink-0 opacity-40 mt-1" />}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="bg-white border border-border text-text-primary max-w-[80%] rounded-2xl rounded-tl-sm px-5 py-4 text-sm flex gap-3 shadow-soft">
                <Bot className="h-5 w-5 shrink-0 opacity-40" />
                <div className="flex space-x-1.5 mt-2">
                  <div className="h-2 w-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-border bg-white rounded-b-[32px]">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Ask a question about your farm..." 
              className="bg-black/5 rounded-full border-none focus-visible:ring-1 focus-visible:ring-primary h-12"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="w-12 h-12 rounded-full p-0 shrink-0 bg-primary hover:bg-secondary">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
