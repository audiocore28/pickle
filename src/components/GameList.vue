<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import GameDetail from '@/components/GameDetail.vue';
import GameDetailSkeleton from './GameDetailSkeleton.vue';
import Highlights from '@/components/Highlights.vue';
import GenreNav from '@/components/GenreNav.vue';

const gameStore = useGameStore();
const selectStore = useSelectStore();
const { games, filteredGames, genre } = storeToRefs(gameStore);
const { selected } = storeToRefs(selectStore);
</script>

<template>
  <section class="bg-stone-900">
    <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16 2xl:p-28">

      <Highlights v-show="genre === 'all'" />

      <h3 v-show="genre !== 'all'" class="font-display text-3xl font-bold text-stone-300 uppercase mb-1 flex items-center gap-2">{{ genre }}</h3>;

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