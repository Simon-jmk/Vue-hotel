<template>
  <div>
    <form @submit.prevent="handleSubmit" :class="{'horizontal-form': true, 'wrap-form': wrap}">
      <div class="form-group">
        <label for="dates">Datum</label>
        <Datepicker
          v-model="dates"
          range
          format="dd MMM"
          :enable-time-picker="false"
        />
      </div>
      <div class="form-group">
        <label for="guests">Gäster</label>
        <input
          id="guests"
          type="text"
          :value="guestSummary"
          @click="toggleDropdown"
          readonly
          placeholder="2 resenärer, 1 rum"
        />
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
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
  name: "DatePicker",
  components: {
    Datepicker,
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
    wrap: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const dates = ref<[Date, Date]>(props.selectedDates as [Date, Date]);
    const guests = ref(props.selectedDetails.guests);
    const rooms = ref(props.selectedDetails.rooms);
    const isDropdownOpen = ref(false);

    const guestSummary = computed(() => {
      return `${guests.value.adults + guests.value.children} resenärer, ${
        rooms.value
      } rum`;
    });

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
      emit("update-dates", dates.value);
      emit("update-details", { guests: guests.value, rooms: rooms.value });
    };

    // Watch for changes in selected dates and update accordingly
    watch(
      () => props.selectedDates,
      (newDates) => {
        dates.value = newDates as [Date, Date];
      }
    );

    watch(
      () => props.selectedDetails,
      (newDetails) => {
        guests.value = newDetails.guests;
        rooms.value = newDetails.rooms;
      },
      { deep: true }
    );

    return {
      dates,
      guests,
      rooms,
      isDropdownOpen,
      guestSummary,
      toggleDropdown,
      adjustGuests,
      adjustRooms,
      handleSubmit,
    };
  },
});
</script>

<style scoped>
/* Horizontal form styling */
.horizontal-form {
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 700px;
}

.wrap-form {
  flex-wrap: wrap;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

input {
  padding: 0.55rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  width: 100%;
  box-sizing: border-box;
}

button[type="submit"] {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

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

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.controls button {
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
}

.controls button:hover {
  background-color: #0056b3;
}

.controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.controls span {
  font-size: 1.2rem;
  min-width: 40px;
  text-align: center;
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

@media screen and (max-width: 920px) {
  .horizontal-form {
    flex-direction: column;
    width: 21rem;
  }
}
</style>