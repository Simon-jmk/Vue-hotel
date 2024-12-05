<template>
  <div class="mainer">
    <h2>{{ location || 'No Location' }} Hotels:</h2>
    <div v-if="filteredHotels.length > 0">
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
    <div v-else>
      <p>Inga hotell hittades för denna plats.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useBasket } from "@/store/basketState";

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
    selectedDetails: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const basket = useBasket(); // Injecting the basket from the parent
    const hotels = ref<any[]>([]); // For storing hotels filtered by location
    const allLocations = ref<any[]>([]); // All available locations with hotels
    const datesExplicitlySelected = ref(false);

    // Fetch hotel data on component mount
    fetch("/data/hotel.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP-fel! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        allLocations.value = data.locations; // Assuming 'locations' is part of the JSON
      })
      .catch((error) => {
        console.error("Kunde inte ladda hotellinformationen:", error);
      });

    // Computed property to filter hotels based on the location passed in props
    const filteredHotels = computed(() => {
      if (!props.location || typeof props.location !== 'string') {
        return [];
      }
      const locationData = allLocations.value.find(
        (loc) => loc.city.toLowerCase() === props.location.toLowerCase()
      );
      return locationData ? locationData.hotels : [];
    });

    // Compute the number of nights based on selected dates
    const numberOfNights = computed(() => {
      if (props.selectedDates && props.selectedDates.length === 2) {
        const [start, end] = props.selectedDates as [Date, Date];
        const diffTime = end.getTime() - start.getTime();
        return Math.ceil(diffTime / (1000 * 3600 * 24));
      }
      return 1; // Default to 1 night if dates are not selected correctly
    });

    // Define hotel options based on base price (e.g., Standard, Gold, Platinum)
    const hotelOptions = (basePrice: number) => [
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

    // Add selected hotel and option to the basket
    const addToCart = (hotel: any, option: any) => {
      const totalAmount = option.price * numberOfNights.value;
      basket.value.push({
        hotel,
        option,
        guests: props.selectedDetails.guests,
        rooms: props.selectedDetails.rooms,
        dates: props.selectedDates as [Date, Date], // Type assertion
        totalAmount,
      });
      alert(`${option.name} för ${hotel.name} har lagts till i kundvagnen!`);
    };

    // Watch for changes in selected dates and set flag accordingly
    watch(
      () => props.selectedDates,
      () => {
        datesExplicitlySelected.value = true;
      },
      { deep: true }
    );

    return {
      filteredHotels,
      numberOfNights,
      hotelOptions,
      addToCart,
      datesExplicitlySelected,
    };
  },
});
</script>

<style scoped>
.mainer {
  margin: 0 3rem;
  margin-bottom: 5rem;
}

.hotel-cards {
  margin: 0 2rem;
}

.hotel-card {
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  padding-bottom: 2rem;
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