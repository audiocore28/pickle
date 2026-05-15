<script setup>
import { ref, toRefs } from 'vue';
import { useGameStore } from '../stores/game';
import SelectedList from './SelectedList.vue';
import IconArcadeController from './icons/IconArcadeController.vue';

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
        <IconArcadeController :style="{ color: device.style.color }" style="width: 30px; height: 30px; margin-top: -25px;" />
        <div class="ml-3">
          <h2 class="text-md text-stone-300 uppercase font-semibold">Select your Gaming Device</h2>
          <p class="font-inter text-xs text-stone-400 pt-1">One gaming device per game drive</p>
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
            <p class="font-inter text-xs mb-3 text-stone-300">{{ dv.description }}</p>
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
            <p class="font-inter text-xs mb-3 text-stone-300">{{ dv.description }}</p>
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