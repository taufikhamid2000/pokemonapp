<template>
  <div>
    <div
      class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3"
    >
      <h2 class="mb-0">Pokémon</h2>
      <input
        v-model="query"
        type="search"
        class="form-control form-control-lg"
        placeholder="Search by name..."
        aria-label="Search by name"
        style="max-width: 520px"
      />
    </div>

    <LoadingSpinner v-if="isLoading" />

    <div v-else>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <div
        v-else
        class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3"
      >
        <div class="col" v-for="p in filtered" :key="p.name">
          <PokemonCard :pokemon="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { usePokemonStore } from "../stores/pokemonStore";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import PokemonCard from "../components/PokemonCard.vue";

const store = usePokemonStore();
const { isLoadingList, errorMessage, listWithEditedIntro } = storeToRefs(store);
const query = ref("");

onMounted(() => {
  store.fetchPokemonList(100);
});

const isLoading = computed(() => isLoadingList.value);
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return listWithEditedIntro.value;
  return listWithEditedIntro.value.filter((p) => p.name.includes(q));
});
</script>
