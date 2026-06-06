export type RiskLevel = "Low" | "Medium" | "High" | "Critical";

export interface FarmInsights {
  advisor: {
    today: string;
    planting: boolean;
    irrigation: boolean;
    spraying: boolean;
    riskLevel: RiskLevel;
    warnings: string[];
  };
  weeklyPlan: Array<{
    dayIndex: number;
    action: string;
  }>;
  risks: {
    rainRisk: RiskLevel;
    heatStressRisk: RiskLevel;
    floodRisk: RiskLevel;
    windDamageRisk: RiskLevel;
    diseaseRisk: RiskLevel;
  };
}

export interface WeatherData {
  current: {
    time: string;
    temperature: number;
    precipitation: number;
    wind_speed: number;
    condition_code: string;
    icon: string;
    humidity: number;
    feels_like: number;
    wind_gust: number;
    uv_index: number;
    icon_path: string;
  };
  hourly: Array<{
    time: string;
    temp: number;
    precipitation: number;
    wind_speed: number;
  }>;
  daily: Array<{
    date: string;
    temp_min: number;
    temp_max: number;
    precipitation_sum: number;
    sunrise: string;
    sunset: string;
    condition_code: string;
    icon: string;
    precipitation_probability: number;
    wind_max: number;
    icon_path: string;
  }>;
}

export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface AppState {
  location: GeoLocation | null;
  crop: string;
  weather: WeatherData | null;
  insights: FarmInsights | null;
  isLoading: boolean;
}

