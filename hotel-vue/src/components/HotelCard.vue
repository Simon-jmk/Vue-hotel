<template>
  <div class="hotel-cards">
    <div v-if="filteredHotels && filteredHotels.length === 0">
      <p>Inga hotell hittades för denna plats.</p>
    </div>
    <div v-else>
      <div v-for="hotel in filteredHotels" :key="hotel.id" class="hotel-card">
        <div class="image-container">
          <img :src="hotel.image" :alt="hotel.name" />
        </div>
        <div class="card-content">
          <h2>{{ hotel.name }}</h2>
          <p>{{ hotel.description }}</p>
          <p>Pris per natt: {{ Math.round(hotel.pricePerNight) }} SEK</p>
          <p>Kontakt: {{ hotel.contact }}</p>
        </div>
        <!-- Options -->
        <div class="options">
          <div
            v-for="option in hotelOptions(hotel.pricePerNight)"
            :key="option.name"
            class="option"
          >
            <h3>{{ option.name }}</h3>
            <p>{{ option.description }}</p>
            <!-- Adjusted price based on numberOfNights -->
            <p>Pris: {{ Math.round(option.price * numberOfNights) }} SEK</p>
            <button 
              @click="addToCart(hotel, option)"
              :disabled="!datesExplicitlySelected"
            >
              Lägg till i kundvagnen
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";

export interface Hotel {
  id: number;
  image: string;
  name: string;
  description: string;
  pricePerNight: number;
  contact: string;
}

export interface Location {
  city: string;
  hotels: Hotel[];
}

export interface Option {
  name: string;
  description: string;
  price: number;
}

export default defineComponent({
  name: "HotelCard",
  props: {
    location: {
      type: String,
      required: true,
    },
    selectedDates: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      hotels: [] as Hotel[],
      allLocations: [] as Location[],
      cart: [] as { hotel: Hotel; option: Option }[],
      datesExplicitlySelected: false, // Flag to track if dates have been explicitly selected
    };
  },
  computed: {
    filteredHotels(): Hotel[] {
      if (!this.allLocations || this.allLocations.length === 0) {
        return [];
      }
      const locationData = this.allLocations.find(
        (loc) => loc.city.toLowerCase() === this.location.toLowerCase()
      );
      return locationData ? locationData.hotels : [];
    },

    numberOfNights(): number {
      if (this.selectedDates && this.selectedDates.length === 2) {
        const [start, end] = this.selectedDates as [Date, Date];
        const diffTime = end.getTime() - start.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
      }
      return 1;
    },

    datesSelected(): boolean {
      return (
        this.selectedDates &&
        this.selectedDates.length === 2 &&
        this.selectedDates[0] instanceof Date &&
        this.selectedDates[1] instanceof Date
      );
    },
  },
  methods: {
    hotelOptions(basePrice: number): Option[] {
      return [
        {
          name: "Standard",
          description: "Standardrum utan extra tillval.",
          price: basePrice,
        },
        {
          name: "Gold",
          description: "10% rabatt på baren + gratis frukost.",
          price: basePrice * 1.2,
        },
        {
          name: "Platinum",
          description: "Upphämtning från flygplats + all inclusive.",
          price: basePrice * 1.5,
        },
      ];
    },
    addToCart(hotel: Hotel, option: Option) {
      this.cart.push({ hotel, option });
      alert(`${option.name} för ${hotel.name} har lagts till i kundvagnen!`);
    },
  },
  created() {
    fetch("/data/hotel.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP-fel! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.allLocations = data.locations as Location[];
      })
      .catch((error) => {
        console.error("Kunde inte ladda hotellinformationen:", error);
      });
  },
  watch: {
    selectedDates: {
      handler() {
        // Trigger recomputation of numberOfNights when selectedDates change
        this.numberOfNights;
        this.datesExplicitlySelected = true; // Set the flag to true when dates are explicitly selected
      },
      deep: true,
    },
  },
});
</script>

<style scoped>
.hotel-cards {
  margin: 0 2rem;
}

.hotel-card {
  border-bottom: 1px solid #ccc;
  padding: 15px;
  margin: 1rem 0;
  display: flex;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  gap: 1rem;
}

.image-container {
  width: 15rem;
  height: 12rem;
  overflow: hidden;
  flex-shrink: 0;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.options {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
}

.option {
  width: 10rem;
  gap: 0.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>