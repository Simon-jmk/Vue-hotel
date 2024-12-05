// store/basket.ts
import { defineStore } from 'pinia';

export interface BasketItem {
  hotel: {
    name: string;
    image: string;
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

export const useBasketStore = defineStore('basket', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('basket') || '[]') as BasketItem[],
  }),
  actions: {
    addItem(item: BasketItem) {
      this.items.push(item);
      this.saveToLocalStorage();
    },
    removeItem(index: number) {
      this.items.splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('basket', JSON.stringify(this.items));
    },
  },
  getters: {
    totalAmount: (state) => state.items.reduce((sum, item) => sum + item.totalAmount, 0),
  },
});