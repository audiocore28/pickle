<script setup>
import { defineProps, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import { useProductStore } from '../stores/product';

const gameStore = useGameStore();
const selectStore = useSelectStore();
const productStore = useProductStore();
const { device } = toRefs(gameStore);
const { selected } = storeToRefs(selectStore);

const props = defineProps({
  game: {
    type: Object,
  },
});
</script>

<template>
  <li class="group">
    <div>
      <img 
        :id="game.id" 
        :class="{ 'group-hover:scale-110' : !selected.some(s => s.id === game.id) }"
        class="w-full rounded-md transform transition-transform duration-500" 
        :src="game.image" alt="game image">

      <!-- overlay -->
      <div 
        :class="{
          'transition duration-300 bg-stone-900 opacity-80' : selected.some(s => s.id === game.id)
        }"
        class="absolute bottom-0 top-0 right-0 left-0"
      >
      </div>
    </div>

    <div class="absolute top-2 right-2 w-full">
      <span v-show="selected.some(s => s.id === game.id)"
        :class="{
          'text-xs font-semibold uppercase mx-1 py-1 px-2 pl-3 rounded-r-lg bg-stone-600/90 text-stone-200 transition duration-500 ease-in-out' : selected.some(s => s.id === game.id),
        }">
        selected
      </span>
    </div>

    <div class="absolute bottom-0 w-full">
      <div class="flex item-center">
        <span class="text-[10px] uppercase ml-1 py-1 px-2 rounded-lg bg-stone-600/90 text-stone-200 transition duration-500 ease-in-out">
          {{ game.platform }}
        </span>
        <span class="absolute right-0 text-[10px] uppercase mx-1 py-1 px-2 rounded-lg bg-stone-600/90 text-stone-200 transition duration-500 ease-in-out">
          {{ productStore.formatSize(game.size.toFixed(1)) }}
        </span>
      </div>

      <div
        :class="{
          'bg-yellow-500/90 text-stone-600' : !selected.some(s => s.id === game.id) && device.unit === 'pc',
          'bg-violet-900/90 text-stone-200' : !selected.some(s => s.id === game.id) && device.unit === 'ps4',
          'bg-rose-700/90 text-stone-200' : !selected.some(s => s.id === game.id) && device.unit === 'nsw',
          'bg-stone-600/90 text-stone-200 transition duration-500 ease-in-out' : selected.some(s => s.id === game.id),
        }"
        class="p-2 mt-2"
      >
        <h2 class="font-semibold text-sm px-1">{{ game.name }}</h2>
        <p class="text-xs">{{ game.note1 }}</p>
      </div>
    </div>
  </li>
</template>