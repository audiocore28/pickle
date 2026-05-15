<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import IconCaretLeft from './icons/IconCaretLeft.vue';
import IconCaretRight from './icons/IconCaretRight.vue';

const gameStore = useGameStore();
const { filteredGenres, genreIndex } = storeToRefs(gameStore);

const prevGenre = computed(() => {
  let lowerIndex = [];
  let prevIndex = null;

  lowerIndex = filteredGenres.value.filter(g => g.i < genreIndex.value);

  if (lowerIndex.length > 0) { 
    prevIndex = lowerIndex.reduce((accumulator, current) => {
      return (current.i > accumulator.i) ? current : accumulator;
    }, lowerIndex[0]); 
  } 

  // Cycle back to the last index if at the beginning
  return prevIndex ? prevIndex : filteredGenres.value.at(-1);
});

const nextGenre = computed(() => {
  let higherIndex = [];
  let nextIndex = null;

  higherIndex = filteredGenres.value.filter(g => g.i > genreIndex.value);

  if (higherIndex.length > 0) { 
    nextIndex = higherIndex.reduce((accumulator, current) => {
      return (current.i < accumulator.i) ? current : accumulator;
    }, higherIndex[0]); 
  } 

  // Update index to the next position, cycling back to 0 at the end
  return nextIndex ? nextIndex : filteredGenres.value[0];
});

function showPrev() {
  genreIndex.value = prevGenre.value.i;
}

function showNext() {
  genreIndex.value = nextGenre.value.i; 
}

</script>

<template>
  <nav class="mt-12 mb-14 flex items-center justify-between pt-12" aria-label="Pagination">
    <div class="flex flex-1 justify-between uppercase font-display font-bold">

      <a @click.prevent="showPrev()" class="relative inline-flex items-center px-4 py-2 text-md font-medium text-stone-200 cursor-pointer" rel="prev">
        <IconCaretLeft class="mr-1" />
        {{ genreIndex === 'all' ? '' : prevGenre.v }}
      </a>

      <a @click.prevent="showNext()" class="relative inline-flex items-center px-4 py-2 text-md font-medium text-stone-200 cursor-pointer" rel="next">
        {{ genreIndex === 'all' ? '' : nextGenre.v }}
        <IconCaretRight class="ml-1"/>
      </a>

    </div>
  </nav>
</template>