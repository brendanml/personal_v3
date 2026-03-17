# Personal Site v3

My personal website with a private content management dashboard.

## Structure

```
/
/backend
/dashboard
```

## Public Site

Built with React Router v7, SSR and deployed on Vercel. Connects directly to MongoDB Atlas to read content.

**Routes:**

- `/` — profile, work experience, projects, certifications
- `/books` — books read
- `/articles` — article list and individual articles
- `/resume` — embedded PDF

## Dashboard + Backend

A local only admin interface for managing content. The dashboard talks to the Express backend, which handles all writes to MongoDB.

**Manages:** articles, books, jobs, projects, certifications, profile

## Getting Started

```bash
# Install dependencies
npm install
cd backend && npm install
cd dashboard && npm install

# Run everything
npm run all
```

Starts the public site on `localhost:5173`, backend on `localhost:3001`, and dashboard on `localhost:5174`.

## Environment Variables

**Root `.env`** (public site):

```
MONGODB_URI=your_atlas_uri
```

**`backend/.env`**:

```
MONGODB_URI=your_atlas_uri
```
