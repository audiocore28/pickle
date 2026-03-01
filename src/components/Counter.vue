<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import SelectedList from '@/components/SelectedList.vue';

const store = useGameStore();
const {
  selected,
  total,
  driveCapacity,
  freeSpace,
  percentageWidth,
  percentageColor,
} = storeToRefs(store);

const toggleList = ref(false);
</script>

<template>
  <div class="mx-auto inset-x-0 fixed bottom-0 z-[800] w-full sm:w-[450px]">

    <Transition name="slide-y">
      <SelectedList v-show="toggleList" />
    </Transition>

    <div class="sm:px-2 sm:mb-2 bg-white bg-opacity-95 text-xs rounded-xl border shadow-lg" :style="{ borderColor: percentageColor }">
      <div @click="toggleList = !toggleList" class="relative p-4 m-2 max-w-lg mx-auto">
        <div class="flex rounded-full h-2 bg-gray-200">
          <div :style="{ backgroundColor: percentageColor, width: percentageWidth, transition: `width 0.5s ease` }" class="rounded-full"></div>
        </div>

        <div class="flex mt-4 items-center justify-between">
          <div>
            <span class="text-xs inline-block" :style="{ color: percentageColor }">
              {{ `${freeSpace.toFixed(1)} GB free space` }}
            </span>
          </div>
          <div id="gameCount" class="text-right">
            <span class="text-xs inline-block py-1 px-2 rounded-full text-white" :style="{ backgroundColor: percentageColor }">
              {{ `${selected.length} picks total of ${total.toFixed(1)}` }} GB
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
  .slide-y-enter-active, .slide-y-leave-active {
    transition: all 0.5s ease;
  }

  .slide-y-enter-from, .slide-y-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  .slide-y-enter-to, .slide-y-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
</style>