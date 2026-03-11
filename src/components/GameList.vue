<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import GameDetail from '@/components/GameDetail.vue';
import GameDetailSkeleton from './GameDetailSkeleton.vue';

const store = useGameStore();
const { games, selected, filteredGames } = storeToRefs(store);
</script>

<template>
  <section class="bg-stone-800 mt-35 sm:mt-30 md:mt-24 xl:mt-10">
    <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16">
      <div class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
  
        <div v-if="games.length" v-for="game in filteredGames" :key="game.id" class="relative cursor-pointer rounded overflow-hidden shadow-lg"
          @click.prevent="store.toggleSelect(game)" 
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
    </div>
  </section>
</template>