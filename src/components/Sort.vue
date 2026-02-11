<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { sortBy, sorts, toggleSort } = storeToRefs(store);
</script>

<template>
  <div class="relative cursor-pointer uppercase text-green-600 py-2">
    <div @click="toggleSort = !toggleSort" class="flex items-center justify-between space-x-2 px-2 ">
      <a class="menu-hover py-2 text-xs lg:mx-2">
        {{ sortBy }}
      </a>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="h-4 w-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </span>
    </div>

    <div v-if="toggleSort" class="absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 shadow-xl">
      <a 
        v-for="sort in sorts" 
        @click="sortBy = sort; toggleSort = !toggleSort" 
        class="my-2 block border-b border-gray-100 py-1 text-xs hover:text-green-600 md:mx-2"
        :class="{
          'text-green-600' : sort === sortBy,
          'text-white' : sort !== sortBy,
        }"
      >
        {{ sort }}
      </a>
    </div>
  </div>
</template>