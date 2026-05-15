<script setup>
  import { toRefs } from 'vue';
  import { useGameStore } from '@/stores/game';
  import { useScrollToTop } from '@/composables/useScrollToTop';
  import IconUpArrow from './icons/IconUpArrow.vue';

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
    <IconUpArrow class="w-5 h-5" />
  </button>
</template>