# RescueAI

**Emergency Assistance, Powered by AI.**

RescueAI is a rapid triage and emergency routing web application built with React. It provides AI-driven symptom analysis, instant urgency classification, and real-time routing to the nearest appropriate medical facility -- designed for speed when seconds count.

> **Disclaimer:** This is a prototype and not a replacement for professional medical advice or emergency services. In a real emergency, always call 911.

## Features

- **AI Symptom Triage** -- Describe your symptoms in natural language and receive an urgency classification (Critical / Urgent / Moderate / Non-Emergency) with actionable next-step recommendations.
- **Hospital Finder** -- Interactive map view with nearby facilities, wait times, facility types (Trauma Center, Urgent Care, Pediatrics), and one-tap navigation or calling.
- **Medical History Profile** -- Store and manage blood type, allergies, chronic conditions, medications, and past medical events. Editable with full CRUD support.
- **Emergency Contacts** -- Manage a trusted contact list with add/remove/toggle functionality, configurable auto-alert rules by triage level, and one-tap emergency broadcast.
- **Safety Dashboard** -- Central hub showing system status, recent activity timeline, quick-access to triage/hospital/contacts, and a health profile summary.
- **Voice Input Simulation** -- Simulated voice dictation for hands-free symptom entry during emergencies.
- **How It Works** -- Transparent explanation of RescueAI's six-step safety-first intelligence pipeline.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion |
| Icons | Lucide React + Material Symbols |
| Linting | oxlint |
| Language | JavaScript (JSX) |

## Project Structure

```
src/
  context/
    AppContext.jsx         # Global state: triage, contacts, medical profile, alerts
  components/
    Navigation.jsx         # Top navbar with branding and 911 shortcut
    Sidebar.jsx            # Desktop sidebar navigation
    BottomNav.jsx          # Mobile bottom navigation bar
    EmergencyBanner.jsx    # Global critical-symptom warning banner
  pages/
    LandingPage.jsx        # Hero section with CTA and feature cards
    TriageInput.jsx        # Symptom input with progressive disclosure
    UrgencyResults.jsx     # Triage result display with urgency theming
    FindHospitals.jsx      # Interactive map + filterable hospital list
    MedicalHistory.jsx     # Full medical profile with edit mode
    SafetyDashboard.jsx    # Central safety/status hub
    HowItWorks.jsx         # Six-step intelligence pipeline explainer
    EmergencyContacts.jsx  # Contact management and auto-alert settings
```

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |
