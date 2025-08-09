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

## Project structure

```
src/
  components/
    LoadingSpinner.vue      # Loader shown during API calls
    PokemonCard.vue         # Pokémon card used in the grid list
  router/
    index.js                # Routes: list and detail
  stores/
    pokemonStore.js         # Pinia store: list, details cache, loaders, edited intro
  views/
    PokemonList.vue         # Home: search, pagination, card grid
    PokemonDetail.vue       # Detail: full info + editable intro
  App.vue                   # Shell: navbar + router-view
  main.js                   # App bootstrap with Pinia, Router, Bootstrap
```

## State management

- `pokemonStore` holds:
  - `pokemonList` (100 items, with basic fields)
  - `pokemonDetailsByName` (details cache by name)
  - Loading flags for list and details
  - `editedInfoByName` (intro edited on the details page)
- Flow: List loads once (limit=100). Each detail page loads/caches the selected Pokémon. Edited intro is stored in Pinia and reflected in the list.

## API usage

- List: `GET https://pokeapi.co/api/v2/pokemon?limit=100`
- Detail: `GET https://pokeapi.co/api/v2/pokemon/:name`
- Displayed: name, sprite, types, height/weight, base experience, and stats on the detail page.

## UX decisions

- Card grid with short intro for quick scanning
- Search filters by substring on the name
- Pagination with selector (12/24/48/All), default 24, persisted via `localStorage`
- Loaders during fetch; error alert on failures
- Responsive via Bootstrap grid/breakpoints

## Accessibility

- Loader has `role="status"` and `aria-live="polite"`
- Buttons/links are keyboard accessible

## Formatting

Run Prettier:

```bash
npx prettier --write .
```

## Screenshots (optional)

- Home (list)
- Details (intro + stats)

## Notes

- Data source: PokeAPI (`https://pokeapi.co/`). List request limits to 100 via `?limit=100`.
- While loading, a Bootstrap spinner shows.
- Edited intro is kept in Pinia in-memory; consider persisting to `localStorage` if desired.

## AI assistance and authorship

This project was built with assistance from Cursor (GPT‑5). Scope and decisions were directed by me:

- Chose Vue 3 + Vite, Pinia, Vue Router, Bootstrap for the stack
- Designed data flow (list fetch limit=100, detail caching), loaders, and card/grid UI
- Implemented search, client-side pagination (12/24/48/All), and editable intro stored in Pinia
- Resolved tooling/config issues (Vite, PowerShell), cleaned scaffold artifacts, and configured Vercel deploy and SPA rewrites
- Wrote this documentation and verified behavior locally and in deployment

All code was reviewed, adapted, and tested by me before deployment.
