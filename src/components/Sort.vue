<script setup>
import { ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();

const { device } = toRefs(gameStore);
const { sortBy } = storeToRefs(gameStore);

const sorts = ref(['Recently Added', 'Title (A-Z)', 'Size Asc', 'Size Desc']);
const toggleSort = ref(false);
</script>

<template>
  <div class="relative cursor-pointer text-stone-400 py-2">
    <div @click="toggleSort = !toggleSort" class="flex items-center justify-between space-x-2">
      <a class="menu-hover py-2 text-xs lg:mx-2">
        {{ sortBy }}
      </a>
      <span>
        <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 7a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H3z" :fill="device.style.color"></path></g></svg>
      </span>
    </div>

    <div v-if="toggleSort" class="absolute right-0 z-50 flex min-w-[120px] flex-col bg-gray-100 py-2 shadow-xl">
      <a 
        v-for="sort in sorts" 
        @click="sortBy = sort; toggleSort = !toggleSort" 
        class="block border-b border-gray-100 py-1 text-xs hover:bg-stone-400 hover:text-stone-200 px-3"
        :class="{
          'bg-stone-500 text-stone-200' : sort === sortBy,
          'text-stone-500' : sort !== sortBy,
        }"
      >
        {{ sort }}
      </a>
    </div>
  </div>
</template>