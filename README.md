# Literacy App (LinguaFlash)

## Overview
A full-stack language-learning web app built with **Next.js** (Pages Router) and **MongoDB**.
Learn vocabulary through interactive flashcards with difficulty levels, progress tracking,
and a spaced-repetition review schedule.

## Features
- **Flashcard learning** — flip cards, type the translation, get instant feedback.
- **Difficulty levels** — easy / medium / hard.
- **Spaced repetition** — review dates scale with performance.
- **Progress tracking** — accuracy stats and a review-activity chart.
- **Authentication** — register / login with JWT session cookies (bcrypt-hashed passwords).

## Tech Stack
- **Framework**: Next.js 15 (Pages Router), React 18
- **Database**: MongoDB via Mongoose
- **Auth**: Custom JWT session cookies (`jose`) + `bcryptjs`
- **Charts**: Chart.js / react-chartjs-2

## Environment variables
Copy `.env.example` to `.env` and fill in:

| Variable         | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `MONGODB_URL`    | MongoDB connection string (local or MongoDB Atlas)       |
| `SESSION_SECRET` | Long random string used to sign session cookies          |

Generate a secret with: `openssl rand -base64 32`

## Local development
```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev
```
Open http://localhost:3000

Vocabulary is served from a built-in seed set (`models/vocabularydata.js`), so the
flashcards work without seeding the database. MongoDB is required for auth and progress.

## Deploy to Vercel
1. Push this repo to GitHub (already done).
2. In the [Vercel dashboard](https://vercel.com/new), import the repository.
3. Add the environment variables (`MONGODB_URL`, `SESSION_SECRET`) for the
   Production, Preview, and Development environments.
4. Deploy. Next.js is detected automatically — no extra config needed.

For a hosted database, create a free cluster on
[MongoDB Atlas](https://www.mongodb.com/atlas), allow access from `0.0.0.0/0`
(or Vercel's ranges), and use its `mongodb+srv://…` connection string as `MONGODB_URL`.
