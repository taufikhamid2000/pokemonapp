<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <RouterLink class="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src="/favicon.svg" alt="" width="26" height="26" />
          Pokémon
        </RouterLink>
      </div>
    </nav>
    <main class="container py-4">
      <RouterView />
    </main>
  </div>
  <footer class="text-center text-muted py-4">
    <small
      >Data from
      <a href="https://pokeapi.co/" target="_blank" rel="noreferrer"
        >PokeAPI</a
      ></small
    >
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
