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
const { games, selected, filteredGames, modalProps, isModalOpen, component } = storeToRefs(store);
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

    <Counter />

    <Teleport to="#modal">
      <div v-if="isModalOpen" class="fixed z-[1500] inset-0 overflow-y-auto" @click="store.closeModal">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

          <!-- Overlay -->
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <!-- / Overlay -->
          
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <!-- Modal -->
          <component :is="component" v-bind="modalProps"/>
          <!-- / Modal -->
  
        </div>
      </div>
    </Teleport>

  </div>
</template>