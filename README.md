# Cancer Cure Research App

A full-stack oncology research platform powering discovery workflows for cancer treatment exploration, biomarker analysis, study tracking, and AI-guided recommendations.

## Included in this repo

- Next.js web dashboard for cancer research operations
- Express backend API for research insights and recommendations
- React Native mobile app for clinicians and researchers on the go
- Search and filtering by cancer type, biomarker, therapy, and keyword
- AI-style recommendation engine for treatment prioritization
- Study tracking and research pipeline view
- Knowledge base with curated oncology insights
- Demo data modeled around real research workflows

## Repository structure

- `app/` — Next.js frontend dashboard
- `app/api/research/route.ts` — API route for filtered research records
- `data/research.ts` — oncology dataset for the dashboard
- `server/` — Express backend with treatment, study, and recommendation endpoints
- `mobile/` — Expo React Native app for mobile access
- `README.md` — project overview and run instructions

## Web app quick start

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Backend quick start

```bash
cd server
npm install
npm run dev
```

The API will run on:

```text
http://localhost:4000
```

Endpoints include:

- `GET /api/health`
- `GET /api/research`
- `GET /api/recommendations`
- `GET /api/studies`
- `GET /api/knowledge`

## Mobile app quick start

```bash
cd mobile
npm install
npm start
```

Then run the app in the simulator or on a device using Expo Go.

## Product vision

This app is designed as a research-oriented clinical intelligence platform for:

- identifying promising cancer therapies
- reviewing biomarker-driven trial opportunities
- prioritizing interventions by evidence and risk profile
- supporting researchers and clinicians through a streamlined dashboard

## Notes

The current version uses realistic demo data for prototyping and can be extended to real clinical datasets, a database layer, authentication, or machine learning inference in a production environment.
