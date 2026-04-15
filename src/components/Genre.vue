<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();

const { groupedGames, genre } = storeToRefs(gameStore);
</script>

<template>
  <div class="flex gap-1.5 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible pb-1 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
    <button 
      class="px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter text-stone-400"
        v-for="g in groupedGames.genres" 
        @click.prevent="genre = g" 
        :key="g"
        :class="{ 'bg-stone-700 text-stone-200' : genre == g, }"
      >
      {{ g }}
    </button>
  </div>
</template>