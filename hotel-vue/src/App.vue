<script setup lang="ts">
import HotelSearch from "./components/HotelSearch.vue";
import Menu from "./components/Menu.vue";
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


</style>
