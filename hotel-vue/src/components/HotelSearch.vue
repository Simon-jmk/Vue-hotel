<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="destination">Vart reser du?</label>
        <select id="destination" v-model="destination">
          <option value="Bangkok">Bangkok</option>
          <option value="Pattaya">Pattaya</option>
          <option value="Phuket">Phuket</option>
        </select>
      </div>
      <div>
        <!-- Use DatePicker component -->
        <DatePicker
          :selectedDates="dates"
          :selectedDetails="details"
          @update-dates="updateDates"
          @update-details="updateDetails"
          :wrap="true"
        />
      </div>
      <button type="submit">Sök</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import DatePicker from "@/components/DatePicker.vue";

export default defineComponent({
  name: "HotelSearch",
  components: {
    DatePicker,
  },
  props: {
    selectedDates: {
      type: Array,
      required: true,
    },
    selectedDetails: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const dates = ref<[Date, Date]>(props.selectedDates as [Date, Date]);
    const details = ref(props.selectedDetails);
    const destination = ref("Bangkok");

    const updateDates = (newDates: [Date, Date]) => {
      dates.value = newDates;
      emit("update-dates", newDates);
    };

    const updateDetails = (newDetails: { guests: { adults: number; children: number }; rooms: number }) => {
      details.value = newDetails;
      emit("update-details", newDetails);
    };

    const handleSubmit = () => {
      console.log("Destination:", destination.value);
      console.log("Start Date:", dates.value[0]);
      console.log("End Date:", dates.value[1]);
      console.log("Guests:", details.value.guests);
      console.log("Rooms:", details.value.rooms);

      // Add parameters to the URL and navigate to the correct view
      router.push({
        path: `/${destination.value.toLowerCase()}`,
        query: {
          startDate: dates.value[0].toISOString().split('T')[0],
          endDate: dates.value[1].toISOString().split('T')[0],
          adults: details.value.guests.adults,
          children: details.value.guests.children,
          rooms: details.value.rooms,
        },
      });
    };

    return {
      dates,
      details,
      destination,
      updateDates,
      updateDetails,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
.dropdown {
  position: absolute;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 1000;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Dropdown items */
.dropdown-item {
  margin-bottom: 0.5rem;
}

/* Label styling */
.dropdown-item label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
}

/* Controls for guest and room adjustments */
.controls {
  display: flex;
  align-items: center;
  gap: 1rem; /* Increased gap to give more space for numbers */
}

.controls button {
  padding: 0.3rem 0.6rem; /* Smaller button padding */
  font-size: 1rem;
  border-radius: 50%; /* Makes the button round */
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 30px; /* Set width and height to make it perfectly round */
  height: 30px;
}

.controls button:hover {
  background-color: #0056b3;
}

.controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Span for the number, with more space */
.controls span {
  font-size: 1.2rem;
  min-width: 40px; /* Ensures the number has enough space */
  text-align: center; /* Centers the number inside the span */
}

/* Styling for the main form */
form {
  display: flex;
  background-color: white;
  flex-direction: column;
  gap: 1rem;
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 1.5rem;
  padding: 1.5rem;
}

/* Input field styling */
input, select {
  padding: 0.55rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  width: 100%;
  box-sizing: border-box;
}

/* Label styling for input fields */
label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
}

/* Button styling for the submit button */
button[type="submit"] {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
.done-button {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  width: 100%;
  text-align: center;
  margin-top: 1rem;
}

.done-button:hover {
  background-color: #388e3c;
}
</style>