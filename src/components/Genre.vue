<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();

const { device } = toRefs(gameStore);
const { filteredGenres, genreIndex } = storeToRefs(gameStore);
</script>

<template>
  <div class="flex gap-1.5 overflow-x-auto scrollbar-hide lg:flex-wrap lg:overflow-visible pt-3 -mx-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
    <button 
      :ref="(all) => { if (genreIndex === 'all') all?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      @click="genreIndex = 'all'" 
      class="px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter capitalize cursor-pointer"
      :class="{
        'bg-teal-700 text-stone-100' : genreIndex === 'all' && device.unit === 'pc',
        'bg-fuchsia-900 text-stone-100' : genreIndex === 'all' && device.unit === 'ps4',
        'bg-yellow-500 text-stone-100' : genreIndex === 'all' && device.unit === 'nsw',
        'bg-stone-800/50 text-stone-400' : genreIndex !== 'all',
      }"
    >
      all
    </button>
    <button 
      v-for="(g) in filteredGenres" 
      @click.prevent="genreIndex = g.i" 
      :key="g.i"
      :ref="(el) => { if (genreIndex === g.i) el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
      class="px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap flex-shrink-0 font-inter capitalize cursor-pointer"
      :class="{
        'bg-teal-700 text-stone-100' : genreIndex === g.i && device.unit === 'pc',
        'bg-fuchsia-900 text-stone-100' : genreIndex === g.i && device.unit === 'ps4',
        'bg-yellow-500 text-stone-100' : genreIndex === g.i && device.unit === 'nsw',
        'bg-stone-800/30 text-stone-400' : genreIndex !== g.i,
      }"
    >
      {{ g.v }}
    </button>
  </div>
</template>