<template>
  <div >
    <div v-if="filteredHotels.length" class="hotel-container">
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
              Köp
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Inga hotell hittades för denna plats.</p>
      <p>Kontrollera att JSON-filen innehåller rätt data och att platsen är korrekt.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useBasketStore } from "../store/basket";

export interface Hotel {
  id: number;
  name: string;
  description: string;
  pricePerNight: number;
  contact: string;
  image: string;
  location: string;
}

export default defineComponent({
  name: "HotelCard",
  props: {
    location: {
      type: String,
      required: true,
    },
    selectedDates: {
      type: Array as () => Date[],
      required: true,
    },
    selectedDetails: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const basketStore = useBasketStore(); // Use the Pinia store

    const hotels = ref<Hotel[]>([]); // Initialize as an empty array
    const datesExplicitlySelected = ref(false);

    const numberOfNights = computed(() => {
      if (props.selectedDates.length === 2) {
        const [start, end] = props.selectedDates;
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      return 0;
    });

    const filteredHotels = computed(() => {
      const filtered = hotels.value.filter(hotel => hotel.location === props.location);
      console.log("Filtered hotels:", filtered); // Debugging information
      return filtered;
    });

    const hotelOptions = (pricePerNight: number) => {
      return [
        {
          name: "Standard",
          description: "Standard room",
          price: pricePerNight,
        },
        {
          name: "Deluxe",
          description: "Deluxe room",
          price: pricePerNight * 1.5,
        },
        {
          name: "Suite",
          description: "Suite room",
          price: pricePerNight * 2,
        },
      ];
    };

    const addToCart = (hotel: Hotel, option: { name: string; description: string; price: number }) => {
      const item = {
        hotel: {
          name: hotel.name,
          image: hotel.image,
        },
        option: {
          name: option.name,
          description: option.description,
          price: option.price,
        },
        guests: props.selectedDetails.guests,
        rooms: props.selectedDetails.rooms,
        dates: props.selectedDates as [Date, Date], // Ensure this matches the expected type
        totalAmount: option.price * numberOfNights.value,
      };
      basketStore.addItem(item);
      console.log("Added to cart:", item); // Debugging information
    };

    watch(
      () => props.selectedDates,
      (newDates) => {
        datesExplicitlySelected.value = newDates.length === 2;
      }
    );

    fetch("/data/hotel.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP-fel! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Flatten the hotels array from all locations
        hotels.value = data.locations.flatMap((location: { hotels: Hotel[] }) => location.hotels) || [];
        console.log("Fetched hotels:", hotels.value); // Debugging information
      })
      .catch((error) => {
        console.error("Kunde inte ladda hotellinformationen:", error);
      });

    console.log("Location prop:", props.location); // Debugging information
    console.log("Selected dates prop:", props.selectedDates); // Debugging information
    console.log("Selected details prop:", props.selectedDetails); // Debugging information

    return {
      filteredHotels,
      hotelOptions,
      addToCart,
      datesExplicitlySelected,
      numberOfNights,
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
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Adds spacing between the cards */
  ;
}

.hotel-card {
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  padding-bottom: 2rem;
  margin: auto 1rem;
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  grid-row: auto;
  align-items: flex-start;
  justify-content: flex-start;

  box-sizing: border-box;
  gap: 1rem;
  flex-wrap: wrap;
}

.image-container {
  width: 15rem;
  height: 12rem;
  overflow: hidden;
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
  width: 100%;
  padding-right: 1rem;
  margin-right: 1rem;
  font-size: small;
}

.options {
  display: flex;
  justify-content: flex-end;
  
}

.option {
  gap: 0.5rem;
  height: 100%;
  width: 6.5rem;
  margin-right: 0.5rem;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  font-size: small;

}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  max-width: 4rem;
  font-size: small;
  margin-top: 60%;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

@media screen and (max-width: 920px) {
  .hotel-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2rem;

  }
  .image-container {
    width: 100%;
    height: 10rem;
  }

  .hotel-card {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 2rem;
    box-shadow: 0rem 0.5rem 2rem #ccc;
    max-width: 40%;
    min-width: 21rem;
    font-size: smaller;
  }
  .options {
    justify-content: flex-start;
    
  }
  .option {
    max-width: 25%;
    font-size: x-small;
}
  button {
    font-size: smaller;
  }
}
</style>
