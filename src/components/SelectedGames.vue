<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import { useCaptureElement } from '../composables/useCaptureElement';
import SelectedList from './SelectedList.vue';
import IconList from './icons/IconList.vue';
import IconTrash from './icons/IconTrash.vue';
import IconScreenshot from './icons/IconScreenshot.vue';
import IconMinusCircle from './icons/IconMinusCircle.vue';

const gameStore = useGameStore();
const selectStore = useSelectStore();

const { device } = toRefs(gameStore);
const { groupedSelection } = storeToRefs(selectStore);
const { captureElement } = useCaptureElement();
</script>

<template>
  <SelectedList>
    <template #header>
      <div class="flex">
        <IconList :style="{ color: device.style.color }" style="width: 18px; height: 18px; margin-top: 2px;" />
        <div class="ml-3">
          <h2 class="text-md text-stone-300 uppercase font-semibold">{{ device.unit }} Games Selected List</h2>
          <p class="font-inter text-xs text-stone-400 pt-1">Compatibility is buyer's responsibility</p>
        </div>
      </div>
    </template>

    <template #content>
      <div v-for="(group, groupName) in groupedSelection.list" class="max-w-2xl mt-1 mx-auto px-4 rounded-xl">
        <div class="w-full flex items-center justify-between py-4 text-xs text-stone-300 font-semibold uppercase">
          <h2>{{ groupName }}</h2>
          <span class="text-stone-400">{{ group.length }} Games Selected</span>
        </div>
    
        <TransitionGroup tag="ul" name="slide-x">
          <li v-for="game in group" :key="game.id" class="flex items-center justify-between py-2 border-b border-stone-700">
            <div class="flex items-center">
              <img :src="game.image" alt="game cover" class="w-8 h-8 rounded-full mr-4">
              <span class="text-sm text-gray-200 max-w-[200px] xs:max-w-[260px] truncate">{{ game.name }}</span>
            </div>
            
            <div class="flex items-center">
              <span class="text-xs text-stone-400 mr-3">{{ game.size.toFixed(1) }} GB</span>
              
              <button @click="gameStore.toggleSelect(game)" tabindex="-1" type="button" class="cursor-pointer">
                <IconMinusCircle class="text-red-600 hover:text-red-500" />
              </button>
            </div>
          </li>
        </TransitionGroup>
      </div>
    </template>

    <template #footer>
      <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
        <button @click="captureElement()" type="button" :class="device.style.gradient" class="cursor-pointer inline-flex items-center justify-center py-1 gap-1 font-medium text-stone-200 hover:bg-stone-600 rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
          <span class="flex items-center gap-1">
            <IconScreenshot class="text-stone-300" />
            <span class="ml-1">Screenshot</span>
          </span>
        </button>
        
        <button @click="store.clearAll()" type="button" class="cursor-pointer inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm text-red-500 shadow focus:ring-white border border-red-700 hover:border-red-500 hover:bg-red-700/10 focus:border-red-700 focus:ring-offset-red-700">
          <span class="flex items-center gap-1">
            <IconTrash class="text-red-500" />
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