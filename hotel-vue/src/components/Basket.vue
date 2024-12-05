<script setup lang="ts">
import type { Ref } from "vue";
import { useBasket } from "@/store/basketState";
import { formatDate } from "../utils/dateUtils";

interface BasketItem {
  hotel: {
    name: string;
  };
  option: {
    name: string;
    description: string;
    price: number;
  };
  guests: {
    adults: number;
    children: number;
  };
  rooms: number;
  dates: [Date, Date];
  totalAmount: number;
}

const basket = useBasket() as Ref<BasketItem[]>;

const removeItem = (index: number) => {
  basket.value.splice(index, 1);
};

const clearBasket = () => {
  basket.value.length = 0;
};
</script>

<template>
  <div class="basket-container">
    <h2>Din Kundvagn</h2>
    <div v-if="basket.length === 0">
      <p>Din kundvagn är tom.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="(item, index) in basket" :key="index">
          <p>{{ item.hotel.name }} - {{ item.option.name }}</p>
          <p>{{ item.option.description }}</p>
          <p>Pris: {{ Math.round(item.option.price) }} SEK</p>
          <p>
            Gäster: {{ item.guests.adults }} vuxna,
            {{ item.guests.children }} barn
          </p>
          <p>Rum: {{ item.rooms }}</p>
          <p v-if="item.dates && item.dates.length === 2">
            Datum: {{ formatDate(new Date(item.dates[0])) }} -
            {{ formatDate(new Date(item.dates[1])) }}
          </p>
          <p>Total Amount: {{ item.totalAmount }} SEK</p>
          <button @click="removeItem(index)">Ta bort</button>
        </li>
      </ul>
      <button @click="clearBasket">Töm kundvagnen</button>
    </div>
  </div>
</template>

<style scoped>
.basket-container {
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
