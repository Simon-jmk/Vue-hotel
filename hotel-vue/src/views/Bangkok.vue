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

    const updateDates = (dates: [Date, Date]) => {
      selectedDates.value = dates;
    };

    return {
      selectedDates,
      updateDates,
    };
  },
});
</script>

<template>
  <main class="main-container"></main>
  <div>
    <Datepicker @update-dates="updateDates" class="margin"/>
    <HotelCard :location="'Bangkok'" :selectedDates="selectedDates" class="margin"/>
  </div>
</template>

<style scoped>
.main-container {
  background-image: url("https://plus.unsplash.com/premium_photo-1661963188068-1bac46e28727?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"); /* Set the background image */
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
