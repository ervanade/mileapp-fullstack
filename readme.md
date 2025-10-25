# MileApp — Fullstack Developer Test

**Author:** Ervan Ade Wijaya
**Repository:** `mileapp-fullstack-test`  
**Stack:** Laravel 10 (PHP) + MongoDB + Vue 3 (Vite) + Pinia + Tailwind + Render + Vercel

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
├─ frontend/ # Vue 3 app (UI)
├─ .github/workflows/ci-deploy.yml
└─ README.md


---

## 3. Design decisions & rationale

### Backend
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