<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();

const { groupedGames, genreIndex } = storeToRefs(gameStore);
</script>

<template>
  <div class="flex gap-1.5 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible pb-1 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
    <button 
      class="px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter text-stone-400 capitalize"
        v-for="(g, index) in groupedGames.genres" 
        @click.prevent="genreIndex = index" 
        :key="g"
        :class="{ 'bg-stone-700 text-stone-200' : genreIndex === index }"
      >
      {{ g }}
    </button>
  </div>
</template>