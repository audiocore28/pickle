<script setup>

import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { search, platform, toggleSearch } = storeToRefs(store);
</script>

<template>
  <div class="flex justify-center items-center">
    <div @click="toggleSearch = !toggleSearch" class="search-icon bg-neutral-300 hover:bg-green-600 text-white px-2 py-2 rounded-full relative z-10 shadow-md">
      <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998 12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925 15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025 12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="w-[200px] h-[32px]">
      <!-- Logo -->
      <!-- <h1 
        v-if="!toggleSearch"
        class="ml-8 mt-1 font-semibold uppercase flex items-center justify-center"
      >
        held fun
      </h1> -->
      <input
        v-model="search" 
        v-if="toggleSearch"
        class="search-input w-full px-4 py-2 appearance-none rounded-r-lg text-sm text-gray-800 border-gray-300 hover:border-gray-400 transition-colors leading-tight bg-neutral-100 outline-none focus:outline-none:focus focus:ring-green-600 focus:border-green-600 focus:shadow-outline" type="search" autocomplete="off" spellcheck="false" aria-live="polite" :placeholder=" `Search ${platform} games...`"
      >
    </div>
  </div>
</template>