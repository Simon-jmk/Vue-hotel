<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="destination">Vart reser du?</label>
        <input id="destination" type="text" placeholder="Bangkok, Thailand" />
      </div>
      <div>
        <label for="dates">Datum</label>
        <!-- @vuepic/vue-datepicker binding -->
        <Datepicker
          v-model="dates"
          range
          format="dd MMM"
          :enable-time-picker="false"
        />
      </div>
      <div>
        <label for="guests">Gäster</label>
        <input
          id="guests"
          type="text"
          :value="guestSummary"
          @click="toggleDropdown"
          readonly
          placeholder="2 resenärer, 1 rum"
        />
        <!-- Dropdown for guest selection -->
        <div v-if="isDropdownOpen" class="dropdown">
          <div class="dropdown-item">
            <label>Vuxna</label>
            <div class="controls">
              <button
                @click="adjustGuests('adults', -1)"
                :disabled="guests.adults === 1"
              >
                -
              </button>
              <span>{{ guests.adults }}</span>
              <button @click="adjustGuests('adults', 1)">+</button>
            </div>
          </div>
          <div class="dropdown-item">
            <label>Barn</label>
            <div class="controls">
              <button
                @click="adjustGuests('children', -1)"
                :disabled="guests.children === 0"
              >
                -
              </button>
              <span>{{ guests.children }}</span>
              <button @click="adjustGuests('children', 1)">+</button>
            </div>
          </div>
          <div class="dropdown-item">
            <label>Rum</label>
            <div class="controls">
              <button @click="adjustRooms(-1)" :disabled="rooms === 1">
                -
              </button>
              <span>{{ rooms }}</span>
              <button @click="adjustRooms(1)">+</button>
            </div>
          </div>
          <div class="dropdown-item">
            <button @click="toggleDropdown" class="done-button">Done</button>
          </div>
        </div>
      </div>
      <button type="submit">Sök</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css"; // import the css file

export default defineComponent({
  name: "HotelSearch",
  components: {
    Datepicker,
  },
  setup() {
    // Set default dates for the range (start and end dates)
    const currentDate = new Date();
    const defaultStartDate = new Date(currentDate);
    defaultStartDate.setDate(currentDate.getDate() + 1); // default start date to tomorrow
    const defaultEndDate = new Date(currentDate);
    defaultEndDate.setDate(currentDate.getDate() + 2); // default end date to the day after tomorrow

    const dates = ref<[Date, Date]>([
      defaultStartDate,
      defaultEndDate,
    ]);

    const guests = ref({ adults: 2, children: 0 });
    const rooms = ref(1);
    const isDropdownOpen = ref(false);

    const guestSummary = computed(() => {
      return `${guests.value.adults + guests.value.children} resenärer, ${
        rooms.value
      } rum`;
    });

    const startYear = 2023; // Example start year
    const endYear = 2030; // Example end year

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const adjustGuests = (type: "adults" | "children", delta: number) => {
      if (guests.value[type] + delta >= 0) {
        guests.value[type] += delta;
      }
    };

    const adjustRooms = (delta: number) => {
      if (rooms.value + delta >= 1) {
        rooms.value += delta;
      }
    };

    const handleSubmit = () => {
      console.log("Start Date:", dates.value[0]);
      console.log("End Date:", dates.value[1]);
      console.log("Guests:", guests.value);
      console.log("Rooms:", rooms.value);
    };

    return {
      dates,
      guests,
      rooms,
      isDropdownOpen,
      guestSummary,
      startYear,
      endYear,
      toggleDropdown,
      adjustGuests,
      adjustRooms,
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
input {
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
