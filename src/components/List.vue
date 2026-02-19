<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import Sort from '@/components/Sort.vue';
import Screenshot from './Screenshot.vue';

const store = useGameStore();
const { toggleList, groupedSelection } = storeToRefs(store);

const activeTab = ref('all'); 
</script>

<template>
  <div v-if="toggleList" class="fixed inset-0 z-400 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">

    <Screenshot />
    <!-- overlay -->
    <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"></div>
    
    <!-- Modal -->
    <div class="relative w-full cursor-pointer pointer-events-none transition my-auto p-4 mt-35">
      <div class="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-md">
      
        
        <!-- Header -->
        <div class="px-4 flex items-center justify-between">
          <h2 class="text-sm uppercase font-semibold">Drive capacity:</h2>
          <Sort />
        </div>
        <div aria-hidden="true" class="border-b dark:border-gray-700 px-2"></div>
        <!-- / Header -->

        <!-- Tab navigation links -->
        <div class="text-xs uppercase text-center border-b border-gray-200 hidden xs:block">
          <ul class="flex flex-wrap -mb-px">
            <li class="mr-2">
              <a 
                href="#" 
                @click.prevent="activeTab = 'all'"
                :class="{ 'border-b-2 border-green-600 text-green-600 font-semibold active': activeTab === 'all' }"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >
                all
              </a>
            </li>
            <li v-for="(group, groupName) in groupedSelection" class="mr-2">
              <a 
                href="#" 
                @click.prevent="activeTab = groupName"
                :class="{ 'border-b-2 border-green-600 text-green-600 font-semibold active': activeTab === groupName }"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >
                {{ groupName }}
              </a>
            </li>
          </ul>
        </div>
        <!-- / Tab navigation links -->
        
        <!-- Tab content -->
        <div class="bg-white rounded-md px-4 mx-auto max-w-md max-h-[470px] overflow-x-scroll">
          <div v-for="(group, groupName) in groupedSelection" class="mt-5">
            <h2 v-show="activeTab === 'all'" class="text-xs font-semibold uppercase mb-3">{{ groupName }}</h2>

            <ul>
              <li v-show="activeTab === game.platform || activeTab === 'all'" v-for="game in group" class="flex items-center justify-between py-2 border-b border-gray-300">
                <div class="flex items-center">
                  <!-- <span class="text-lg font-semibold mr-4">1</span> -->
                  <img :src="game.image" alt="game cover" class="w-8 h-8 rounded-full mr-4 hidden xs:block">
                  <span class="text-xs text-gray-800 max-w-[200px] xs:max-w-[260px] truncate">{{ game.name }}</span>
                </div>

                <div class="flex items-center">
                  <span class="text-xs text-green-500 mr-3">{{ game.size }} GB</span>

                  <button @click="store.toggleSelect(game)" tabindex="-1" type="button">
                    <svg title="Close" tabindex="-1" class="bg-red-600 text-white h-4 w-4 cursor-pointer text-gray-400"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </li>
            </ul>

          </div>
        </div>
        <!-- / Tab content -->
      
        <!-- Footer -->
        <div class="space-y-2">
          <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>
          <div class="px-6 py-2">

            <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              <button @click="store.captureElement" type="button" class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                <span class="flex items-center gap-1">
                  <span class="">
                    Take Screenshot
                  </span>
                </span>
              </button>
              
              <button @click="store.clearAll()" type="button" class="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">
                <span class="flex items-center gap-1">
                  <span class="">
                    Clear All
                  </span>
                </span>
              </button>
            </div>

          </div>
        </div>
        <!-- Footer -->

      </div>
    </div>
    <!-- / Modal -->
  </div>
</template>