// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import Index from '../views/Index.vue';
import SearchedFlights from '../views/SearchedFlights.vue'
import BookingStatus from '../views/BookingStatus.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/flights',
    name: 'SearchedFlights',
    component: SearchedFlights,
  },
  {
    path: '/status',
    name: 'BookingStatus',
    component: BookingStatus,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
