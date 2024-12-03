<template>
  <div class="hotel-cards">
    <div v-if="filteredHotels && filteredHotels.length === 0">
      <p>Inga hotell hittades för denna plats.</p>
    </div>
    <div v-else>
      <div v-for="hotel in filteredHotels" :key="hotel.id" class="hotel-card">
        <img :src="hotel.image" :alt="hotel.name" />
        <div class="card-content">
          <h2>{{ hotel.name }}</h2>
          <p>{{ hotel.description }}</p>
          <p>Pris per natt: {{ hotel.pricePerNight }} SEK</p>
          <p>Kontakt: {{ hotel.contact }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Hotel {
  id: number;
  image: string;
  name: string;
  description: string;
  pricePerNight: number;
  contact: string;
}

interface Location {
  city: string;
  hotels: Hotel[];
}

export default defineComponent({
  name: "HotelCard",
  props: {
    location: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hotels: [] as Hotel[], // För att lagra de hotell som matchar platsen
      allLocations: [] as Location[], // Fullständiga JSON-data
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
});
</script>

<style scoped>
.hotel-cards {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
}

.hotel-card {
  display: flex;
  border: 1px solid #ccc;
  padding: 15px;
  margin: 1rem 0; 
}

img {
  width: 30%;
  height: 10rem;
  margin: 0 1rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Makes sure content is spaced out */
  flex-grow: 1; /* Makes the text container take all available space */
  padding-left: 15px;
}

h2 {
  font-size: 1.5em;
}

p {
  margin: 5px 0;
}
</style>