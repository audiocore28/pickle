<script setup>
import { ref, toRefs } from 'vue';
import { useGameStore } from '../stores/game';
import SelectedList from './SelectedList.vue';

const gameStore = useGameStore();
const { device } = toRefs(gameStore);

const devices = {
  computers: [
    {
      name: 'High Specs',
      code: 'pc',
      description: 'Unit that\'s capable of running Triple A Games'
    },
  ],
  consoles: [
    {
      name: 'Playstation 4',
      code: 'ps4',
      description: 'For CFW / Jailbroken units only'
    },
    {
      name: 'Switch',
      code: 'nsw',
      description: 'For CFW / Jailbroken units only'
    },
  ],
};
</script>

<template>

  <SelectedList>
    <template #header>
      <div class="flex items-center">
        <svg class="-mt-7" :fill="device.style.color" width="30px" height="30px" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Icon"> <path d="M10.24,11.85l-0.004,0.005c-0.1,0.119 -0.173,0.261 -0.209,0.413c-0.018,0.076 -0.027,0.154 -0.027,0.232l-0,2.883c-0.252,0.071 -0.444,0.16 -0.549,0.238c-0.155,0.116 -0.261,0.246 -0.331,0.379l-3.12,0c-0.552,0 -1,0.448 -1,1l-0,6c-0,0.552 0.448,1 1,1l20,-0c0.552,0 1,-0.448 1,-1l-0,-6c0,-0.552 -0.448,-1 -1,-1l-4,0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-1,-0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-2.12,0c-0.07,-0.133 -0.176,-0.263 -0.331,-0.379c-0.105,-0.078 -0.297,-0.167 -0.549,-0.238l-0,-2.883c-0,-0.248 -0.09,-0.475 -0.24,-0.65c0.727,-0.299 1.24,-1.015 1.24,-1.85c-0,-1.104 -0.896,-2 -2,-2c-1.104,0 -2,0.896 -2,2c-0,0.835 0.513,1.551 1.24,1.85Zm14.76,6.15l-0,4c-0,-0 -18,-0 -18,-0c-0,-0 -0,-4 -0,-4l18,0Z"></path> </g> </g></svg>
        <div class="ml-3">
          <h2 class="text-md text-stone-300 uppercase font-semibold">Select your Gaming Device</h2>
          <p class="text-sm text-stone-400 pt-1">One gaming device per game drive</p>
        </div>
      </div>
    </template>

    <template #content>
      <h2 class="mx-6 mt-5 text-stone-300 text-xs font-semibold uppercase">Windows Desktop / Laptop</h2>
      <ul class="max-w-2xl mx-auto px-4 rounded-xl">
        <li @click="gameStore.selectDevice(dv.code)" v-for="dv in devices.computers" :key="dv" class="flex items-center justify-between py-2 cursor-pointer">

          <div 
            :class="{
              'from-teal-800/90 to-stone-900' : device.unit === 'pc' && dv.code === 'pc', 
              'from-fuchsia-900/90 to-stone-900' : device.unit === 'ps4' && dv.code === 'ps4',
              'from-yellow-400/90 to-stone-900' : device.unit === 'nsw' && dv.code === 'nsw' 
            }" 
            class="text-stone-200 bg-gradient-to-r rounded-lg shadow-md p-7 w-full">

            <h1 class="text-2xl font-bold mb-4">
              {{ dv.name }}
            </h1>
            <p class="text-sm mb-3 text-stone-300">{{ dv.description }}</p>
          </div>

        </li>
      </ul>
      <h2 class="mx-6 mt-4 text-stone-300 text-xs font-semibold uppercase">Consoles / Handhelds</h2>
      <ul class="max-w-2xl mx-auto px-4 rounded-xl">
        <li @click="gameStore.selectDevice(dv.code)" v-for="dv in devices.consoles" :key="dv" class="flex items-center justify-between py-2 cursor-pointer">

          <div 
            :class="{
              'from-teal-800/90 to-stone-900' : device.unit === 'pc' && dv.code === 'pc', 
              'from-fuchsia-900/90 to-stone-900' : device.unit === 'ps4' && dv.code === 'ps4',
              'from-yellow-400/90 to-stone-900' : device.unit === 'nsw' && dv.code === 'nsw' 
            }" 
            class="text-stone-200 bg-gradient-to-r rounded-lg shadow-md p-7 w-full">

            <h1 class="text-2xl font-bold mb-4">
              {{ dv.name }}
            </h1>
            <p class="text-sm mb-3 text-stone-300">{{ dv.description }}</p>
          </div>

        </li>
      </ul>
    </template>

    <template #footer>
      <div class="flex items-center h-8">
        <span class="text-stone-200 text-sm font-semibold truncate text-stone-400 mx-auto">PC: Minimum requirements does not guarantee a smooth gameplay.</span>
      </div>
    </template>
  </SelectedList>
</template>