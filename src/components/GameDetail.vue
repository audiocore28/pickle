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
  <div>
    <div class="relative">
      <a href="#">
        <img :id="game.id" class="w-full" :src="game.image" alt="game image">
        <div 
          :class="{
            'hover:bg-transparent transition duration-300 bg-gray-900 opacity-30' : !selected.includes(game.id)
          }"
          class="absolute bottom-0 top-0 right-0 left-0"
        ></div>
      </a>
      <a href="#!">
        <div class="absolute bottom-0 left-0 bg-black/60 backdrop-blur-lg px-4 py-2 text-white text-[10px] uppercase">{{ game.platform }}</div>
      </a>
      <a href="!#">
        <div 
          :class="{
            'bg-stone-500 text-stone-200 text-xs h-14 w-14 px-2 transition duration-500 ease-in-out' : selected.includes(game.id),
            'bg-black/60 backdrop-blur-lg text-white text-[10px] h-12 w-12 px-4 transition duration-500 ease-in-out' : !selected.includes(game.id)
          }"
          class="absolute top-0 right-0 rounded-full flex flex-col items-center justify-center mt-3 mr-3" 
        >
          <span class="font-bold">{{ game.size.toFixed(1) }}</span>
          <small>GB</small>
        </div>
      </a>
    </div>
  
    <div class="px-3 py-3">
      <a href="#" class="text-stone-200 font-semibold text-sm inline-block">{{ game.name }}</a>
      <p class="text-stone-500 text-xs">{{ game.note1 }}</p>
    </div>
  </div>
</template>