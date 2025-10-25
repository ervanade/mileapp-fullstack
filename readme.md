# MileApp — Fullstack Developer Test

**Author:** Ervan Ade Wijaya
**Repository:** `mileapp-fullstack-test`  
**Stack:**  
- Laravel 10 + MongoDB + Vue 3 (Vite) + Pinia + Tailwind + Render + Vercel  
- Express JS + MongoDB + Vue 3 (Vite) + Pinia + Tailwind + Render + Vercel  (alternative backend for Vercel deployment)

---

## 1. What I built

A small Task Management web application that implements:
- Login (mock token / JWT optional)
- Task CRUD (Create / Read / Update / Delete)
- Search, Filter (status & priority), Sort, Pagination
- Responsive UI with Sidebar + Navbar and accessible design
- Notifications (toasts) for user feedback
- REST API with Form Request validation and error handling
- MongoDB indexes for performant queries
- OpenAPI / Swagger documentation available at `/api/documentation`
- CI/CD pipeline with GitHub Actions and deployment to Render (backend) & Vercel (frontend)

---

## 2. Repo structure
mileapp-fullstack-test/
├─ backend/ # Laravel 10 app (API)
├─ backend-express/ # Express (API)
├─ frontend/ # Vue 3 app (UI)
├─ .github/workflows/ci-deploy.yml
└─ README.md


---

## 3. Design decisions & rationale

### Backend
## 4. Backend Design Decisions

### Laravel
- Stable, widely supported framework  
- MongoDB for database  
- Indexes created via Artisan command `php artisan mongo:indexes`  
- FormRequest validation for clean controllers  
- Mock token-based authentication  
- Swagger documentation via L5-Swagger at `/api/documentations`

### Express
- Lightweight, deployable to Vercel  
- chosen because Railway/Laravel deployment requires a credit card, so can deploy via vercel.
- Same MongoDB schema and indexes  
- JWT-based authentication middleware  
- Swagger via `swagger-jsdoc` + `swagger-ui-express`  
- Serverless-friendly
- **Laravel 10**: stable LTS-like release with widespread ecosystem support.
- **MongoDB**: chosen per assignment; `MONGODB_URI` via Atlas for production, local MongoDB allowed for dev.
- **Indexes**: created by an Artisan command `php artisan mongo:indexes` (see section “Indexes” (file /backend/app/console/CreateMongoIndexes)).
- **Validation**: used Laravel FormRequest classes for request validation to keep controllers slim and testable.
- **Auth**: mock token-based auth for the test. The project is ready to swap to Sanctum or JWT by minimal changes.
- **Swagger**: L5-Swagger/OpenAPI for clear API documentation. Docs available at `/api/documentation`.

### Frontend
- **Vue 3 + Vite**: fast dev experience and modern stack.
- **Pinia**: lightweight store for global state (auth + tasks).
- **TailwindCSS**: for consistent, responsive UI.
- **Toast**: for immediate user feedback on actions.
- **Token storage**: uses cookie (httpOnly recommended) or cookie + header; for the test we store JWT token in cookie (see `.env` instructions).

---

## 4. How to run locally (developer)

### Backend
```bash
cd backend
cp .env.example .env
# set MONGODB_URI to local or Atlas
composer install
php artisan key:generate
php artisan migrate
php artisan mongo:indexes
php artisan serve

Open: http://127.0.0.1:8000
Swagger: http://127.0.0.1:8000/api/documentation

### Frontend
cd frontend
cp .env.example .env
# set VITE_API_BASE_URL=http://127.0.0.1:8000/api
npm ci
npm run dev
Open: http://localhost:5173


# MileApp Express Backend

cd backend-express
npm install
cp .env.example .env
# Set MONGO_DB_URI and JWT_SECRET
npm run dev

```
## Overview
This is the Express.js version of the MileApp backend (originally Laravel), including:
- User authentication (mock JWT login)
- Task CRUD API with search, filter, sort, and pagination
- MongoDB (Atlas) as the database
- Swagger API documentation


## Running Locally
1. Install dependencies:

```bash
npm install

## 7. API Endpoint

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| POST   | /api/login | Login & get JWT |


| Method | Endpoint       | Description                        |
| ------ | -------------- | ---------------------------------- |
| GET    | /api/tasks     | List tasks w/ filters & pagination |
| POST   | /api/tasks     | Create a new task                  |
| PUT    | /api/tasks/:id | Update a task by ID                |
| DELETE | /api/tasks/:id | Delete a task by ID                |
