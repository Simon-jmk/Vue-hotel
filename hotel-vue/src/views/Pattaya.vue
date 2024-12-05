<script lang="ts">
import { defineComponent, ref } from "vue";
import Datepicker from "@/components/DatePicker.vue";
import HotelCard from "@/components/HotelCard.vue";
import Article from "@/components/Article.vue";

export default defineComponent({
  components: {
    Datepicker,
    HotelCard,
    Article,
  },
  setup() {
    const selectedDates = ref<[Date, Date]>([new Date(), new Date()]);
    const selectedDetails = ref({
      guests: { adults: 2, children: 0 }, // Default to 2 adults and 0 children
      rooms: 1, // Default to 1 room
    });

    const updateDates = (dates: [Date, Date]) => {
      selectedDates.value = dates;
    };

    const updateDetails = (details: {
      guests: { adults: number; children: number };
      rooms: number;
    }) => {
      selectedDetails.value = details;
    };

    return {
      selectedDates,
      selectedDetails,
      updateDates,
      updateDetails,
    };
  },
});
</script>

<template>
  <main class="main-container">
    <Article :location="'Pattaya'" />
    
  </main>
  <div><Datepicker
      :selectedDates="selectedDates"
      :selectedDetails="selectedDetails"
      @update-dates="updateDates"
      @update-details="updateDetails"
      class="margin"
    />
    <HotelCard
      :location="'Pattaya'"
      :selectedDates="selectedDates"
      :selectedDetails="selectedDetails"
      class="margin"
    />
  </div>
</template>

<style scoped>
.main-container {
  background-image: url("https://images.unsplash.com/photo-1646747025339-65759e192eb6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover; /* Ensure the image covers the entire area */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  position: relative;
  height: 100vh; /* Full height of the viewport */
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.margin {
  margin-top: 2rem; /* Add space above the component */
}
</style>
