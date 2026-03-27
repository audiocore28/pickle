<script setup>
import { ref, toRefs } from 'vue';
import { useGameStore } from '../stores/game';
import SelectedList from './SelectedList.vue';

const gameStore = useGameStore();
const { device } = toRefs(gameStore);

const devices = ref(['pc', 'ps4', 'nsw']);
</script>

<template>

  <SelectedList>
    <template #header>
      <div class="flex items-center">
        <svg :fill="device.style.color" width="28px" height="28px" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Icon"> <path d="M10.24,11.85l-0.004,0.005c-0.1,0.119 -0.173,0.261 -0.209,0.413c-0.018,0.076 -0.027,0.154 -0.027,0.232l-0,2.883c-0.252,0.071 -0.444,0.16 -0.549,0.238c-0.155,0.116 -0.261,0.246 -0.331,0.379l-3.12,0c-0.552,0 -1,0.448 -1,1l-0,6c-0,0.552 0.448,1 1,1l20,-0c0.552,0 1,-0.448 1,-1l-0,-6c0,-0.552 -0.448,-1 -1,-1l-4,0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-1,-0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-2.12,0c-0.07,-0.133 -0.176,-0.263 -0.331,-0.379c-0.105,-0.078 -0.297,-0.167 -0.549,-0.238l-0,-2.883c-0,-0.248 -0.09,-0.475 -0.24,-0.65c0.727,-0.299 1.24,-1.015 1.24,-1.85c-0,-1.104 -0.896,-2 -2,-2c-1.104,0 -2,0.896 -2,2c-0,0.835 0.513,1.551 1.24,1.85Zm14.76,6.15l-0,4c-0,-0 -18,-0 -18,-0c-0,-0 -0,-4 -0,-4l18,0Z"></path> </g> </g></svg>
        <h2 class="text-md ml-3 text-stone-300 uppercase font-semibold">Select your Gaming Device</h2>
      </div>
      <!-- <p class="text-sm text-white ml-1 pt-2">Select your Gaming Device</p> -->
    </template>

    <template #content>
      <ul class="max-w-2xl mx-auto px-4 divide-y rounded-xl">
        <li @click="gameStore.selectDevice(dv)" v-for="dv in devices" :key="dv" class="flex items-center justify-between py-2 border-b border-stone-700">
          <div class="flex items-center">
            <!-- <img :src="game.image" alt="game cover" class="w-8 h-8 rounded-full mr-4"> -->
            <svg class="mr-2" :fill="device.style.color" width="45px" height="45px" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Icon"> <path d="M10.24,11.85l-0.004,0.005c-0.1,0.119 -0.173,0.261 -0.209,0.413c-0.018,0.076 -0.027,0.154 -0.027,0.232l-0,2.883c-0.252,0.071 -0.444,0.16 -0.549,0.238c-0.155,0.116 -0.261,0.246 -0.331,0.379l-3.12,0c-0.552,0 -1,0.448 -1,1l-0,6c-0,0.552 0.448,1 1,1l20,-0c0.552,0 1,-0.448 1,-1l-0,-6c0,-0.552 -0.448,-1 -1,-1l-4,0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-1,-0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-2.12,0c-0.07,-0.133 -0.176,-0.263 -0.331,-0.379c-0.105,-0.078 -0.297,-0.167 -0.549,-0.238l-0,-2.883c-0,-0.248 -0.09,-0.475 -0.24,-0.65c0.727,-0.299 1.24,-1.015 1.24,-1.85c-0,-1.104 -0.896,-2 -2,-2c-1.104,0 -2,0.896 -2,2c-0,0.835 0.513,1.551 1.24,1.85Zm14.76,6.15l-0,4c-0,-0 -18,-0 -18,-0c-0,-0 -0,-4 -0,-4l18,0Z"></path> </g> </g></svg>
            <!-- <span class="text-sm uppercase text-gray-200 max-w-[200px] xs:max-w-[260px] truncate">{{ dv }}</span> -->
            <div>
              <h5 class="uppercase text-[14px] text-gray-200 leading-4 w-[150px] truncate">{{ dv }}</h5>
              <small class="text-[11px] text-gray-300 my-1">for jailbroken unit only</small>
            </div>
          </div>
          
          <!-- <div class="flex items-center">
            <span class="text-xs text-stone-300 mr-3">{{ game.size.toFixed(1) }} GB</span>
            
            <button @click="gameStore.toggleSelect(game)" tabindex="-1" type="button">
              <svg title="Close" tabindex="-1" class="rounded-full bg-red-600 text-white h-4 w-4 cursor-pointer text-gray-400"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
              </svg>
            </button>
          </div> -->
        </li>
      </ul>
    </template>

    <template #footer>
      <span class="text-stone-200 text-md font-semibold">device footer</span>
    </template>
  </SelectedList>
</template>