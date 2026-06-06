import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { Loader2, Plus, MapPin, Wheat, Phone, Check, Settings, Trash2, ArrowRight, Sprout, Search } from "lucide-react";
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from "./ui";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";
import { GeoLocation } from "@/types";
import { LocationPicker } from "./LocationPicker";

interface Farm {
  id: string;
  name: string;
  crop: string;
  latitude: number;
  longitude: number;
}

interface FarmManagerProps {
  onSelectFarm: (farm: Farm) => void;
  isDemo?: boolean;
}

export function FarmManager({ onSelectFarm, isDemo }: FarmManagerProps) {
  const { user, userProfile, setUserProfile } = useAuth();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loadingFarms, setLoadingFarms] = useState(true);
  
  const [phone, setPhone] = useState(userProfile?.phone || "");
  const [updatingPhone, setUpdatingPhone] = useState(false);
  const [phoneSaved, setPhoneSaved] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<GeoLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [newFarmName, setNewFarmName] = useState("");
  const [newFarmCrop, setNewFarmCrop] = useState("Maize");
  const [selectedLocation, setSelectedLocation] = useState<GeoLocation | null>(null);
  const [addingFarm, setAddingFarm] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const crops = ["Maize", "Wheat", "Beans", "Coffee", "Tea", "Tomatoes", "Potatoes"];

  useEffect(() => {
    if (isDemo) {
      setFarms([{
        id: "demo-farm-1",
        name: "North Valley Plot",
        crop: "Maize",
        latitude: -1.2921,
        longitude: 36.8219,
      }]);
      setLoadingFarms(false);
      setPhone("+254 700 000 000");
    } else if (user) {
      loadFarms();
      setPhone(userProfile?.phone || "");
    }
  }, [user, userProfile, isDemo]);

  const loadFarms = async () => {
    if (!user) return;
    setLoadingFarms(true);
    try {
      const q = query(collection(db, "farms"), where("ownerId", "==", user.uid));
      const snap = await getDocs(q);
      const loadedFarms: Farm[] = [];
      snap.forEach(doc => {
        loadedFarms.push({ id: doc.id, ...doc.data() } as Farm);
      });
      setFarms(loadedFarms);
    } catch (e) {
      console.error("Error loading farms:", e);
    } finally {
      setLoadingFarms(false);
    }
  };

  const savePhone = async () => {
    if (isDemo) {
      setUpdatingPhone(true);
      setTimeout(() => {
        setPhoneSaved(true);
        setUpdatingPhone(false);
        setTimeout(() => setPhoneSaved(false), 3000);
      }, 1000);
      return;
    }
    if (!user) return;
    setUpdatingPhone(true);
    setPhoneSaved(false);
    try {
      await updateDoc(doc(db, "users", user.uid), { phone });
      setUserProfile(prev => ({ ...prev, phone }));
      setPhoneSaved(true);
      setTimeout(() => setPhoneSaved(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingPhone(false);
    }
  };

  const searchLocation = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const resp = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await resp.json();
      setLocations(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const pickLocation = (loc: GeoLocation) => {
    setSelectedLocation(loc);
    setLocations([]);
    setSearchQuery("");
  };

  const handleAddFarm = async () => {
    if (!selectedLocation || !newFarmName.trim()) return;
    if (isDemo) {
      setAddingFarm(true);
      setTimeout(() => {
        const newFarm = { id: "demo-farm-2", name: newFarmName, crop: newFarmCrop, latitude: selectedLocation.latitude, longitude: selectedLocation.longitude };
        setFarms([...farms, newFarm]);
        setNewFarmName("");
        setSelectedLocation(null);
        setAddingFarm(false);
      }, 1000);
      return;
    }
    if (!user) return;
    setAddingFarm(true);
    try {
      const farmData = {
        ownerId: user.uid,
        name: newFarmName,
        crop: newFarmCrop,
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "farms"), farmData);
      const newFarm = { id: docRef.id, ...farmData, ...selectedLocation } as Farm;
      setFarms([...farms, newFarm]);
      setNewFarmName("");
      setSelectedLocation(null);
    } catch (e) {
      console.error("Error adding farm:", e);
    } finally {
      setAddingFarm(false);
    }
  };

  return (
    <div className="w-full space-y-12 animate-in fade-in duration-700 mx-auto">
       <div className="max-w-4xl pt-8 pb-4">
          <h2 className="font-display text-[48px] md:text-[56px] font-semibold text-text-primary tracking-tight leading-tight">
            Intelligent Farm Planning
          </h2>
          <p className="text-xl text-text-secondary mt-4 font-light">Sustainable Growth Through Data</p>
       </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Col: Account Settings */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-white">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-xl font-display flex items-center gap-2 text-text-primary">
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <div className="space-y-1">
                <label className="text-text-secondary text-[12px] font-semibold uppercase tracking-wider">Email</label>
                <div className="font-medium text-text-primary">{userProfile?.email}</div>
              </div>
              <div className="space-y-4 pt-4 border-t border-border">
                <label className="text-text-secondary text-[12px] font-semibold uppercase tracking-wider block">SMS Notifications Mobile</label>
                <div className="flex gap-2">
                  <Input 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    placeholder="+254 700 000 000" 
                  />
                </div>
                <p className="text-[14px] text-text-secondary">Receive critical weather alerts directly to your phone.</p>
                <Button 
                    onClick={savePhone} 
                    disabled={updatingPhone || phone === userProfile?.phone}
                    variant="outline"
                    className="w-full justify-center"
                  >
                    {updatingPhone ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    {phoneSaved ? (
                      <span className="flex items-center text-primary"><Check className="w-4 h-4 mr-2" /> Saved</span>
                    ) : "Save SMS Number"}
                </Button>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <label className="text-text-secondary text-[12px] font-semibold uppercase tracking-wider">Farm Webhook</label>
                  <span className="bg-[#E4B84C]/20 text-[#6A6A6A] text-[10px] px-2 py-0.5 rounded-full border border-border font-bold">PRO</span>
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="https://your-api.com/webhooks" 
                  />
                </div>
                <p className="text-[14px] text-text-secondary">Pings your server automatically when frost, heavy rain, or high wind is detected.</p>
                <Button 
                    variant="outline"
                    className="w-full justify-center text-text-secondary hover:text-text-primary"
                    onClick={() => alert("Mock Event: Webhook URL saved to database. Upgrade to Weather-AI Pro to activate real-time pushes.")}
                  >
                    Subscribe to Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Farms */}
        <div className="md:col-span-2 space-y-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {loadingFarms ? (
              <div className="sm:col-span-2 py-12 flex justify-center text-text-secondary">
                 <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : farms.length > 0 ? (
              farms.map(f => (
                <div key={f.id} className="group border border-border rounded-[24px] p-8 shadow-soft bg-white hover:-translate-y-1 hover:shadow-medium transition-all duration-300 cursor-pointer flex flex-col justify-between" onClick={() => onSelectFarm(f)}>
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-display font-semibold text-2xl text-text-primary tracking-tight">{f.name}</h3>
                      <span className="bg-[#355E3B]/10 text-primary text-xs px-3 py-1 rounded-full font-medium border border-primary/20">
                        {f.crop}
                      </span>
                    </div>
                    <div className="text-[14px] text-text-secondary tracking-tight flex items-center gap-1.5 opacity-80 font-mono">
                      <MapPin className="w-3.5 h-3.5" /> {f.latitude.toFixed(4)}, {f.longitude.toFixed(4)}
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <span className="text-secondary font-medium flex items-center group-hover:text-primary transition-colors">
                       View Insights <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))
            ) : (
               <div className="sm:col-span-2 py-16 text-center border-2 border-dashed rounded-[32px] border-border bg-black/5">
                 <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-border">
                   <Sprout className="w-8 h-8 text-secondary" />
                 </div>
                 <h3 className="font-display text-2xl font-semibold text-text-primary">No farms added yet</h3>
                 <p className="text-[16px] text-text-secondary mt-2">Register your first farm below to start getting insights.</p>
               </div>
            )}
          </div>

          <Card className="mt-8 overflow-visible">
             <CardHeader className="bg-[#FCFBF8] rounded-t-[32px] pb-4">
               <CardTitle className="text-xl flex items-center gap-2 text-text-primary">
                 Add New Farm
               </CardTitle>
             </CardHeader>
             <CardContent className="pt-8 space-y-6">
               <div>
                  <label className="text-text-secondary text-[12px] font-semibold uppercase tracking-wider block mb-2">Farm Name</label>
                  <Input value={newFarmName} onChange={e => setNewFarmName(e.target.value)} placeholder="e.g., North Valley Plot" />
               </div>

               <div>
                 <label className="text-text-secondary text-[12px] font-semibold uppercase tracking-wider block mb-2">Primary Crop</label>
                 <div className="flex flex-wrap gap-2">
                    {crops.map(c => (
                      <button
                        key={c}
                        onClick={() => setNewFarmCrop(c)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${newFarmCrop === c ? 'bg-primary border-primary text-white scale-[1.02] shadow-soft' : 'bg-transparent border-border text-text-secondary hover:bg-black/5'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
               </div>

               <div>
                  <label className="text-text-secondary text-[12px] font-semibold uppercase tracking-wider block mb-2">Location</label>
                  {selectedLocation ? (
                    <div className="flex items-center justify-between bg-background border border-border p-4 rounded-2xl">
                      <div className="flex items-center gap-3 text-text-primary font-medium text-[16px]">
                        <MapPin className="w-5 h-5 text-secondary" />
                        {selectedLocation.name}, {selectedLocation.country}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedLocation(null)} className="h-10 px-4 text-text-secondary hover:text-secondary group">Change <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Button>
                    </div>
                  ) : showMapPicker ? (
                    <LocationPicker 
                      onSelectLocation={(loc) => {
                        setSelectedLocation(loc);
                        setShowMapPicker(false);
                      }}
                      onCancel={() => setShowMapPicker(false)}
                    />
                  ) : (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input 
                          value={searchQuery} 
                          onChange={e => setSearchQuery(e.target.value)} 
                          placeholder="Search nearest town or region" 
                          onKeyDown={e => e.key === "Enter" && searchLocation()}
                          className="rounded-full"
                        />
                        <Button onClick={searchLocation} disabled={isSearching} className="w-[56px] p-0 rounded-full flex-shrink-0">
                          {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                        </Button>
                        <Button 
                          onClick={() => setShowMapPicker(true)} 
                          variant="outline" 
                          className="w-[56px] p-0 rounded-full flex-shrink-0 bg-transparent hover:bg-black/5"
                          title="Select on map"
                        >
                          <MapPin className="h-5 w-5 text-text-secondary" />
                        </Button>
                      </div>
                      {locations.length > 0 && (
                        <div className="border border-border rounded-2xl shadow-soft divide-y overflow-hidden max-h-48 overflow-y-auto bg-white">
                          {locations.map(loc => (
                            <button 
                              key={loc.id} 
                              className="w-full text-left px-5 py-3 hover:bg-black/5 transition-colors text-text-primary flex flex-col justify-center"
                              onClick={() => pickLocation(loc)}
                            >
                              <div className="font-medium">{loc.name}</div>
                              <div className="text-xs text-text-secondary">{loc.admin1 ? `${loc.admin1}, ` : ""}{loc.country}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
               </div>

               <div className="pt-2">
                 <Button 
                  onClick={handleAddFarm} 
                  className="w-full" 
                  disabled={addingFarm || !selectedLocation || !newFarmName.trim()}
                 >
                   {addingFarm ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Plus className="w-5 h-5 mr-2" />}
                   Register Farm
                 </Button>
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
