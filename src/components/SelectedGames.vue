<script setup>
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();

const props = defineProps({
  group: {
    type: Object,
  },
});
</script>

<template>
  <TransitionGroup tag="ul" name="slide-x">
    <li v-for="game in group" :key="game.id" class="flex items-center justify-between py-2 border-b border-gray-600">
      <div class="flex items-center">
        <img :src="game.image" alt="game cover" class="w-8 h-8 rounded-full mr-4">
        <span class="text-sm text-gray-200 max-w-[200px] xs:max-w-[260px] truncate">{{ game.name }}</span>
      </div>
      
      <div class="flex items-center">
        <span class="text-xs text-stone-300 mr-3">{{ game.size.toFixed(1) }} GB</span>
        
        <button @click="gameStore.toggleSelect(game)" tabindex="-1" type="button">
          <svg title="Close" tabindex="-1" class="rounded-full bg-red-600 text-white h-4 w-4 cursor-pointer text-gray-400"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </li>
  </TransitionGroup>
</template>

<style>
  .slide-x-enter-active {
    transition: all 0.5s ease-in;
  }

  .slide-x-enter-from {
    /* transform: translateX(-100%); */
    opacity: 0;
  }

  .slide-x-enter-to {
    /* transform: translateX(0); */
    opacity: 1;
  }

  .slide-x-leave-active {
    transition: all 0.5s ease-out;
  }

  .slide-x-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-x-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
</style>