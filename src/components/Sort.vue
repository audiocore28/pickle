<script setup>
import { ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useScrollToTop } from '../composables/useScrollToTop';
import IconSort from './icons/IconSort.vue';

const gameStore = useGameStore();

const { device } = toRefs(gameStore);
const { sortBy } = storeToRefs(gameStore);
const { scrollToTop } = useScrollToTop();

const sorts = ref(['Recently Added', 'Title (A-Z)', 'Size Asc', 'Size Desc']);
const toggleSort = ref(false);

function selectStore(sort) {
  sortBy.value = sort;
  toggleSort.value = !toggleSort;
  scrollToTop();
}
</script>

<template>
  <div class="relative cursor-pointer text-stone-400 py-2">
    <div @click="toggleSort = !toggleSort" class="flex items-center justify-between space-x-2">
      <a class="menu-hover py-2 text-xs lg:mx-2">
        {{ sortBy }}
      </a>
      <span>
        <IconSort :style="{ color: device.style.color }" />
      </span>
    </div>

    <div v-if="toggleSort" class="absolute right-0 z-50 flex min-w-[120px] flex-col bg-gray-100 py-2 shadow-xl">
      <a 
        v-for="sort in sorts" 
        @click="selectStore(sort)" 
        class="block border-b border-gray-100 py-1 text-xs hover:bg-stone-400 hover:text-stone-200 px-3"
        :class="{
          'bg-stone-500 text-stone-200' : sort === sortBy,
          'text-stone-500' : sort !== sortBy,
        }"
      >
        {{ sort }}
      </a>
    </div>
  </div>
</template>