# FarmGuard AI

FarmGuard AI is a smart agricultural weather platform that translates complicated meteorological data into actionable farming advice.

## Features Built
- **Weather Intelligence**: Shows current conditions, farm-specific micro-climate, risk dashboards, and weekly action plans.
- **Hourly Spraying Windows**: Analyzes hourly forecasts to give farm operators the next 12 hours of ideal conditions for spraying or harvesting.
- **AI Agronomist**: Uses advanced AI summarization directly from weather data to provide immediate farming advice without secondary AI hop.
- **SMS Alerts**: A mock setup for the Weather-AI Scale plan. Allows farmers to save mobile numbers and trigger demo SMS alerts for heat, rain, and disease spikes.
- **IP Auto-Location**: Seamlessly identify your farm location with automatic IP detection.

## Weather-AI API Integration
FarmGuard AI directly integrates multiple endpoints from the official Weather-AI developer documentation.

| Endpoint | Purpose |
|----------|---------|
| `GET /v1/weather` | Fetch current conditions, 7-day extended forecasts, and the explicit `ai_summary` field to drive the AI Farm Advisor module. |
| `GET /v1/weather?lat&lon&days=1` | Parses exact hourly weather data array to calculate safe spraying/harvesting windows for the immediate 12 hours. |
| `GET /v1/weather?ip=auto` | Simplifies onboarding for farmers by automatically resolving their IP to lat/long coordinates. |
| `POST /v1/trees/analyze` | The 'Killer Feature' – Advanced computer vision endpoint that scans Paddocks/Drone images and counts trees, providing health density data. |
| `POST /v1/sms/alert` | *Mocked Demonstration* – Demonstrates the business logic of triggering high-risk weather SMS notifications. Returns simulated response due to "Scale plan" firewall. |
| `POST /v1/webhooks` | *Mocked Demonstration* – UI demonstrates proactive webhook subscription model allowing server-to-server alerts for frost/wind events. |

## Run It
Environment variables configured:
`WEATHER_AI_API_KEY`: Configured properly to use securely from the backend express server proxy (`server.ts`).

Powered by [Weather-AI](https://weather-ai.co/docs) and built with React, Vite, Node/Express, and Tailwind.
