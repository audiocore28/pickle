<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();
const { groupedGames, genreIndex } = storeToRefs(gameStore);

function showPrev() {
  genreIndex.value = (genreIndex.value - 1 + groupedGames.value.genres.length) % groupedGames.value.genres.length;
}

function showNext() {
  // Update index to the next position, cycling back to 0 at the end
  genreIndex.value = (genreIndex.value + 1) % groupedGames.value.genres.length;
}

const genrePrev = computed(() => groupedGames.value.genres[(genreIndex.value - 1 + groupedGames.value.genres.length) % groupedGames.value.genres.length]); 
const genreNext = computed(() => groupedGames.value.genres[(genreIndex.value + 1) % groupedGames.value.genres.length]); 
</script>

<template>
  <nav class="mt-12 mb-14 flex items-center justify-between pt-12" aria-label="Pagination">
    <div class="flex flex-1 justify-between uppercase font-display font-bold">

      <a @click.prevent="showPrev()" class="relative inline-flex items-center px-4 py-2 text-md font-medium text-stone-200 cursor-pointer" rel="prev">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" class="w-8 h-8" aria-hidden="true" height="1em" width="2em" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg> 
        {{ genrePrev }}
      </a>

      <a @click.prevent="showNext()" class="relative inline-flex items-center px-4 py-2 text-md font-medium text-stone-200 cursor-pointer" rel="next">
        {{ genreNext }}
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" class="w-8 h-8" aria-hidden="true" height="1em" width="2em" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
      </a>

    </div>
  </nav>
</template>