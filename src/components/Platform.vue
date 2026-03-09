<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { platform, device } = storeToRefs(store);

const platforms = ref([
  {
    name: 'win',
    desc: 'Windows Games',
  },
  {
    name: 'ps3',
    desc: 'PS3 Games',
  },
  {
    name: 'ps2',
    desc: 'PS2 Games',
  },
  {
    name: 'low specs',
    desc: 'Low Specs',
  },
  {
    name: '2 players',
    desc: '2 Players',
  },
]);

function scrollLeft() {
  const scrollContainer = document.getElementById('scrollContainer');

  scrollContainer.scrollBy({
    left: -150,
    behavior: 'smooth'
  });
}

function scrollRight() {
  const scrollContainer = document.getElementById('scrollContainer');

  scrollContainer.scrollBy({
    left: 150,
    behavior: 'smooth'
  });
}
</script>

<template>
  <div v-if="device === 'pc'" class="flex items-center justify-center xl:justify-end space-x-2 p-4 xl:p-0 text-xs uppercase whitespace-nowrap scroll-smooth">
    <button @click="scrollLeft()" id="scrollLeft" class="p-2 mr-2 bg-neutral-300 text-white rounded-full shadow-lg hover:bg-stone-500 focus:outline-none md:hidden">
      <!-- Heroicon: Chevron Left -->
      <svg xmlns="https://www.w3.org" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>  
    
    <div id="scrollContainer" class="flex overflow-x-scroll items-center lg:justify-center lg:overflow-x-hidden space-x-4 w-full max-w-4xl bg-gray-100 rounded-lg shadow-inner">
      <button v-for="pf in platforms" @click.prevent="platform = pf.name" 
      :class="{
        'bg-stone-300 text-stone-600' : platform !== pf.name,
        'bg-stone-500 text-stone-200' : platform == pf.name,
      }"
      class="uppercase flex-shrink-0 p-2 rounded-full cursor-pointer hover:bg-stone-400 hover:text-stone-100"
      >
        {{ pf.desc }}
      </button>
    </div>

    <button @click="scrollRight()" id="scrollRight" class="p-2 ml-1 bg-neutral-300 text-white rounded-full shadow-lg hover:bg-stone-500 focus:outline-none md:hidden">
      <!-- Heroicon: Chevron Right -->
      <svg xmlns="https://www.w3.org" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>  
  </div>
</template>