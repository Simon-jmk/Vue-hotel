<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { provideBasket } from "@/store/basketState"; // Import provideBasket
import HotelSearch from "@/components/HotelSearch.vue";
import Menu from "@/components/Menu.vue";

export default defineComponent({
  components: {
    HotelSearch,
    Menu,
  },
  setup() {
    provideBasket(); // Call provideBasket to provide the basket context to child components

    return {};
  },
});
</script>

<template>
  <header class="header">
    <Menu />
  </header>
  <main class="main-container">
    <router-view />
  </main>
</template>

<style scoped>
/* Your styles here */
</style>
