<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { platform, platforms } = storeToRefs(store);
</script>

<template>
  <div class="mx-auto flex items-center md:justify-center space-x-2 p-4 text-xs uppercase whitespace-nowrap scroll-smooth">
    <button @click="store.scrollLeft()" id="scrollLeft" class="p-2 mr-2 bg-neutral-300 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none md:hidden">
      <!-- Heroicon: Chevron Left -->
      <svg xmlns="https://www.w3.org" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>  
    
    <div id="scrollContainer" class="flex overflow-x-scroll items-center lg:justify-center lg:overflow-x-hidden space-x-4 w-full max-w-4xl bg-gray-100 rounded-lg shadow-inner">
      <button v-for="pf in platforms" @click.prevent="platform = pf.name" 
      :class="{
        'bg-neutral-300 text-white' : platform !== pf.name,
        'bg-green-200 text-green-600' : platform == pf.name,
      }"
      class="uppercase flex-shrink-0 px-2 py-2 rounded-full cursor-pointer hover:bg-neutral-600"
      >
        {{ pf.desc }}
      </button>
    </div>

    <button @click="store.scrollRight()" id="scrollRight" class="p-2 ml-1 bg-neutral-300 text-white rounded-full shadow-lg hover:bg-green-600 focus:outline-none md:hidden">
      <!-- Heroicon: Chevron Right -->
      <svg xmlns="https://www.w3.org" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>  
  </div>
</template>