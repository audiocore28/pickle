<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import Search from './Search.vue';
import SizeRange from './SizeRange.vue';
import IconLogo from './icons/IconLogo.vue';
import IconReset from './icons/IconReset.vue';

const gameStore = useGameStore();

const { device } = toRefs(gameStore);
const { filteredGenres, genreIndex } = storeToRefs(gameStore);

</script>
<template>

    <div class="w-55 xl:w-64 transition duration-300 transform bg-stone-800 shadow-lg font-inter">

      <div class="w-55 xl:w-64 fixed top-0 left-0 bg-stone-800 min-h-400">
        <!-- Logo -->
        <div class="flex items-center justify-between p-4 border-b border-stone-700">
          <div class="flex justify-center items-center mx-auto">
            <IconLogo :style="{ color: device.style.color }" />
            <h2 class="mx-3 text-xl font-semibold text-stone-200 uppercase font-oswald">Fun Cham</h2>
          </div>
  
        </div>
        <!-- / Logo -->

        <div class="p-5">
          <Search />
          <SizeRange />
          <div class="flex justify-between items-center mt-4">
            <h2 class="pl-1 text-stone-300 text-[15px] font-semibold uppercase font-oswald">Genre</h2>
            <span @click.prevent="genreIndex = 'all'" v-show="genreIndex !== 'all'" class="text-stone-300 hover:text-stone-200 text-xs font-medium cursor-pointer">Clear</span>
          </div>
        </div>
      </div>
      
      <ul class="w-55 xl:w-64 px-4 overflow-y-auto fixed z-30 inset-y-0 top-81 bottom-15 left-0">
        <li  
          @click.prevent="genreIndex = g.i" 
          v-for="(g) in filteredGenres" 
          :key="g.i"
          :ref="(el) => { if (genreIndex === g.i) el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }) }"
          :class="{ 'bg-stone-700 text-stone-200' : genreIndex === g.i }"
          class="block py-2 px-4 rounded text-xs text-stone-200 capitalize hover:bg-stone-700 cursor-pointer"
          href="#" 
        >
          {{ g.v }}
        </li>
      </ul>

      <div class="w-55 xl:w-64 fixed bottom-0 left-0 z-100 flex items-center justify-between p-4 bg-stone-800 border-b border-stone-700 font-oswald">

        <button @click="gameStore.clearFilters" type="button" :class="device.style.gradient" class="w-full cursor-pointer inline-flex items-center justify-center py-1 gap-1 font-medium text-stone-200 hover:bg-stone-600 rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
          <span class="flex items-center gap-1">
            <IconReset class="text-white" />
            <span class="ml-1">Reset Filters</span>
          </span>
        </button>

      </div>
    </div>
    <!-- / Sidebar -->

</template>