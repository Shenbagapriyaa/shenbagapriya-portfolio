# Shenbagapriya N — Full-Stack Portfolio

A recruiter-focused portfolio built as a real full-stack project: React + Vite frontend,
Express + MongoDB backend, JWT-protected admin dashboard, live GitHub stats, a working
WhatsApp button, and a contact form that writes to a database.

## What's actually wired up vs. what needs your input

**Fully functional out of the box:**
- Frontend UI — hero, about, skills, experience, projects, achievements, certifications,
  contact form, resume viewer — all built from your resume data (`frontend/src/data/profile.js`)
- Loading screen, Three.js particle background, aurora gradients, heart-bubble click effect,
  scroll reveals, typing animation, animated counters, Lenis smooth scroll
- Floating WhatsApp button linked to `+91 6385350315` (`https://wa.me/916385350315`)
- Live GitHub stats (public repos, followers, top repos/languages) fetched client-side
  from the GitHub REST API — no token needed for public data
- Full Express backend: JWT auth, bcrypt password hashing, MongoDB models for every
  resource (Projects, Skills, Experience, Achievements, Certificates, Messages, Resume,
  Profile), CRUD routes, file upload (Multer) for resume/images, rate limiting, Helmet,
  CORS, centralized error handling
- Admin dashboard (`/admin`) — login, view/delete contact messages, add/delete projects,
  skills, achievements, certificates, and upload a new resume PDF

**Needs your input before it's live:**
1. **MongoDB Atlas** — create a free cluster, put the connection string in `backend/.env`
   (`MONGO_URI`). Nothing in this repo can create that cluster for you.
2. **Admin credentials** — set `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `backend/.env`, then run
   `npm run seed:admin` once to create the account.
3. **Resume PDF** — drop your real resume at `frontend/public/resume.pdf` (the Resume
   section and Download button both point there).
4. **Real project/GitHub links** — `frontend/src/data/profile.js` has `githubUrl`/`liveUrl`
   set to `#` — replace with your actual repo and deployed links.
5. **Deployment** — see below. Nothing is deployed yet; this is the source code.

I built and syntax-checked both halves in this environment (`npm run build` succeeds for
the frontend; the backend boots cleanly and only fails on the placeholder Mongo URI), but
I can't stand up a live MongoDB Atlas cluster, register a domain, or click through
Vercel/Render's dashboards on your behalf — those need your accounts.

## Project structure

```
project/
├── frontend/                # React 19 + Vite + Tailwind
│   ├── src/
│   │   ├── components/      # Navbar, Hero, Skills, Projects, WhatsAppButton, etc.
│   │   ├── pages/            # Home, AdminLogin, AdminDashboard
│   │   ├── data/profile.js   # Your resume content — edit this first
│   │   ├── context/          # Auth context (JWT stored in localStorage)
│   │   └── api/axios.js      # Configured Axios instance
│   └── public/profile.jpg    # Your headshot
└── backend/                  # Express + MongoDB
    ├── models/                # Mongoose schemas
    ├── controllers/           # Route handlers (generic CRUD factory + custom ones)
    ├── routes/                 # /api/auth, /api/projects, /api/messages, /api/github, ...
    ├── middleware/            # JWT auth, file upload, error handling
    └── utils/seedAdmin.js      # Creates the admin user from .env
```

## Run it locally

**Backend**
```bash
cd backend
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run seed:admin        # one-time: creates your admin login
npm run dev                # http://localhost:5000
```

**Frontend**
```bash
cd frontend
cp .env.example .env       # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                 # http://localhost:5173
```

Visit `/admin/login` to sign in with the credentials you seeded.

## Deployment

- **Frontend → Vercel**: import the `frontend` folder as the project root, build command
  `npm run build`, output directory `dist`. Set `VITE_API_URL` to your deployed backend URL.
- **Backend → Render**: new Web Service, root directory `backend`, build command
  `npm install`, start command `npm start`. Add the same env vars as `.env.example`,
  with `CLIENT_URL` set to your Vercel domain (for CORS).
- **Database → MongoDB Atlas**: free M0 cluster, whitelist Render's IPs (or `0.0.0.0/0`
  for simplicity), copy the connection string into `MONGO_URI` on Render.

## Notes on scope

A few items from the original brief are intentionally simplified rather than faked:
- Email notifications on new contact messages aren't wired to an SMTP/Resend provider —
  the message is saved to MongoDB and the admin dashboard shows it; add a mail provider
  in `backend/controllers/messageController.js` if you want email alerts too.
- The admin dashboard's resource panels (projects/skills/achievements/certificates) are
  generic add/list/delete forms rather than a fully custom UI per resource — functional,
  but you may want richer forms (image upload per project, drag-to-reorder) later.
