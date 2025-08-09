import { createRouter, createWebHistory } from "vue-router";

const PokemonList = () => import("../views/PokemonList.vue");
const PokemonDetail = () => import("../views/PokemonDetail.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: PokemonList },
    {
      path: "/pokemon/:name",
      name: "pokemon-detail",
      component: PokemonDetail,
      props: true,
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
