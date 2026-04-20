<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();

const { filteredGenres, genreIndex } = storeToRefs(gameStore);
</script>

<template>
  <div class="flex gap-1.5 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible pb-1 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
    <button 
      @click="genreIndex = 'all'" 
      class="px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter text-stone-400 capitalize cursor-pointer"
      :class="{ 'bg-stone-700 text-stone-200' : genreIndex === 'all' }"
    >
      all
    </button>
    <button 
      v-for="(g, index) in filteredGenres" 
      @click.prevent="genreIndex = index" 
      :key="g"
      class="px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter text-stone-400 capitalize cursor-pointer"
      :class="{ 'bg-stone-700 text-stone-200' : genreIndex === index }"
    >
      {{ g }}
    </button>
  </div>
</template>