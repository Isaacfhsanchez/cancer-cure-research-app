# Cancer Cure Research App

An AI-assisted oncology research dashboard built with Next.js and a full-stack API layer for cancer research intelligence.

## Features

- Research dashboard for multiple cancer types
- Search and filtering by cancer, biomarker, therapy, and keyword
- AI-style recommendation engine for promising treatment pathways
- Knowledge base summaries for clinical research insights
- Clean, modern research UI
- API-backed data layer using mock oncology research data

## Tech stack

- Next.js 14
- React 18
- TypeScript
- App Router API routes

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## Project structure

- `app/page.tsx` — main dashboard UI
- `app/api/research/route.ts` — API endpoint returning filtered research records
- `data/research.ts` — oncology research demo dataset
- `app/globals.css` — dashboard styling

## Notes

This is a working MVP designed for research workflow prototyping. The data is demo content and can be replaced with a real clinical data source or ML-powered backend later.
