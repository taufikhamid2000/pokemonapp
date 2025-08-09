# Pokémon App (Vue 3 + Vite + Pinia + Bootstrap)

A simple responsive Pokémon browser using the public PokeAPI. Features fetching 100 Pokémon, search filter, details page, editable intro stored in Pinia, and loaders.

## Stack

- Vue 3 (Vite)
- Pinia (state)
- Vue Router
- Bootstrap 5.3
- Axios

## Getting started

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Build and preview

```bash
npm run build
npm run preview
```

## Deployment (Vercel)

CLI deploy:

```bash
npm run build
npm install -g vercel
vercel login
vercel link --project pokemonapp --yes
vercel deploy dist --prod --yes
```

For SPA routing on refresh, `vercel.json` includes a rewrite to `index.html`.

## Notes

- Data source: PokeAPI (`https://pokeapi.co/`). List request limits to 100 via `?limit=100`.
- While loading, a Bootstrap spinner shows.
- Edited intro is kept in Pinia in-memory; adjust to persist if desired.
