<script setup lang="ts">
import HotelCard from "@/components/HotelCard.vue";
</script>

<template>
  <main class="main-container">

  </main>
  <HotelCard location="Bangkok" />
    
</template>


<style scoped>

.main-container {
  background-image: url("https://plus.unsplash.com/premium_photo-1661963188068-1bac46e28727?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Set the background image */
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
