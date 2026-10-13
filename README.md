# 🐶 Paw-some Learning Missions

A full‑stack, toddler‑friendly learning app with daily missions, progress tracking, and a parent dashboard. Built with React, Node.js, Express, PostgreSQL, and Tailwind CSS.

---

## ✨ Features

- 🎯 **Daily missions** (Matching, Colors, Dentist, Animals)
- ⭐ **Progress tracking** (stars, streak, history)
- 👩‍👧 **Parent dashboard** with real‑time stats
- 🔐 **Authentication** (JWT + bcrypt)
- 🎨 **Kid‑friendly UI** with Tailwind CSS
- 📱 **Mobile‑responsive** design
- 🎮 **Interactive carousel** to preview missions

---

## 🛠️ Tech Stack

### Frontend
- React (Hooks, Router)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- dotenv

### Tools & Deployment
- Git & GitHub
- Thunder Client / Postman
- (Optional) Render + Vercel

---

## 📂 Project Structure

---

## 🐳 Run with Docker (Easiest Way)

The fastest way to run the whole app — no manual setup needed!

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### One command to start everything

```bash
git clone https://github.com/Arushay/paw-some-learning.git
cd paw-some-learning
docker compose up

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/Arushay/paw-some-learning.git
cd paw-some-learning
🗄️ Database Setup

Connect to PostgreSQL and create the database:

sql
CREATE DATABASE paw_some_learning;
Then run the following tables:

sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE missions (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    content JSONB NOT NULL,
    day DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    mission_id INTEGER REFERENCES missions(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    stars INTEGER DEFAULT 0,
    completed_at TIMESTAMP
);
🔐 Default Login

After seeding missions, you can register a parent account:

http
POST /auth/register
{
  "email": "parent@test.com",
  "password": "secret123"
}
Then log in via the React frontend.

📡 API Endpoints

Public Routes

Method	Endpoint	Description
POST	/auth/register	Register a parent account
POST	/auth/login	Login and receive JWT token
GET	/ping	Health check
Protected Routes (require token)

Method	Endpoint	Description
GET	/missions/today	Get today's missions
GET	/missions/:id	Get a specific mission
GET	/dashboard	Get parent dashboard data
POST	/progress	Save mission progress
GET	/progress	Get all progress
GET	/progress/stars	Get total stars
GET	/progress/streak	Get learning streak
🧪 Testing

Use Thunder Client (VS Code extension) or Postman to test the API.

Example login request:

http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "parent@test.com",
  "password": "secret123"
}
🎨 Frontend Preview

The dashboard includes:

A mission carousel with auto‑slide and manual navigation
Stats cards for total stars and learning streak
A list of today's completed missions
A recent activity log
🚀 Future Improvements

Add mission gameplay (matching, colors, dentist)
Sound effects for interactions
Confetti on mission completion
Badges and certificates for milestones
Deployment to Render (backend) + Vercel (frontend)
👩‍💻 Author

Arushay
GitHub

Built as a learning project to explore full‑stack development with React, Node.js, and PostgreSQL.
