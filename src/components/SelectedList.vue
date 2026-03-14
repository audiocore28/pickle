<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import Screenshot from './Screenshot.vue';
import ButtonGroup from './ItemQty.vue';
import DriveSelect from './DriveSelect.vue';

const store = useGameStore();
const { groupedSelection, device, deviceColor } = storeToRefs(store);

const activeTab = ref('all'); 
</script>

<template>
  <div class="z-400 w-full transition flex items-center shadow-lg">

    <Screenshot />
    <!-- overlay -->
    <!-- <div aria-hidden="true" class="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"></div> -->
    
    <!-- Modal -->
    <div class="relative w-full cursor-pointer pointer-events-none transition my-auto mb-1">
      <div class="w-full cursor-default pointer-events-auto dark:bg-gray-800 relative mx-auto max-w-md">
      
        
        <!-- Header -->
        <div :class="deviceColor" class="pb-4 pt-5 rounded-t-xl flex items-center justify-center">
          <h2 class="text-md uppercase font-semibold">{{ device }} drive</h2>
        </div>
        <div aria-hidden="true" class="border-b dark:border-gray-700 px-2"></div>
        <!-- / Header -->

        <!-- Tab navigation links -->
        <div class="text-xs uppercase text-center border-b border-gray-200 hidden">
          <ul class="flex flex-wrap -mb-px">
            <li class="mr-2">
              <a 
                href="#" 
                @click.prevent="activeTab = 'all'"
                :class="{ 'border-b-2 border-stone-500 text-stone-500 font-semibold active': activeTab === 'all' }"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >
                all
              </a>
            </li>
            <li v-for="(group, groupName) in groupedSelection.list" class="mr-2">
              <a 
                href="#" 
                @click.prevent="activeTab = groupName"
                :class="{ 'border-b-2 border-stone-500 text-stone-500 font-semibold active': activeTab === groupName }"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              >
                {{ groupName }}
              </a>
            </li>
          </ul>
        </div>
        <!-- / Tab navigation links -->
        
        <!-- Tab content -->
        <div class="bg-stone-700 px-4 mx-auto max-w-md max-h-[470px] overflow-x-scroll">
          <!-- Items -->
          <h2 class="text-stone-300 text-xs font-semibold uppercase mt-5 mb-3">Items</h2>

          <ul class="mb-5">
            <li class="flex items-center justify-between py-2 border-b border-gray-600">
              <div class="flex items-center">
                <span>
                  <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 12H21.5M6 16H10M8.96656 4H15.0334C16.1103 4 16.6487 4 17.1241 4.16396C17.5445 4.30896 17.9274 4.5456 18.2451 4.85675C18.6043 5.2086 18.8451 5.6902 19.3267 6.65337L21.4932 10.9865C21.6822 11.3645 21.7767 11.5535 21.8434 11.7515C21.9026 11.9275 21.9453 12.1085 21.971 12.2923C22 12.4992 22 12.7105 22 13.1331V15.2C22 16.8802 22 17.7202 21.673 18.362C21.3854 18.9265 20.9265 19.3854 20.362 19.673C19.7202 20 18.8802 20 17.2 20H6.8C5.11984 20 4.27976 20 3.63803 19.673C3.07354 19.3854 2.6146 18.9265 2.32698 18.362C2 17.7202 2 16.8802 2 15.2V13.1331C2 12.7105 2 12.4992 2.02897 12.2923C2.05471 12.1085 2.09744 11.9275 2.15662 11.7515C2.22326 11.5535 2.31776 11.3645 2.50675 10.9865L4.67331 6.65337C5.1549 5.69019 5.3957 5.2086 5.75495 4.85675C6.07263 4.5456 6.45551 4.30896 6.87589 4.16396C7.35125 4 7.88969 4 8.96656 4Z" stroke="#B6AFA8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </span>
                <span class="text-sm text-gray-200 max-w-[200px] xs:max-w-[260px] ml-3 truncate">2.5" External Drive</span>
              </div>
              <DriveSelect />
            </li>
            <li class="flex items-center justify-between py-2 border-b border-gray-600">
              <div class="flex items-center">
                <span class="-m-3">
                  <svg width="58px" height="58px" viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" enable-background="new 0 0 76.00 76.00" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#B6AFA8" fill-opacity="1" stroke-width="0.2" stroke-linejoin="round" stroke="#FFFFFF" stroke-opacity="1" d="M 38,28.5C 41.1667,28.5 50.2708,20.5833 55.0208,30.0833C 59.7708,39.5833 58.5833,52.25 55.4167,52.25C 47.5,52.25 52.25,44.3333 38,44.3333C 23.75,44.3333 28.5,52.25 20.5833,52.25C 17.4167,52.25 16.2292,39.5833 20.9792,30.0833C 25.7292,20.5834 34.8333,28.5 38,28.5 Z M 26.9167,32.0625L 26.9167,34.8334L 24.1458,34.8334L 24.1458,38L 26.9167,38L 26.9167,40.7709L 30.0833,40.7709L 30.0833,38L 32.8542,38L 32.8542,34.8334L 30.0833,34.8334L 30.0833,32.0625L 26.9167,32.0625 Z M 45.125,34.0417C 44.2505,34.0417 43.5416,34.7506 43.5416,35.625C 43.5416,36.4995 44.2505,37.2084 45.125,37.2084C 45.9994,37.2084 46.7083,36.4995 46.7083,35.625C 46.7083,34.7506 45.9994,34.0417 45.125,34.0417 Z M 48.2917,31.2708C 47.4172,31.2708 46.7083,31.9797 46.7083,32.8542C 46.7083,33.7286 47.4172,34.4375 48.2917,34.4375C 49.1661,34.4375 49.875,33.7286 49.875,32.8542C 49.875,31.9797 49.1661,31.2708 48.2917,31.2708 Z M 48.2917,37.2083C 47.4172,37.2083 46.7083,37.9172 46.7083,38.7917C 46.7083,39.6661 47.4172,40.375 48.2917,40.375C 49.1661,40.375 49.875,39.6661 49.875,38.7917C 49.875,37.9172 49.1661,37.2083 48.2917,37.2083 Z M 51.4583,34.0417C 50.5839,34.0417 49.875,34.7505 49.875,35.625C 49.875,36.4995 50.5839,37.2083 51.4583,37.2083C 52.3328,37.2083 53.0417,36.4995 53.0417,35.625C 53.0417,34.7505 52.3328,34.0417 51.4583,34.0417 Z "></path> </g></svg>
                </span>
                <span class="text-sm text-gray-200 max-w-[200px] xs:max-w-[260px] ml-3 truncate">DS4 OEM Bluetooth Controller</span>
              </div>
              <ButtonGroup />
            </li>
          </ul>
          <!-- / Items -->

          <!-- Games  -->
          <div v-for="(group, groupName) in groupedSelection.list" class="mt-5">
            <h2 v-show="activeTab === 'all'" class="text-stone-300 text-xs font-semibold uppercase my-3">{{ groupName }} Games</h2>

            <TransitionGroup tag="ul" name="slide-x">
              <li v-show="activeTab === game.platform || activeTab === 'all'" v-for="game in group" :key="game.id" class="flex items-center justify-between py-2 border-b border-gray-600">
                <div class="flex items-center">
                  <!-- <span class="text-lg font-semibold mr-4">1</span> -->
                  <img :src="game.image" alt="game cover" class="w-8 h-8 rounded-full mr-4">
                  <span class="text-sm text-gray-200 max-w-[200px] xs:max-w-[260px] truncate">{{ game.name }}</span>
                </div>

                <div class="flex items-center">
                  <span class="text-xs text-stone-300 mr-3">{{ game.size.toFixed(1) }} GB</span>

                  <button @click="store.toggleSelect(game)" tabindex="-1" type="button">
                    <svg title="Close" tabindex="-1" class="rounded-full bg-red-600 text-white h-4 w-4 cursor-pointer text-gray-400"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </li>
            </TransitionGroup>

          </div>
          <!-- / Games  -->
          <div class="h-3"></div>
        </div>
        <!-- / Tab content -->
      
        <!-- Footer -->
        <div class="bg-stone-600 space-y-2 pb-2">
          <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>
          <div class="px-6 py-2">

            <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              <button @click="store.captureElement" type="button" :class="deviceColor" class="cursor-pointer inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm border-stone-300 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
                <span class="flex items-center gap-1">
                  <span class="">
                    Take Screenshot
                  </span>
                </span>
              </button>
              
              <button @click="store.clearAll()" type="button" class="cursor-pointer inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700">
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

<style>
  .slide-x-enter-active {
    transition: all 0.5s ease-in;
  }

  .slide-x-enter-from {
    /* transform: translateX(-100%); */
    opacity: 0;
  }

  .slide-x-enter-to {
    /* transform: translateX(0); */
    opacity: 1;
  }

  .slide-x-leave-active {
    transition: all 0.5s ease-out;
  }

  .slide-x-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-x-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }
</style>