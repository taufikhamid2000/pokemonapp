<template>
  <div
    class="card h-100 shadow-sm pokemon-card"
    @click="
      $router.push({ name: 'pokemon-detail', params: { name: pokemon.name } })
    "
    style="cursor: pointer"
  >
    <img
      :src="pokemon.sprite"
      class="card-img-top bg-light"
      :alt="pokemon.name"
      style="object-fit: contain; height: 180px"
    />
    <div class="card-body">
      <h5 class="card-title text-capitalize">{{ pokemon.name }}</h5>
      <p class="card-text small text-muted mb-2">
        Types:
        <span
          class="badge bg-secondary me-1"
          v-for="t in pokemon.types"
          :key="t"
          >{{ t }}</span
        >
      </p>
      <p class="card-text">{{ pokemon.intro }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pokemon: { type: Object, required: true },
});
</script>

<style scoped>
.pokemon-card:hover {
  transform: translateY(-2px);
  transition: transform 0.15s ease-in-out;
}
</style>
