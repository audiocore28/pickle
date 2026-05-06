<script setup>
  import { toRefs } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useGameStore } from '../stores/game';

  const gameStore = useGameStore();

  const { device } = toRefs(gameStore);
  const { minSize, maxSize, rangeTrackStyles, minSizeRef } = storeToRefs(gameStore);

</script>

<template>
  <div class="w-full py-6 rounded-lg">
    <div class="flex justify-between items-center mt-5 mb-4">
      <h2 class="text-stone-300 text-[15px] font-semibold font-oswald uppercase">Size Range</h2>
      <span @click.prevent="gameStore.clearSizeRange" v-show="minSize !== 0 || maxSize !== 50" class="text-stone-300 hover:text-stone-200 text-xs font-medium cursor-pointer">Clear</span>
    </div>
    
    <div class="mt-4 slider-container">
      <!-- Custom Range Inputs -->
      <input @input="gameStore.updateRange($event)" ref="minSizeRef" type="range" min="0" max="50" v-model.number="minSize">
      <input @input="gameStore.updateRange($event)" type="range" min="0" max="50" v-model.number="maxSize">
      
      <!-- Custom Track -->
      <div class="w-full h-2 bg-gray-200 rounded-md">
          <div :style="rangeTrackStyles" :class="device.style.background" class="absolute h-2 rounded-md"></div>
      </div>
    </div>
    
    <div class="flex justify-between mt-3 text-xs text-stone-300">
      <span>Min: {{ minSize }} GB</span>
      <span>Max: {{ maxSize }} GB</span>
    </div>
  </div>
</template>

<style scoped>
  /* Hide default range styling */
  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    position: absolute;
    background: transparent;
    pointer-events: none;
    z-index: 2;
  }

  /* Custom track (hidden default) */
  input[type="range"]::-webkit-slider-runnable-track {
    height: 2px;
  }

  /* Custom thumb styling (Centered) */
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: white;
    border: 3px solid #23a9f7;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    position: relative;
    z-index: 3;
    transform: translateY(-30%);
  }

  input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: white;
    border: 3px solid #23a9f7;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: auto;
    z-index: 3;
    transform: translateY(-30%);
  }

  /* Centering the range input itself */
  .slider-container {
    position: relative;
    height: 18px; /* Adjust height to fit thumb */
  }
</style>