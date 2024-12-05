import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Thailand.vue';
import Bangkok from '@/views/Bangkok.vue';
import Pattaya from '@/views/Pattaya.vue';
import Phuket from '@/views/Phuket.vue';
import Basket from '@/views/Basket.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/bangkok',
    name: 'bangkok',
    component: Bangkok,
  },
  {
    path: '/pattaya',
    name: 'pattaya',
    component: Pattaya,
  },
  {
    path: '/phuket',
    name: 'phuket',
    component: Phuket,
  },
  {
    path: '/cart',
    name: 'basket',
    component: Basket,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
