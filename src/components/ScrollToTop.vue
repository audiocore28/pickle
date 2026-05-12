<script setup>
  import { toRefs } from 'vue';
  import { useGameStore } from '@/stores/game';
  import { useScrollToTop } from '@/composables/useScrollToTop';

  const gameStore = useGameStore();

  const { device } = toRefs(gameStore);
  const { isVisible, scrollToTop } = useScrollToTop();

</script>

<template>
  <button 
    v-show="isVisible"
    @click="scrollToTop()"
    :class="device.style.background"
    class="fixed bottom-44 sm:bottom-36 right-4 sm:right-8 z-50 w-10 h-10 rounded-full text-stone-200 shadow-lg flex items-center justify-center cursor-pointer"
    aria-label="Scroll to top"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up w-5 h-5">
      <path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path>
    </svg>
  </button>
</template>