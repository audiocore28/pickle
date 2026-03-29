<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import SelectedList from './SelectedList.vue';

const gameStore = useGameStore();
const { groupedSelection } = storeToRefs(gameStore);

const { device } = toRefs(gameStore);
</script>

<template>
  <SelectedList>
    <template #header>
      <div class="flex">
        <svg class="mt-1" :fill="device.style.color" width="18px" height="18px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3.59 3.03h12.2v1.26H3.59zm0 4.29h12.2v1.26H3.59zm0 4.35h12.2v1.26H3.59zM.99 4.79h.49V2.52H.6v.45h.39v1.82zm.87 3.88H.91l.14-.11.3-.24c.35-.28.49-.5.49-.79A.74.74 0 0 0 1 6.8a.77.77 0 0 0-.81.84h.52A.34.34 0 0 1 1 7.25a.31.31 0 0 1 .31.31.6.6 0 0 1-.22.44l-.87.75v.39h1.64zm-.36 3.56a.52.52 0 0 0 .28-.48.67.67 0 0 0-.78-.62.71.71 0 0 0-.77.75h.5a.3.3 0 0 1 .27-.32.26.26 0 1 1 0 .51H.91v.38H1c.23 0 .37.11.37.29a.29.29 0 0 1-.33.29.35.35 0 0 1-.36-.35H.21a.76.76 0 0 0 .83.8.74.74 0 0 0 .83-.72.53.53 0 0 0-.37-.53z"></path></g></svg>
        <div class="ml-3">
          <h2 class="text-md text-stone-300 uppercase font-semibold">{{ device.unit }} Games Selected List</h2>
          <p class="text-sm text-stone-400 pt-1">Games compatibility is buyers responsibility</p>
        </div>
      </div>
    </template>

    <template #content>
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

    <template #footer>
      <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        <button @click="store.captureElement" type="button" class="cursor-pointer inline-flex items-center justify-center py-1 gap-1 font-medium text-stone-200 bg-stone-700 hover:bg-stone-600 rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
          <span class="flex items-center gap-1">
            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <span class="ml-1">Screenshot</span>
          </span>
        </button>
        
        <button @click="store.clearAll()" type="button" class="cursor-pointer inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm text-red-500 shadow focus:ring-white border border-red-700 hover:border-red-500 hover:bg-red-700/10 focus:border-red-700 focus:ring-offset-red-700">
          <span class="flex items-center gap-1">
            <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            <span class="ml-1">Clear All</span>
          </span>
        </button>
      </div>
    </template>
  </SelectedList>

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