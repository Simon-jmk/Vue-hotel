<script lang="ts">
import { defineComponent } from "vue";
import HotelSearch from "@/components/HotelSearch.vue";
import Menu from "@/components/Menu.vue";

export default defineComponent({
  components: {
    HotelSearch,
    Menu,
  },
  setup() {
    // No need to call provideBasket here as Pinia is already set up in main.ts
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