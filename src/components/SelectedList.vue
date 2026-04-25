<script setup>
import { storeToRefs } from 'pinia';
import { useSelectStore } from '../stores/select';

const selectStore = useSelectStore();
const { percentageWidth, percentageColor } = storeToRefs(selectStore);
</script>

<template>
  <div class="relative w-full cursor-pointer pointer-events-none transition my-auto mb-1 font-oswald">
    <div class="w-full cursor-default pointer-events-auto dark:bg-gray-800 relative mx-auto max-w-md">
    
      <!-- Header -->
      <div class="bg-stone-800 pl-4 pb-4 pt-5 rounded-t-xl">
        <slot name="header"></slot>
      </div>
      <div aria-hidden="true" class="border-b dark:border-gray-700 px-2"></div>
      <div class="flex h-1.5 bg-stone-400 shadow-inner">
        <div :style="{ backgroundColor: percentageColor, width: percentageWidth, transition: `width 0.5s ease, background-color 0.5s ease` }"></div>
      </div>
      <!-- / Header -->
      
      <!-- Content -->
      <div class="bg-stone-800 mx-auto max-w-md h-[420px] xl:h-[620px] overflow-y-scroll">
        <slot name="content"></slot>
      </div>
      <!-- / Content -->
    
      <!-- Footer -->
      <div class="bg-stone-800 space-y-2">
        <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>
        <div class="px-6">
          <slot name="footer"></slot>
        </div>
      </div>
      <!-- Footer -->

    </div>
  </div>
</template>