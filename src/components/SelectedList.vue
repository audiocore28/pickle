<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useProductStore } from '../stores/product';
import Screenshot from './Screenshot.vue';
import StorageSelect from './StorageSelect.vue';
import AccessorySelect from './AccessorySelect.vue';
import SelectedGames from './SelectedGames.vue';
import Accordion from './Accordion.vue';

const gameStore = useGameStore();
const productStore = useProductStore();

const { groupedSelection, device, deviceColor } = storeToRefs(gameStore);
const { selectedStorage } = storeToRefs(productStore);
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
        
        <!-- Tab content -->
        <div class="bg-stone-700 mx-auto max-w-md h-[470px] lg:h-[620px] overflow-x-scroll">

          <!-- Items -->
          <accordion>
            <template #header>
              
              <div class="w-full flex items-center justify-between mx-2 text-xs text-stone-300 font-semibold uppercase">
                <h2 class="mx-2 my-2 text-stone-300 text-xs font-semibold uppercase">Need More Space?</h2>
                <span class="text-stone-400">{{ `${productStore.formatSize(selectedStorage.selectedSize)} Selected (Max of ${productStore.formatSize(selectedStorage.selectedLimit)})` }}</span>
              </div>
            </template>
            
            <template #content>
              <h2 class="mb-3 mt-2 text-stone-300 text-xs font-semibold uppercase">{{ `Select One Storage for your ${device} Device` }}</h2>
              <ul class="mb-5">
                <StorageSelect />
              </ul>
              <h2 class="mb-2 mt-7 text-stone-300 text-xs font-semibold uppercase">Out of Control?</h2>
              <ul class="mb-5">
                <AccessorySelect />
              </ul>
            </template>
          </accordion>
          <!-- / Items -->

          <!-- Games -->
          <div v-for="(group, groupName) in groupedSelection.list">
            <accordion>
              <template #header>

                <div class="w-full flex items-center justify-between mx-2 text-xs text-stone-300 font-semibold uppercase">
                  <h2>{{ groupName }}</h2>
                  <span class="text-stone-400" v-show="device !== 'pc'">{{ groupedSelection.count }} Games Selected</span>
                </div>

              </template>

              <template #content>
                <SelectedGames :group="group" />
              </template>
            </accordion>
          </div>
          <!-- / Games -->

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