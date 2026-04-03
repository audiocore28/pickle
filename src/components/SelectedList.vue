<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useModalStore } from '../stores/modal';

const gameStore = useGameStore();
const modalStore = useModalStore();

const { percentageWidth, percentageColor } = storeToRefs(gameStore);
const { toggleMenu, contentHeight } = storeToRefs(modalStore);
</script>

<template>
  <div class="relative w-full cursor-pointer pointer-events-none transition my-auto mb-1">
    <div class="w-full cursor-default pointer-events-auto dark:bg-gray-800 relative mx-auto max-w-md">
    
      <!-- Header -->
      <div 
        class="bg-stone-800 pl-4 pb-4 pt-5 rounded-t-xl"
        @touchstart.prevent="modalStore.dragStart($event)"
        @touchmove.prevent="modalStore.dragging($event)"
      >
        <div class="flex justify-center pb-6 shrink-0 -mt-2 xl:hidden">
          <div class="w-10 h-1 rounded-full bg-stone-500"></div>
        </div>

        <slot name="header"></slot>
      </div>
      <div aria-hidden="true" class="border-b dark:border-gray-700 px-2"></div>
      <div v-show="toggleMenu" class="flex h-1.5 bg-stone-400 shadow-inner">
        <div :style="{ backgroundColor: percentageColor, width: percentageWidth, transition: `width 0.5s ease, background-color 0.5s ease` }"></div>
      </div>
      <!-- / Header -->
      
      <!-- Content -->
      <div :style="{ height: contentHeight }" class="bg-stone-800 mx-auto max-w-md overflow-y-scroll">
        <slot name="content"></slot>
      </div>
      <!-- / Content -->
    
      <!-- Footer -->
      <div class="bg-stone-800 space-y-2 pb-2 h-18">
        <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>
        <div class="px-6 py-2">
          <slot name="footer"></slot>
        </div>
      </div>
      <!-- Footer -->

    </div>
  </div>
</template>