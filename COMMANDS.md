### Commands Cheat Sheet — Vue 3 + Vite + Bootstrap 5.3 + Pinia (Windows PowerShell)

All commands below are PowerShell-friendly (no command chaining). Run them one-at-a-time.

---

## 0) Prerequisites

```powershell
node -v
npm -v
```

- **What it does**: Prints your Node.js and npm versions (Node 18+ recommended).

If you need Node.js, install from `https://nodejs.org` (LTS).

---

## 1) Create a new Vue 3 app with Vite

Navigate to where you want the project to live:

```powershell
cd D:\Projects
```

- **What it does**: Moves into your projects folder.

If you already created and are inside `D:\Projects\pokemonapp`:

```powershell
npm create vite@latest pokemonapp -- --template vue
```

- **What it does**: Scaffolds the Vue 3 project into the current directory.

---

## 2) Install project dependencies

```powershell
npm install
```

- **What it does**: Installs base dependencies created by Vite.

Install router, store, HTTP client, and Bootstrap 5.3:

```powershell
npm install vue-router@4 pinia axios bootstrap@5.3.3 @popperjs/core
```

- **What it does**: Adds Vue Router 4, Pinia, Axios, Bootstrap 5.3, and Popper (needed by some Bootstrap components).

---

## 3) Start the dev server

```powershell
npm run dev
```

- **What it does**: Starts Vite’s dev server with hot module reload. Open the shown URL in your browser.

---

## 4) Build and local preview

```powershell
npm run build
npm run preview
```

- **What it does**: Builds a production bundle into `dist/` and serves it locally for testing.

---

## 5) Optional: Add formatting (Prettier)

```powershell
npm install -D prettier
npx prettier --write .
```

- **What it does**: Installs Prettier and formats all files in the repository.

---

## 6) Git repository setup

```powershell
git init
git add .
git commit -m "chore: initial commit"
```

- **What it does**: Initializes a Git repo and commits your scaffolded app.

Add a remote and push (replace YOUR_USER and optionally repo name):

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USER/pokemonapp.git
git push -u origin main
```

- **What it does**: Sets the default branch to `main`, adds GitHub as remote, and pushes your code.

---

## 7) Deploy (Vercel — recommended)

Deploy via Vercel CLI (PowerShell-safe, minimal prompts):

```powershell
npm run build
npm install -g vercel
vercel login
vercel link --project pokemonapp --yes
vercel deploy dist --prod --yes
```

- **What it does**: Builds locally, installs Vercel CLI, logs in, links the current folder to a Vercel project named `pokemonapp`, and deploys the built `dist/` directory to production.

Optional (history-mode routing fallback): add a `vercel.json` so client-side routes work on refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Alternative: GitHub integration (no CLI deploy). Push your repo to GitHub, then in the Vercel dashboard click “New Project”, import the repo, Framework Preset: Vite, Build Command: `npm run build`, Output Directory: `dist`.
