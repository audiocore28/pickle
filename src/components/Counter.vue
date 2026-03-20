<script setup>
import { ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useProductStore } from '../stores/product';
import SelectedList from '@/components/SelectedList.vue';

const gameStore = useGameStore();
const productStore = useProductStore();

const {
  groupedSelection,
  freeSpace,
  percentageWidth,
  percentageColor,
  deviceColor,
  targetElementRef
} = storeToRefs(gameStore);

const { device } = toRefs(gameStore);

const toggleList = ref(false);
</script>

<template>
  <div class="mx-auto inset-x-0 fixed bottom-0 z-[800] w-full sm:w-[450px] cursor-pointer">

    <Transition name="slide-y">
      <SelectedList v-show="toggleList" />
    </Transition>

    <div :class="deviceColor" class="sm:px-2 sm:mb-2 bg-opacity-95 text-xs rounded-t-xl sm:rounded-xl border shadow-lg" :style="{ borderColor: percentageColor }">
      <div @click="toggleList = !toggleList" class="relative py-3 px-4 m-2 max-w-lg mx-auto">
        <div class="flex rounded-full h-2 bg-stone-500 shadow-inner border border-stone-300">
          <div :style="{ backgroundColor: percentageColor, width: percentageWidth, transition: `width 0.5s ease, background-color 0.5s ease` }" class="rounded-full"></div>
        </div>

        <div class="flex mt-4 items-center justify-between">
          <div>
            <h5 class="inline inline-block font-bold uppercase text-xs">Free:</h5>
            <span class="text-stone-600 font-semibold text-xs inline-block py-1 px-2 mx-2 rounded-full text-white" :style="{ backgroundColor: percentageColor }">
              {{ productStore.formatSize(freeSpace.toFixed(1)) }}
            </span>
          </div>
          <div>
            <h5 class="inline inline-block font-bold uppercase text-xs">Used:</h5>
            <span ref="targetElementRef" class="text-stone-600 font-semibold text-xs inline-block py-1 px-2 mx-2 rounded-full text-white" :style="{ backgroundColor: percentageColor }">
              {{ productStore.formatSize(groupedSelection.size.toFixed(1)) }}
            </span>
          </div>
          <div>
            <h5 class="inline inline-block font-bold uppercase text-xs">Limit:</h5>
            <span class="text-stone-600 font-semibold text-xs inline-block py-1 px-2 mx-2 rounded-full text-white" :style="{ backgroundColor: percentageColor }">
              {{ productStore.formatSize(device.assignedStorage.limit) }}
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