<script setup lang="ts">
import HotelCard from "@/components/HotelCard.vue";
</script>

<template>
  <main class="main-container">
  </main>
  <HotelCard location="Pattaya" />

</template>

<style scoped>

.main-container {
  background-image: url("https://images.unsplash.com/photo-1646747025339-65759e192eb6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Set the background image */
  background-size: cover; /* Ensure the image covers the entire area */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  height: 70dvh; /* Set to 100% of the viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 600px;
}
</style>
