<script setup>
import { ref, toRefs } from 'vue';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();
const { device } = toRefs(gameStore);

const devices = ref(['pc', 'ps4', 'nsw']);
</script>

<template>
  <ul class="max-w-2xl mx-auto px-4 divide-y rounded-xl">
    <li @click="gameStore.selectDevice(dv)" v-for="dv in devices" :key="dv" class="flex items-center justify-between py-2 border-b border-stone-700">
      <div class="flex items-center">
        <svg class="mr-2" :fill="device.style.color" width="45px" height="45px" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Icon"> <path d="M10.24,11.85l-0.004,0.005c-0.1,0.119 -0.173,0.261 -0.209,0.413c-0.018,0.076 -0.027,0.154 -0.027,0.232l-0,2.883c-0.252,0.071 -0.444,0.16 -0.549,0.238c-0.155,0.116 -0.261,0.246 -0.331,0.379l-3.12,0c-0.552,0 -1,0.448 -1,1l-0,6c-0,0.552 0.448,1 1,1l20,-0c0.552,0 1,-0.448 1,-1l-0,-6c0,-0.552 -0.448,-1 -1,-1l-4,0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-1,-0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-2.12,0c-0.07,-0.133 -0.176,-0.263 -0.331,-0.379c-0.105,-0.078 -0.297,-0.167 -0.549,-0.238l-0,-2.883c-0,-0.248 -0.09,-0.475 -0.24,-0.65c0.727,-0.299 1.24,-1.015 1.24,-1.85c-0,-1.104 -0.896,-2 -2,-2c-1.104,0 -2,0.896 -2,2c-0,0.835 0.513,1.551 1.24,1.85Zm14.76,6.15l-0,4c-0,-0 -18,-0 -18,-0c-0,-0 -0,-4 -0,-4l18,0Z"></path> </g> </g></svg>
        <div>
          <h5 class="uppercase text-[14px] text-gray-200 leading-4 w-[150px] truncate">{{ dv }}</h5>
          <small class="text-[11px] text-gray-300 my-1">for jailbroken unit only</small>
        </div>
      </div>
    </li>
  </ul>
</template>