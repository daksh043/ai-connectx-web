# AI Connect X — Outreach Agent

AI-powered B2B collaboration discovery and outreach platform for building industry relationships.

## Architecture

```
ai-connect-x/
├── backend/          # Python FastAPI
│   ├── app/
│   │   ├── config.py          # Pydantic settings
│   │   ├── database.py        # Async SQLAlchemy
│   │   ├── main.py            # FastAPI app entry
│   │   ├── models/            # 8 SQLAlchemy models
│   │   ├── schemas/           # Pydantic request/response schemas
│   │   ├── services/
│   │   │   ├── auth.py        # JWT + bcrypt
│   │   │   └── ai_engine.py   # OpenAI + Gemini (switchable)
│   │   └── routes/            # API endpoints
│   ├── requirements.txt
│   └── .env
└── frontend/         # React + TypeScript + Vite + Tailwind CSS
    └── src/
        ├── lib/api.ts            # Axios API client
        ├── contexts/AuthContext   # JWT auth state
        ├── layouts/AppLayout      # Sidebar + main content
        └── pages/                 # All 7 pages
```

## Quick Start

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate     # Windows
pip install -r requirements.txt
cp .env.example .env       # Add your API keys
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend runs on `http://localhost:8000` (API docs at `/docs`)
Frontend runs on `http://localhost:5173` (proxies API calls to backend)

## Features (MVP)

- **Campaign Builder** — Create targeted outreach campaigns
- **AI Company Discovery** — Find relevant companies using AI
- **AI Research Briefs** — Generate detailed company research
- **Decision-Maker Discovery** — Find the right contacts
- **AI Qualification** — Score prospects with reasoning
- **Collaboration Ideas** — AI-generated partnership proposals
- **LinkedIn Message Generator** — Short, personalized messages
- **Email Generator** — Professional outreach emails
- **Message Quality Checker** — Automated personalization scoring
- **Human Approval Flow** — Review before sending
- **Outreach CRM** — Track all relationships
- **Pipeline View** — Kanban-style prospect tracking
- **Follow-up Engine** — Scheduled reminders
- **Campaign Analytics** — Track performance metrics
- **Multi-provider AI** — Switch between OpenAI and Gemini
- **JWT Auth** — Secure with role-based access (Admin/Team/Reviewer)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Python, FastAPI, SQLAlchemy, Pydantic |
| Database | SQLite (dev), PostgreSQL-ready |
| AI | OpenAI GPT-4o + Google Gemini 1.5 Flash |
| Auth | JWT + bcrypt |
