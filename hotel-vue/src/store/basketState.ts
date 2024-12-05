import { ref, provide, inject, watch } from "vue";
import type { Ref } from "vue";

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

const basketSymbol = Symbol();

export function provideBasket() {
  const basket = ref<BasketItem[]>(
    JSON.parse(localStorage.getItem("basket") || "[]")
  );
  provide(basketSymbol, basket);

  watch(
    basket,
    (newBasket) => {
      localStorage.setItem("basket", JSON.stringify(newBasket));
    },
    { deep: true }
  );

  return basket;
}

export function useBasket(): Ref<BasketItem[]> {
  const basket = inject<Ref<BasketItem[]>>(basketSymbol);
  if (!basket) {
    throw new Error("useBasket must be used within a provideBasket");
  }
  return basket;
}
