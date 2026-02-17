<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const {
  selected,
  total,
  driveCapacity,
  progress,
  freeSpace,
  progressStyle,
  toggleList
} = storeToRefs(store);
</script>

<template>
  <div @click="toggleList = !toggleList" class="relative p-4 m-2 max-w-lg mx-auto">
    <div class="flex rounded-full h-2 bg-gray-200">
      <div 
      :style="progressStyle" class="rounded-full" 
      :class="{ 
        'bg-green-500' : progress < 80,
        'bg-yellow-500' : progress >= 80,
      }"
      >
      </div>
    </div>
    <div class="flex mt-4 items-center justify-between">
      <div>
        <span class="text-xs inline-block py-1 px-2 rounded-full text-green-600 bg-green-200">
          {{ `${selected.length} picks total of ${total}` }} GB
        </span>
      </div>
      <div class="text-right">
        <span class="text-xs inline-block text-neutral-300">
          {{ `${freeSpace} GB free of ${driveCapacity} GB` }}
        </span>
      </div>
    </div>
  </div>
</template>