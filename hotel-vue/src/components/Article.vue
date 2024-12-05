<template>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="locationData" class="article-container">
      <h2 v-if="locationData.city">{{ locationData.city }}</h2>
      <p v-if="locationData.cityDescription">{{ locationData.cityDescription }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from "vue";
  
  export default defineComponent({
    name: "Article",
    props: {
      location: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const locationData = ref<any>(null);
      const loading = ref(true);
  
      const fetchLocationData = async () => {
        loading.value = true;
        try {
          const response = await fetch("/data/hotel.json");
          const data = await response.json();
          locationData.value = data.locations.find(
            (location: any) => location.city.toLowerCase() === props.location.toLowerCase()
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          loading.value = false;
        }
      };
  
      onMounted(fetchLocationData);
  
      watch(() => props.location, fetchLocationData);
  
      return {
        locationData,
        loading,
      };
    },
  });
  </script>
  
  <style scoped>
  .article-container {
    position: absolute;
    left: 5rem;
    bottom: 5rem;
    max-width: 20rem;
    background: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
  }
  
  .loading {
    position: absolute;
    left: 5rem;
    bottom: 5rem;
    max-width: 20rem;
    background: #ffffff;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
  }
  </style>