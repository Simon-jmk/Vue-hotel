<script setup lang="ts">
import { ref } from 'vue';
import { useBasketStore } from '@/store/basket';
import { formatDate } from '../utils/dateUtils';

const basketStore = useBasketStore();

const allLocations = ref<any[]>([]); // All available locations with hotels

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

const removeItem = (index: number) => {
  basketStore.removeItem(index);
};
</script>

<template>
  <div class="basket-container">
    <h2>Din Kundvagn</h2>
    <div v-if="basketStore.items.length === 0" class="empty-basket">
      <p>Din kundvagn är tom.</p>
    </div>
    <div v-else>
      <div v-for="(item, index) in basketStore.items" :key="index" class="basket-card">
        <div class="image-container">
          <img :src="item.hotel.image" :alt="item.hotel.name" />
        </div>
        <div class="card-content">
          <h2>{{ item.hotel.name }}</h2>
          <p><strong>Val: </strong>{{ item.option.description }}</p>
          <p>
            <strong>Gäster:</strong> {{ item.guests.adults }} vuxna,
            {{ item.guests.children }} barn
          </p>
          <p><strong>Rum:</strong> {{ item.rooms }}</p>
        </div>
        <div class="card-content margin-top">
          <p><strong>Pris per dag:</strong> {{ Math.round(item.option.price) }} SEK</p>
          <p v-if="item.dates && item.dates.length === 2">
            <strong>Datum:</strong> {{ formatDate(new Date(item.dates[0])) }} -
            {{ formatDate(new Date(item.dates[1])) }}
          </p>
          <p><strong>Total:</strong> {{ item.totalAmount }} SEK</p>
        </div>
        <div class="button-container">
          <button @click="removeItem(index)">Ta bort</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basket-container {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
.basket-card {
  display: flex;
  align-items: stretch;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
}
.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
.margin-top {
  margin-top: 2.7rem;
}
button {
  background-color: #ff0101;
  color: white;
  border: none;
  height: 2rem;
  width: 4rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #be0000;
}
.button-container {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  justify-content: flex-end;
}
</style>