<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import { useSmartNav } from '@/composables/useSmartNav';
import GameDetail from '@/components/GameDetail.vue';
import GameDetailSkeleton from './GameDetailSkeleton.vue';
import Highlights from '@/components/Highlights.vue';
import GenreNav from '@/components/GenreNav.vue';
import Sort from './Sort.vue';
import IconExpandH from './icons/IconExpandH.vue';
import IconCloseCircle from './icons/IconCloseCircle.vue';

const gameStore = useGameStore();
const selectStore = useSelectStore();

const { device } = toRefs(gameStore);
const { games, filteredGames, platform, search, genre, minSize, maxSize } = storeToRefs(gameStore);
const { selected } = storeToRefs(selectStore);
const { isVisible } = useSmartNav();
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


      <Transition name="slide-yr">
        <div v-show="isVisible" class="sticky lg:static top-22 z-20 bg-stone-900 flex items-center justify-between text-xs text-stone-400 font-inter">
          <div class="flex justify-center items-center gap-2">
            <div @click="gameStore.clearFilters" class="flex justify-center items-center gap-2 cursor-pointer">
              <IconExpandH :style="{ color: device.style.color }" />
              {{ `${minSize} GB - ${maxSize} GB` }}
            </div>
            <span class="text-stone-400 cursor-pointer" @click.prevent="gameStore.clearSizeRange" v-show="minSize !== 0 || maxSize !== 50">
              <IconCloseCircle />
            </span>
          </div>
          <Sort />
        </div>
      </Transition>

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
        <div v-else v-for="n in 32" :key="n" class="rounded overflow-hidden shadow-lg relative">
          <div 
            :class="{
              'h-55 bg-stone-500' : device.unit === 'ps4',
              'h-65 bg-stone-500' : device.unit === 'nsw',
            }"
          >
            <GameDetailSkeleton />
          </div>
        </div>

      </div>

      <GenreNav v-show="genre !== 'all'" />
    </div>
  </section>
</template>

<style>
  .slide-yr-enter-active, .slide-yr-leave-active {
    transition: all 0.5s ease;
  }

  .slide-yr-enter-from, .slide-yr-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }

  .slide-yr-enter-to, .slide-yr-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
</style>