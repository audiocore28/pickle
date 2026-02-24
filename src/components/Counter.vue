<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import List from '@/components/List.vue';

const store = useGameStore();
const {
  selected,
  total,
  driveCapacity,
  freeSpace,
  progressStyle,
  toggleList
} = storeToRefs(store);
</script>

<template>
  <div class="mx-auto inset-x-0 fixed bottom-0 z-[800] w-full sm:w-[450px]">

    <List />
    <div class="sm:px-2 sm:mb-2 bg-white bg-opacity-95 text-xs rounded-xl border border-green-600 shadow-lg">
      <div @click="toggleList = !toggleList" class="relative p-4 m-2 max-w-lg mx-auto">
        <div class="flex rounded-full h-2 bg-gray-200">
          <div :style="progressStyle" class="rounded-full"></div>
        </div>
        <div class="flex mt-4 items-center justify-between">
          <div>
            <span class="text-xs inline-block text-neutral-400">
              {{ `${freeSpace.toFixed(1)} GB free of ${driveCapacity.toFixed(0)} GB` }}
            </span>
          </div>
          <div class="text-right">
            <span class="text-xs inline-block py-1 px-2 rounded-full text-green-600 bg-green-200">
              {{ `${selected.length} picks total of ${total.toFixed(1)}` }} GB
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>