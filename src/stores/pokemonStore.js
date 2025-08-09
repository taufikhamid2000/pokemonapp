import { defineStore } from "pinia";
import axios from "axios";

const API_BASE = "https://pokeapi.co/api/v2";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [],
    pokemonDetailsByName: {},
    isLoadingList: false,
    isLoadingDetailByName: {},
    errorMessage: null,
    editedInfoByName: {},
  }),
  actions: {
    async fetchPokemonList(limit = 100) {
      if (this.pokemonList.length) return;
      try {
        this.isLoadingList = true;
        this.errorMessage = null;
        const { data } = await axios.get(`${API_BASE}/pokemon`, {
          params: { limit },
        });
        // Fetch details for each to get sprites and stats in parallel (batched)
        const detailPromises = data.results.map((p) => axios.get(p.url));
        const detailResponses = await Promise.all(detailPromises);
        this.pokemonList = detailResponses.map((res) => ({
          id: res.data.id,
          name: res.data.name,
          height: res.data.height,
          weight: res.data.weight,
          types: res.data.types.map((t) => t.type.name),
          sprite:
            res.data.sprites.other["official-artwork"].front_default ||
            res.data.sprites.front_default,
        }));
        // cache details
        for (const res of detailResponses) {
          this.pokemonDetailsByName[res.data.name] = res.data;
        }
      } catch (err) {
        this.errorMessage = "Failed to load Pokémon list.";
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        this.isLoadingList = false;
      }
    },
    async fetchPokemonDetail(name) {
      if (this.pokemonDetailsByName[name])
        return this.pokemonDetailsByName[name];
      try {
        this.isLoadingDetailByName[name] = true;
        const { data } = await axios.get(`${API_BASE}/pokemon/${name}`);
        this.pokemonDetailsByName[name] = data;
        return data;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        throw new Error("Failed to load details");
      } finally {
        this.isLoadingDetailByName[name] = false;
      }
    },
    saveEditedInfo(name, edited) {
      this.editedInfoByName[name] = { ...edited };
    },
  },
  getters: {
    listWithEditedIntro(state) {
      return state.pokemonList.map((p) => ({
        ...p,
        intro:
          state.editedInfoByName[p.name]?.intro ||
          `A ${p.types.join("/")} type Pokémon. Height ${p.height}, weight ${p.weight}.`,
      }));
    },
    getEditedInfo: (state) => (name) => state.editedInfoByName[name] || null,
  },
});
