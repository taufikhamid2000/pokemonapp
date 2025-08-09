<template>
  <div>
    <div
      class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3"
    >
      <h2 class="mb-0">Pokémon</h2>
      <div
        class="d-flex gap-2 align-items-center"
        style="max-width: 520px; width: 100%"
      >
        <input
          v-model="query"
          type="search"
          class="form-control form-control-lg"
          placeholder="Search by name..."
          aria-label="Search by name"
        />
        <select
          v-model.number="itemsPerPage"
          class="form-select"
          style="max-width: 140px"
          aria-label="Items per page"
          title="Items per page"
        >
          <option :value="12">12</option>
          <option :value="24">24</option>
          <option :value="48">48</option>
          <option :value="0">All</option>
        </select>
      </div>
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
        <div class="col" v-for="p in paginated" :key="p.name">
          <PokemonCard :pokemon="p" />
        </div>
      </div>
      <nav v-if="totalPages > 1" class="mt-3" aria-label="Pagination">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: page === 1 }">
            <button class="page-link" @click="page = Math.max(1, page - 1)">
              Prev
            </button>
          </li>
          <li
            v-for="n in totalPages"
            :key="n"
            class="page-item"
            :class="{ active: page === n }"
          >
            <button class="page-link" @click="page = n">{{ n }}</button>
          </li>
          <li class="page-item" :class="{ disabled: page === totalPages }">
            <button
              class="page-link"
              @click="page = Math.min(totalPages, page + 1)"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { usePokemonStore } from "../stores/pokemonStore";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import PokemonCard from "../components/PokemonCard.vue";

const store = usePokemonStore();
const { isLoadingList, errorMessage, listWithEditedIntro } = storeToRefs(store);
const query = ref("");

const itemsPerPage = ref(Number(localStorage.getItem("itemsPerPage")) || 24);
const page = ref(1);

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return listWithEditedIntro.value;
  return listWithEditedIntro.value.filter((p) => p.name.includes(q));
});

const totalPages = computed(() => {
  if (itemsPerPage.value === 0) return 1;
  return Math.max(1, Math.ceil(filtered.value.length / itemsPerPage.value));
});

const paginated = computed(() => {
  if (itemsPerPage.value === 0) return filtered.value;
  const start = (page.value - 1) * itemsPerPage.value;
  return filtered.value.slice(start, start + itemsPerPage.value);
});

// Reset page on filter or items-per-page change; persist selection
watch([query, itemsPerPage], () => {
  page.value = 1;
  localStorage.setItem("itemsPerPage", String(itemsPerPage.value));
});

// watch(page, () => {
//   localStorage.setItem("itemsPerPage", itemsPerPage.value);
// });

onMounted(() => {
  store.fetchPokemonList(100);
});

const isLoading = computed(() => isLoadingList.value);
</script>
