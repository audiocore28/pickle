<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from './stores/game';
import Detail from '@/components/Detail.vue';
import Counter from '@/components/Counter.vue';
import Platform from '@/components/Platform.vue';
import Search from '@/components/Search.vue';
import Sort from '@/components/Sort.vue';
import List from '@/components/List.vue';

const store = useGameStore();
const { games, selected, filteredGames } = storeToRefs(store);
</script>

<template>
  <div>
    <!-- Filters -->
    <div class="bg-white fixed top-0 w-full z-[200] pb-2">
      <div class="flex justify-center items-center rounded-lg relative pb-2 pt-4">

        <Search />
        <Sort />

      </div>

      <Platform />

    </div>
    <!-- / Filters -->

    <!-- Gamelists -->
    <section class="bg-gray-200 mt-28 sm:mt-22">
      <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16">
        <div v-if="games.length" class="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">

          <div 
            v-for="game in filteredGames" :key="game.id" 
            :class="{
              'bg-green-600 text-green-100' : selected.includes(game.id),
              'hover:text-green-600 transition duration-500 ease-in-out' : !selected.includes(game.id)
            }"
            class="rounded overflow-hidden shadow-lg"
          >
            <Detail :game="game" @click.prevent="store.toggleSelect(game)" />
          </div>

        </div>
        <div v-else>
          <div id="loading" style="text-align:center; font-size:18px; color:yellow; display:none;"></div>
          <img src="https://i.imgur.com/llF5iyg.gif" style="width:40px; height:40px;"><br/>
          Loading games... please wait.
        </div>
      </div>
    </section>
    <!-- / Gamelists -->

    <!-- Progress Bar -->
    <div class="fixed bottom-0 sm:p-2 w-full flex justify-center z-[2000]">
      <div class="bg-white bg-opacity-95 text-xs rounded-md fade w-full sm:w-[450px] show">
        <div class="sm:px-4 rounded border border-green-600">

          <Counter />

        </div>
      </div>
    </div>
    <!-- / Progress Bar -->

    <List />

  </div>
</template>