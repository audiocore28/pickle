<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useModalStore } from '../stores/modal';

const gameStore = useGameStore();
const modalStore = useModalStore();

const { percentageWidth, percentageColor } = storeToRefs(gameStore);
const { toggleMenu } = storeToRefs(modalStore);
</script>

<template>
  <div class="relative w-full cursor-pointer pointer-events-none transition my-auto mb-1">
    <div class="w-full cursor-default pointer-events-auto dark:bg-gray-800 relative mx-auto max-w-md">
      
      <!-- Header -->
      <div class="bg-stone-800 pl-4 pb-4 pt-5 rounded-t-xl">
        <slot name="header"></slot>
      </div>
      <div aria-hidden="true" class="border-b dark:border-gray-700 px-2"></div>
      <div v-show="toggleMenu" class="flex h-1.5 bg-stone-400 shadow-inner">
        <div :style="{ backgroundColor: percentageColor, width: percentageWidth, transition: `width 0.5s ease, background-color 0.5s ease` }"></div>
      </div>
      <!-- / Header -->
      
      <!-- Content -->
      <div class="bg-stone-800 mx-auto max-w-md h-[470px] lg:h-[620px] overflow-y-scroll">
        <slot name="content"></slot>
        <div class="h-3"></div>
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