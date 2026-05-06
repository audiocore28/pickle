<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import GameDetail from '@/components/GameDetail.vue';
import GameDetailSkeleton from './GameDetailSkeleton.vue';
import Highlights from '@/components/Highlights.vue';
import GenreNav from '@/components/GenreNav.vue';
import Sort from './Sort.vue';

const gameStore = useGameStore();
const selectStore = useSelectStore();
const { games, filteredGames, platform, search, genre } = storeToRefs(gameStore);
const { selected } = storeToRefs(selectStore);
</script>

<template>
  <section class="bg-stone-900">
    <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 2xl:p-28">

      <Highlights v-show="genre === 'all'" />


      <div class="mb-8 mt-4 text-stone-300">
        <h2 class="font-display text-3xl font-bold text-stone-300 mb-3 uppercase">{{ genre === 'all' ? 'All Games' : genre }}</h2>
        <p v-show="search.length === 0" class="text-stone-400 text-xs md:text-sm uppercase">{{ `${filteredGames.length} ${platform} games` }}</p>
        <p v-show="search.length > 0" class="text-stone-400 text-xs md:text-sm uppercase">{{ `Found ${platform} Games: ${filteredGames.length}` }}</p>
      </div>


      <div class="sticky lg:static top-22 z-20 bg-stone-900 flex items-center justify-between text-xs text-stone-400 font-inter">
        <div @click="gameStore.clearFilters" class="flex justify-center items-center gap-2 cursor-pointer">
          <svg fill="#a8a29e" width="12px" height="12px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fill-rule="evenodd"></path> </g></svg>
          Reset Filters
        </div>
        <Sort />
      </div>

      <div class="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
  
        <div v-if="games.length" v-for="game in filteredGames" :key="game.id" class="relative cursor-pointer rounded overflow-hidden shadow-lg"
          @click.prevent="selectStore.toggleSelect(game)" 
          :class="{
            'bg-stone-500 text-stone-200' : selected.includes(game.id),
            'hover:text-stone-500 transition duration-500 ease-in-out' : !selected.includes(game.id)
          }"
        >
          <GameDetail :game="game" />
        </div>
        <div v-else v-for="n in 32" :key="n" class="rounded overflow-hidden shadow-lg">
          <GameDetailSkeleton />
        </div>

      </div>

      <GenreNav v-show="genre !== 'all'" />
    </div>
  </section>
</template>