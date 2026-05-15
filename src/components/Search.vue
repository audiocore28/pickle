<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import IconSearch from './icons/IconSearch.vue';

const store = useGameStore();
const { search, platform } = storeToRefs(store);

const toggleSearch = ref(true);
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="w-full relative">
      <IconSearch class="text-stone-300" />
      <input
        v-model="search" 
        @keydown.stop
        v-if="toggleSearch"
        class="font-oswald search-input w-full pl-10 pr-4 py-2 bg-stone-800/50 lg:bg-stone-700/50 appearance-none rounded-sm text-sm text-stone-300 border-stone-300 hover:border-stone-400 transition-colors leading-tight bg-stone-100 outline-none focus:outline-none:focus focus:ring-stone-500 focus:border-stone-500 focus:shadow-outline" type="search" autocomplete="off" spellcheck="false" aria-live="polite" :placeholder=" `Search ${platform} games...`"
      >
    </div>
  </div>
</template>