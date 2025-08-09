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

## 7) Deploy options

### A) GitHub Pages (quick, no extra services)

Build and publish the `dist/` folder to a `gh-pages` branch using `subtree`:

```powershell
npm run build
git add dist -f
git commit -m "build: publish dist"
git subtree push --prefix dist origin gh-pages
```

- **What it does**: Builds the app, force-adds the `dist/` folder, and pushes it as the `gh-pages` branch. Then, in your GitHub repo settings, enable Pages to serve from `gh-pages`.

Note: If your repository is NOT a user/organization site and you deploy under `https://YOUR_USER.github.io/pokemonapp/`, set `base` in `vite.config.js` to `"/pokemonapp/"` before building.

### B) Netlify (requires Netlify account)

```powershell
npm run build
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --dir=dist --prod
```

- **What it does**: Builds the app and uses Netlify CLI to authenticate, set up a site, and deploy the `dist/` folder.

---

## 8) What you still need to wire up (no commands)

- Import Bootstrap in `src/main.js` (CSS and optionally JS):
  - `import 'bootstrap/dist/css/bootstrap.min.css'`
  - `import 'bootstrap'`
- Create and register Vue Router and Pinia in `main.js`.
- Build views and store (list page with search + details page with edit, saving to Pinia).
- Add loaders during fetch requests and ensure responsive layout with Bootstrap utilities.

These are code edits, not commands, so they’re listed here as reminders.

---

## 9) Useful maintenance

Clean install if dependencies act up:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

- **What it does**: Deletes `node_modules` and lockfile, then reinstalls fresh.
