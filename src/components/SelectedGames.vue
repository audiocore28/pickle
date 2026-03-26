<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();
const { groupedSelection } = storeToRefs(gameStore);
</script>

<template>
  <div v-for="(group, groupName) in groupedSelection.list" class="max-w-2xl mx-auto px-4 rounded-xl">
    <div class="w-full flex items-center justify-between py-4 text-xs text-stone-300 font-semibold uppercase">
      <h2>{{ groupName }}</h2>
      <span v-for="(count, platform) in groupedSelection.count" v-show="groupName === platform" class="text-stone-400">{{ count }} Games Selected</span>
    </div>

    <TransitionGroup tag="ul" name="slide-x">
      <li v-for="game in group" :key="game.id" class="flex items-center justify-between py-2 border-b border-stone-700">
        <div class="flex items-center">
          <img :src="game.image" alt="game cover" class="w-8 h-8 rounded-full mr-4">
          <span class="text-sm text-gray-200 max-w-[200px] xs:max-w-[260px] truncate">{{ game.name }}</span>
        </div>
        
        <div class="flex items-center">
          <span class="text-xs text-stone-300 mr-3">{{ game.size.toFixed(1) }} GB</span>
          
          <button @click="gameStore.toggleSelect(game)" tabindex="-1" type="button" class="cursor-pointer">
            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#dc2626" stroke-width="1.5"></circle> <path d="M15 12H9" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
          </button>
        </div>
      </li>
    </TransitionGroup>
  </div>
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