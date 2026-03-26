<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import Screenshot from './Screenshot.vue';

const gameStore = useGameStore();

const { device } = toRefs(gameStore);
const { component } = storeToRefs(gameStore);
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
        <div class="bg-stone-800 pl-4 pb-4 pt-5 rounded-t-xl">
          <div class="flex items-center">
            <svg :fill="device.style.color" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3.59 3.03h12.2v1.26H3.59zm0 4.29h12.2v1.26H3.59zm0 4.35h12.2v1.26H3.59zM.99 4.79h.49V2.52H.6v.45h.39v1.82zm.87 3.88H.91l.14-.11.3-.24c.35-.28.49-.5.49-.79A.74.74 0 0 0 1 6.8a.77.77 0 0 0-.81.84h.52A.34.34 0 0 1 1 7.25a.31.31 0 0 1 .31.31.6.6 0 0 1-.22.44l-.87.75v.39h1.64zm-.36 3.56a.52.52 0 0 0 .28-.48.67.67 0 0 0-.78-.62.71.71 0 0 0-.77.75h.5a.3.3 0 0 1 .27-.32.26.26 0 1 1 0 .51H.91v.38H1c.23 0 .37.11.37.29a.29.29 0 0 1-.33.29.35.35 0 0 1-.36-.35H.21a.76.76 0 0 0 .83.8.74.74 0 0 0 .83-.72.53.53 0 0 0-.37-.53z"></path></g></svg>
            <h2 class="text-md ml-3 text-stone-300 uppercase font-semibold">{{ device.unit }} drive</h2>
          </div>
          <!-- <p class="text-sm text-white ml-1 pt-2">Drag to reorder game priority.</p> -->
        </div>
        <div aria-hidden="true" class="border-b dark:border-gray-700 px-2"></div>
        <!-- / Header -->
        
        <!-- Tab content -->
        <div class="bg-stone-800 mx-auto max-w-md h-[470px] lg:h-[620px] overflow-y-scroll">

          <component :is="component"/>

          <div class="h-3"></div>
        </div>
        <!-- / Tab content -->
      
        <!-- Footer -->
        <div class="bg-stone-800 space-y-2 pb-2">
          <div aria-hidden="true" class="border-t dark:border-gray-700 px-2"></div>
          <div class="px-6 py-2">

            <div class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
              <button @click="store.captureElement" type="button" :class="device.style.background, device.style.textColor" class="cursor-pointer inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-[12px] sm:text-sm border-stone-300 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800">
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