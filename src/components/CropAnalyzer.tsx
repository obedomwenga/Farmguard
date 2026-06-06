import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "./ui";
import { useAuth } from "./AuthProvider";

export function CropAnalyzer() {
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image is too large. Please select an image under 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImagePreview(event.target.result as string);
        setResults(null); 
      }
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setResults(null);

    try {
      const response = await fetch('/api/trees/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: imagePreview,
          farmerId: user?.uid
        })
      });

      const data = await response.json();
      setResults(data);
    } catch (e) {
      console.error(e);
      alert("Failed to analyze image.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="border-b border-border bg-[#FCFBF8]">
        <CardTitle className="font-display text-xl text-text-primary tracking-tight">
          Drone & Canopy AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <div 
              className={`border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-300 ${imagePreview ? 'border-primary/50 bg-[#719B77]/5' : 'border-border hover:bg-black/5'} min-h-[300px] relative overflow-hidden`}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Crop" className="absolute inset-0 w-full h-full object-cover opacity-60" />
              ) : null}
              
              <div className="z-10 bg-white/90 p-6 rounded-2xl shadow-soft backdrop-blur-md pointer-events-none border border-white/20">
                <UploadCloud className="w-10 h-10 text-primary mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold text-text-primary">Upload Paddock Image</h3>
                <p className="text-[12px] text-text-secondary mt-1 max-w-[200px] leading-tight">Supports JPEG/PNG from drones or smartphones (max 10MB)</p>
              </div>

              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/jpeg, image/png, image/webp" 
                className="hidden" 
              />
            </div>
            
            <Button 
              onClick={analyzeImage} 
              disabled={!imagePreview || isAnalyzing}
              className="w-full py-6 text-md"
            >
              {isAnalyzing ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing Canopy...</>
              ) : (
                "Scan Crop Health"
              )}
            </Button>
          </div>

          <div className="bg-black/5 rounded-[24px] p-8 border border-border flex flex-col justify-center min-h-[300px] relative overflow-hidden">
            {!results && !isAnalyzing && (
              <div className="text-center text-text-secondary max-w-[250px] mx-auto">
                <AlertTriangle className="w-10 h-10 mx-auto mb-4 opacity-50" />
                <p className="text-[14px]">Upload an image and run the scan to see the AI breakdown of tree count and health.</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="text-center text-primary space-y-4">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
                <p className="text-[14px] font-medium animate-pulse tracking-wide">Running computer vision models...</p>
              </div>
            )}

            {results && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h3 className="text-lg font-display font-semibold text-text-primary pb-3">Analysis Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-border shadow-soft flex flex-col items-center">
                      <div className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold mb-2">Tree Count</div>
                      <div className="text-4xl font-display font-semibold text-primary">{results.treeCount || 0}</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-border shadow-soft flex flex-col items-center">
                      <div className="text-[10px] text-text-secondary uppercase tracking-widest font-semibold mb-2">Density</div>
                      <div className="text-4xl font-display font-semibold text-primary">{results.density || 'N/A'}</div>
                    </div>
                  </div>
                </div>

                {results.healthBreakdown && (
                  <div className="bg-white p-6 rounded-2xl border border-border shadow-soft">
                    <h4 className="text-[12px] uppercase tracking-wider font-semibold text-text-secondary mb-4">Canopy Health</h4>
                    <div className="space-y-3">
                       <div className="flex items-center justify-between text-[14px] border-b border-border pb-2">
                         <span className="flex items-center gap-2 text-[#355E3B]"><CheckCircle className="w-4 h-4" /> Healthy</span>
                         <span className="font-mono font-medium">{results.healthBreakdown.healthy}%</span>
                       </div>
                       <div className="flex items-center justify-between text-[14px] border-b border-border pb-2">
                         <span className="flex items-center gap-2 text-[#E4B84C]"><AlertTriangle className="w-4 h-4" /> Heat Stressed</span>
                         <span className="font-mono font-medium">{results.healthBreakdown.stressed}%</span>
                       </div>
                       <div className="flex items-center justify-between text-[14px]">
                         <span className="flex items-center gap-2 text-[#C48B5A]"><AlertTriangle className="w-4 h-4" /> Diseased</span>
                         <span className="font-mono font-medium">{results.healthBreakdown.diseased}%</span>
                       </div>
                    </div>
                  </div>
                )}
                
                {results.observations && (
                  <div className="bg-[#719B77]/10 text-primary p-5 rounded-2xl text-[14px] border border-primary/20 leading-relaxed">
                    <strong className="font-semibold block mb-1">AI Notes:</strong> {results.observations}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
