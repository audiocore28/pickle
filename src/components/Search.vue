<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { search, platform } = storeToRefs(store);

const toggleSearch = ref(true);
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-full relative">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d6d3d1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
      <input
        v-model="search" 
        @keydown.stop
        v-if="toggleSearch"
        class="font-oswald search-input w-full pl-10 pr-4 py-2 bg-stone-800/50 lg:bg-stone-700/50 appearance-none rounded-sm text-sm text-stone-300 border-stone-300 hover:border-stone-400 transition-colors leading-tight bg-stone-100 outline-none focus:outline-none:focus focus:ring-stone-500 focus:border-stone-500 focus:shadow-outline" type="search" autocomplete="off" spellcheck="false" aria-live="polite" :placeholder=" `Search ${platform} games...`"
      >
    </div>
  </div>
</template>