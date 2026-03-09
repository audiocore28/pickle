<script setup>
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { selected } = storeToRefs(store);

const props = defineProps({
  game: {
    type: Object,
  },
});
</script>

<template>
  <li class="group">
    <div>
      <img 
        :id="game.id" 
        :class="{ 'scale-110' : selected.some(s => s.id === game.id) }"
        class="w-full rounded-md transform transition-transform duration-500 group-hover:scale-110" 
        :src="game.image" alt="game image">

      <!-- overlay -->
      <div 
        :class="{
          'group-hover:bg-transparent transition duration-300 bg-stone-900 opacity-30' : !selected.some(s => s.id === game.id)
        }"
        class="absolute bottom-0 top-0 right-0 left-0"
      >
      </div>
    </div>

    <div 
      :class="{
        'bg-yellow-500 text-stone-600 text-xs h-14 w-14 px-2 transition duration-500 ease-in-out' : selected.some(s => s.id === game.id),
        'bg-stone-600/90 text-stone-200 text-[10px] h-12 w-12 px-4 transition duration-500 ease-in-out' : !selected.some(s => s.id === game.id)
      }"
      class="absolute top-0 right-0 rounded-full flex flex-col items-center justify-center mt-3 mr-3" 
    >
      <span class="font-bold">{{ game.size.toFixed(1) }}</span>
      <small>GB</small>
    </div>

    <div class="absolute bottom-0 w-full">
      <span 
        :class="{
          'bg-yellow-500 text-stone-600 transition duration-500 ease-in-out' : selected.some(s => s.id === game.id),
          'bg-stone-600/90 text-stone-200 transition duration-500 ease-in-out' : !selected.some(s => s.id === game.id),
        }"
        class="text-[10px] uppercase mx-1 py-1 px-2 rounded-lg">
        {{ game.platform }}
      </span>

      <div
        :class="{
          'bg-yellow-500 text-stone-600 transition duration-500 ease-in-out' : selected.some(s => s.id === game.id),
          'bg-stone-600/90 text-stone-200 transition duration-500 ease-in-out' : !selected.some(s => s.id === game.id),
        }"
        class="p-2 mt-2"
      >
        <h2 class="font-semibold text-sm px-1">{{ game.name }}</h2>
        <p class="text-xs">{{ game.note1 }}</p>
      </div>
    </div>
  </li>
</template>