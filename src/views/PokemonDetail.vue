<template>
  <div>
    <button class="btn btn-link px-0 mb-3" @click="$router.back()">
      ← Back
    </button>
    <div class="row g-4 align-items-start">
      <div class="col-12 col-lg-5">
        <div class="card shadow-sm">
          <img
            :src="sprite"
            :alt="name"
            class="card-img-top bg-light p-3"
            style="object-fit: contain; height: 320px"
          />
          <div class="card-body">
            <h3 class="card-title text-capitalize mb-1">{{ name }}</h3>
            <p class="text-muted mb-2">ID #{{ detail?.id }}</p>
            <div class="mb-2">
              <span
                class="badge bg-secondary me-1"
                v-for="t in types"
                :key="t"
                >{{ t }}</span
              >
            </div>
            <ul class="list-unstyled small text-muted mb-0">
              <li>Height: {{ detail?.height }}</li>
              <li>Weight: {{ detail?.weight }}</li>
              <li>Base Experience: {{ detail?.base_experience }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-7">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Introduction</h5>
            <form @submit.prevent="onSave">
              <div class="mb-3">
                <label class="form-label"
                  >Short intro (you can edit this)</label
                >
                <textarea
                  v-model="intro"
                  class="form-control"
                  rows="4"
                  placeholder="Write a short intro..."
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="saving">
                Save
              </button>
            </form>
          </div>
        </div>

        <div class="card shadow-sm mt-3">
          <div class="card-body">
            <h5 class="card-title">Stats</h5>
            <div class="row g-2">
              <div
                class="col-6 col-md-4"
                v-for="s in detail?.stats || []"
                :key="s.stat.name"
              >
                <div
                  class="p-2 border rounded d-flex justify-content-between align-items-center"
                >
                  <span class="text-capitalize">{{ s.stat.name }}</span>
                  <strong>{{ s.base_stat }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <LoadingSpinner v-if="isLoading" />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { usePokemonStore } from "../stores/pokemonStore";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const route = useRoute();
const name = computed(() => route.params.name);
const store = usePokemonStore();
const { pokemonDetailsByName, isLoadingDetailByName } = storeToRefs(store);

const detail = computed(() => pokemonDetailsByName.value[name.value]);
const isLoading = computed(() => isLoadingDetailByName.value[name.value]);
const types = computed(
  () => detail.value?.types?.map((t) => t.type.name) || []
);
const sprite = computed(
  () =>
    detail.value?.sprites?.other?.["official-artwork"]?.front_default ||
    detail.value?.sprites?.front_default
);

const intro = ref("");
const saving = ref(false);

onMounted(async () => {
  if (!detail.value) {
    await store.fetchPokemonDetail(name.value);
  }
  const edited = store.getEditedInfo(name.value);
  intro.value =
    edited?.intro ||
    `A ${types.value.join("/")} type Pokémon. Height ${detail.value?.height}, weight ${detail.value?.weight}.`;
});

watch(name, async (newName) => {
  if (!pokemonDetailsByName.value[newName]) {
    await store.fetchPokemonDetail(newName);
  }
  const edited = store.getEditedInfo(newName);
  intro.value =
    edited?.intro ||
    `A ${types.value.join("/")} type Pokémon. Height ${detail.value?.height}, weight ${detail.value?.weight}.`;
});

function onSave() {
  saving.value = true;
  store.saveEditedInfo(name.value, { intro: intro.value });
  setTimeout(() => {
    saving.value = false;
  }, 400);
}
</script>
