<script setup>
import { ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();
const { deviceColor } = storeToRefs(gameStore);
const { device } = toRefs(gameStore);

const devices = ref(['pc', 'ps4', 'nsw']);
const toggleDevice = ref(false);
</script>

<template>
  <div class="relative cursor-pointer uppercase text-stone-600 py-2">
    <div class="flex justify-center items-center">
      <span class="px-2 font-semibold text-sm hidden lg:block">DEVICE:</span>
      <button @click="toggleDevice = !toggleDevice" class="cursor-pointer flex items-center justify-between space-x-2 px-2 rounded-lg" :class="deviceColor">
        <a class="menu-hover py-2 text-xs uppercase font-semibold lg:mx-2">
          {{ device.unit }}
        </a>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="h-4 w-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
    </div>

    <div v-if="toggleDevice" class="absolute z-50 flex w-full flex-col bg-stone-100 py-2 shadow-xl">
      <a 
        v-for="dv in devices" 
        @click="gameStore.setupDevice(dv); toggleDevice = !toggleDevice" 
        class="block border-b border-gray-100 py-1 text-xs hover:bg-stone-400 hover:text-stone-200 px-3"
        :class="{
          'bg-stone-500 text-stone-200' : device.unit === dv,
          'text-stone-500' : device.unit !== dv,
        }"
      >
        {{ dv }}
      </a>
    </div>
  </div>
</template>