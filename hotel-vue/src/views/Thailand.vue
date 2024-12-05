<template>
  <main class="main-container">
    <!-- HotelSearch Component -->
    <HotelSearch 
      :selectedDates="selectedDates"
      :selectedDetails="selectedDetails"
      @update-dates="updateDates"
      @update-details="updateDetails"
      :wrap="true"
      class="margin"
    />
  </main>
  <!-- Dynamic HotelCard for each location -->
  <div v-for="location in locations" :key="location">
    <HotelCard
      :location="location"
      :selectedDates="selectedDates"
      :selectedDetails="selectedDetails"
      class="margin"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HotelSearch from "../components/HotelSearch.vue";
import HotelCard from "../components/HotelCard.vue";

export default defineComponent({
  components: {
    HotelSearch,
    HotelCard,
  },
  setup() {
    const locations = ['Bangkok', 'Pattaya', 'Phuket']; // List of locations
    const selectedDetails = ref({
      guests: { adults: 2, children: 0 },
      rooms: 1,
    }); // Define selectedDetails
    const selectedDates = ref<[Date, Date]>([new Date(), new Date()]); // Define selectedDates

    // Update functions for selectedDates and selectedDetails
    const updateDates = (dates: [Date, Date]) => {
      selectedDates.value = dates;
    };

    const updateDetails = (details: { guests: { adults: number; children: number }; rooms: number }) => {
      selectedDetails.value = details;
    };

    return {
      locations,
      selectedDetails,
      selectedDates,
      updateDates,
      updateDetails,
    };
  },
});
</script>

<style scoped>
.main-container {
  background-image: url("https://plus.unsplash.com/premium_photo-1681582960523-2b5ba7ed2c20?q=80&w=2189&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Set the background image */
  background-size: cover; /* Ensure the image covers the entire area */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  height: 70dvh; /* Set to 100% of the viewport height */
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 600px;
}

.margin {
  margin-top: 4rem; /* Add space above the component */
}
</style>