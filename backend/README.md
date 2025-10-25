# MileApp - Fullstack Test (Laravel + Vue)

## Stack
- Backend: Laravel 10 + Laravel MongoDB
- Frontend: Vue 3 + Vite + Pinia + Tailwind
- DB: MongoDB (Atlas recommended)
- CI: GitHub Actions
- Deploy: Render (backend), Vercel (frontend)

## How to run locally

### Backend
1. `cd backend`
2. copy `.env.example` to `.env` and set `MONGO_DB_URI`
3. `composer install`
4. `php artisan key:generate`
5. `php artisan serve --host 0.0.0.0 --port 8000`
API base: `http://localhost:8000/api`

### Frontend
1. `cd frontend`
2. `npm install`
3. copy `.env` set `VITE_API_URL=http://localhost:8000/api`
4. `npm run dev`

## Endpoints
- `POST /api/login` -> returns token (mock)
- `GET /api/tasks` -> supports `q`, `filter.status`, `sort`, `page`, `limit`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Indexes
See `db/indexes.js` — created text index on title/description and useful compound indexes for filtering and sorting.

## Tests
- Backend: `./vendor/bin/phpunit`
- Frontend: (optional) run vitest

## Notes & design decisions
- Auth is **mock**: middleware checks existence of bearer token. For test evaluation this simplifies flow while demonstrating protected routes and token handling.
- MongoDB chosen to match task requirement; `jenssegers/mongodb` provides Eloquent-like model and pagination.
- Frontend stores token in `localStorage` for the assignment. In production use httpOnly cookies.
