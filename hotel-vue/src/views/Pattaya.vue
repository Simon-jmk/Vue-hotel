<script lang="ts">
import { defineComponent, ref } from "vue";
import Datepicker from "@/components/DatePicker.vue";
import HotelCard from "@/components/HotelCard.vue";

export default defineComponent({
  components: {
    Datepicker,
    HotelCard,
  },
  setup() {
    const selectedDates = ref<[Date, Date]>([new Date(), new Date()]);
    const selectedGuests = ref<number>(2); // Default to 2 guests
    const selectedKids = ref<number>(0); // Default to 0 kids
    const selectedRooms = ref<number>(1); // Default to 1 room

    const updateDates = (dates: [Date, Date]) => {
      selectedDates.value = dates;
    };

    return {
      selectedDates,
      selectedGuests,
      selectedKids,
      selectedRooms,
      updateDates,
    };
  },
});
</script>

<template>
  <main class="main-container"></main>
  <div>
    <Datepicker @update-dates="updateDates" class="margin" />
    <HotelCard
      :location="'Pattaya'"
      :selectedDates="selectedDates"
      :selectedGuests="selectedGuests"
      :selectedKids="selectedKids"
      :selectedRooms="selectedRooms"
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
  height: 100vh; /* Full height of the viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Stack the components vertically */
  gap: 1rem; /* Space between the components */
  padding: 2rem; /* Add padding around the content */
}

.margin {
  margin-top: 2rem; /* Add space above the component */
}
</style>
