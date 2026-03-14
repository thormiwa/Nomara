# Nomara

## What we're building
Nomara is a visa-first travel planning platform for African travelers.

Two questions. That's it:
1. Can I travel there with my passport?
2. What will the trip roughly cost?

Read `prd.md` for full context.

## Product principle
If a feature does not directly help answer those two questions, it is not part of the MVP.

## MVP scope

### Week 1-2
- Project scaffold
- Frontend + backend setup
- Supabase connection
- Mock visa-check endpoint (static data for top 10 Nigerian passport destinations)
- Basic UI flow: nationality select → destination search → visa result card
- Landing page (styled, not placeholder)

### Week 3-4
- Real visa API integration
- Flight search (Amadeus only)
- Budget estimates

### Week 5-6
- Itinerary generation (OpenAI)
- Save trips
- Calendar export

### Out of scope — do not build
Payments, social features, multi-passport support, offline mode, multiple flight APIs, mobile apps, complex dashboards.

## Tech stack
- Frontend: Next.js + React + TypeScript → Vercel
- Backend: Python FastAPI → Railway
- Database: Supabase (PostgreSQL + Auth)
- LLM: OpenAI GPT-4 for itinerary generation only
- APIs: Amadeus (flights), Sherpa or VisaList (visa data)

## Backend rules
- REST only
- No microservices, no background workers
- Simple readable functions over abstractions
- Endpoints: `/visa-check` `/flight-search` `/budget-estimate` `/itinerary-generate`

## API response format
Success:
```json
{ "status": "success", "data": {}, "timestamp": "ISO8601" }
```
Error:
```json
{ "status": "error", "message": "description", "timestamp": "ISO8601" }
```

## Frontend design (non-negotiable)
Nomara should feel editorial and premium. Reference: Monocle, Aesop, Kinfolk, Apple editorial.

- Cream or off-white backgrounds, dark text, subtle accents only
- Strong display serif + refined sans serif pairing
- Large typography, generous whitespace, calm layouts
- Card-based information blocks, simple navigation
- Mobile-first always
- Animations: minimal and subtle only

**Never use:** green, purple, gradients, Inter/Roboto/Arial, heavy shadows, busy dashboards, generic AI startup aesthetics.

## Code rules
- Never hardcode API keys — always read from `.env`
- Guest mode works without login — no auth gates on search flows
- Visa data is never AI-generated — APIs and database only
- AI is only used for itinerary generation
- Always show "last verified" timestamps on visa data
- Always include: *"Visa information is advisory only. Always confirm with official embassy sources."*

## Project structure
```
root/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
├── backend/
│   └── app/
│       ├── routes/
│       ├── services/
│       ├── models/
│       └── main.py
├── docs/
│   └── prd.md
└── CLAUDE.md
```

## How Claude should work
- Propose file structure before making changes
- Show diffs before editing files
- Small incremental edits only
- Explain architectural decisions
- Never rewrite large sections without explanation

## Current status
PRD approved. Week 1 in progress.

**Current goal:** scaffold only — no real APIs, no extra features.
- Set up repo structure
- Configure frontend + backend
- Connect Supabase
- Mock visa-check endpoint
- First basic UI flow