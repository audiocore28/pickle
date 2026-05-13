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
              <svg :fill="device.style.color" height="16px" width="16px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 251.247 251.247" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M248.611,119.259l-51.005-51.005c-3.516-3.515-9.213-3.515-12.729,0c-3.515,3.515-3.515,9.213,0,12.728l35.642,35.641 H30.728l35.642-35.641c3.515-3.515,3.515-9.213,0-12.728c-3.516-3.515-9.213-3.515-12.729,0L2.636,119.259 c-3.515,3.515-3.515,9.213,0,12.728l51.005,51.005c1.758,1.757,4.061,2.636,6.364,2.636s4.606-0.879,6.364-2.636 c3.515-3.515,3.515-9.213,0-12.728l-35.642-35.641h189.791l-35.642,35.641c-3.515,3.515-3.515,9.213,0,12.728 c1.758,1.757,4.061,2.636,6.364,2.636s4.606-0.879,6.364-2.636l51.005-51.005C252.125,128.472,252.125,122.774,248.611,119.259z"></path> </g></svg>
              {{ `${minSize} GB - ${maxSize} GB` }}
            </div>
            <span @click.prevent="gameStore.clearSizeRange" v-show="minSize !== 0 || maxSize !== 50">
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" fill="#a8a29e"></path> </g></svg>
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