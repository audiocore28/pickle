<script setup>
import { ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useProductStore } from '../stores/product';
import { useModalStore } from '../stores/modal';
import Products from '@/components/Products.vue';
import SelectedGames from '@/components/SelectedGames.vue';
import Device from '@/components/Device.vue';

const gameStore = useGameStore();
const productStore = useProductStore();
const modalStore = useModalStore();

const {
  groupedSelection,
  percentageWidth,
  percentageColor,
  targetElementRef
} = storeToRefs(gameStore);

const { device } = toRefs(gameStore);
const { currentTab, toggleMenu } = storeToRefs(modalStore);

</script>

<template>
  <div class="mx-auto inset-x-0 fixed bottom-0 z-800 w-full sm:w-[450px] cursor-pointer">

    <div class="relative max-w-lg mx-auto bg-stone-800">
      <div v-show="!toggleMenu" class="flex h-1.5 bg-stone-400 shadow-inner">
        <div :style="{ backgroundColor: percentageColor, width: percentageWidth, transition: `width 0.5s ease, background-color 0.5s ease` }"></div>
      </div>

      <div class="flex items-center justify-between font-semibold">
        <div @click="modalStore.openMenu(Device, 'device')" class="relative flex-1 flex justify-center items-center py-4 hover:bg-stone-700" :class="{ 'bg-stone-700' : currentTab === 'device' }">
          <!-- shortcut key label-->
          <div class="z-500 absolute top-0 right-0 pt-1 pr-3">
            <span class="text-sm text-stone-600">a</span>
          </div>
          <!-- shortcut key label-->

          <svg :fill="device.style.color" width="28px" height="28px" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Icon"> <path d="M10.24,11.85l-0.004,0.005c-0.1,0.119 -0.173,0.261 -0.209,0.413c-0.018,0.076 -0.027,0.154 -0.027,0.232l-0,2.883c-0.252,0.071 -0.444,0.16 -0.549,0.238c-0.155,0.116 -0.261,0.246 -0.331,0.379l-3.12,0c-0.552,0 -1,0.448 -1,1l-0,6c-0,0.552 0.448,1 1,1l20,-0c0.552,0 1,-0.448 1,-1l-0,-6c0,-0.552 -0.448,-1 -1,-1l-4,0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-1,-0c-0,-0.552 -0.448,-1 -1,-1l-1,-0c-0.552,-0 -1,0.448 -1,1l-2.12,0c-0.07,-0.133 -0.176,-0.263 -0.331,-0.379c-0.105,-0.078 -0.297,-0.167 -0.549,-0.238l-0,-2.883c-0,-0.248 -0.09,-0.475 -0.24,-0.65c0.727,-0.299 1.24,-1.015 1.24,-1.85c-0,-1.104 -0.896,-2 -2,-2c-1.104,0 -2,0.896 -2,2c-0,0.835 0.513,1.551 1.24,1.85Zm14.76,6.15l-0,4c-0,-0 -18,-0 -18,-0c-0,-0 -0,-4 -0,-4l18,0Z"></path> </g> </g></svg>
          <span class="text-stone-200 text-xs inline-block py-1 px-2 rounded-full uppercase">
            {{ device.unit }} Device
          </span>
        </div>
        <div @click="modalStore.openMenu(SelectedGames, 'list')" class="relative flex-1 flex justify-center items-center py-4 hover:bg-stone-700" :class="{ 'bg-stone-700' : currentTab === 'list' }">
          <!-- shortcut key label-->
          <div class="z-500 absolute top-0 right-0 pt-1 pr-3">
            <span class="text-sm text-stone-600">s</span>
          </div>
          <!-- shortcut key label-->

          <svg :fill="device.style.color" width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3.59 3.03h12.2v1.26H3.59zm0 4.29h12.2v1.26H3.59zm0 4.35h12.2v1.26H3.59zM.99 4.79h.49V2.52H.6v.45h.39v1.82zm.87 3.88H.91l.14-.11.3-.24c.35-.28.49-.5.49-.79A.74.74 0 0 0 1 6.8a.77.77 0 0 0-.81.84h.52A.34.34 0 0 1 1 7.25a.31.31 0 0 1 .31.31.6.6 0 0 1-.22.44l-.87.75v.39h1.64zm-.36 3.56a.52.52 0 0 0 .28-.48.67.67 0 0 0-.78-.62.71.71 0 0 0-.77.75h.5a.3.3 0 0 1 .27-.32.26.26 0 1 1 0 .51H.91v.38H1c.23 0 .37.11.37.29a.29.29 0 0 1-.33.29.35.35 0 0 1-.36-.35H.21a.76.76 0 0 0 .83.8.74.74 0 0 0 .83-.72.53.53 0 0 0-.37-.53z"></path></g></svg>
          <span ref="targetElementRef" class="text-stone-200 text-xs inline-block py-1 px-2 rounded-full uppercase">
            {{ productStore.formatSize(groupedSelection.size.toFixed(1)) }} Used
          </span>
        </div>
        <div @click="modalStore.openMenu(Products, 'products')" class="relative flex-1 flex justify-center items-center py-4 hover:bg-stone-700" :class="{ 'bg-stone-700' : currentTab === 'products' }">
          <!-- shortcut key label-->
          <div class="z-500 absolute top-0 right-0 pt-1 pr-3">
            <span class="text-xs text-stone-600">d</span>
          </div>
          <!-- shortcut key label-->

          <svg :fill="device.style.color" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="bi bi-hdd"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.5 11a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path> <path d="M16 11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9.51c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198V11zM3.655 4.26 1.592 8.043C1.724 8.014 1.86 8 2 8h12c.14 0 .276.014.408.042L12.345 4.26a.5.5 0 0 0-.439-.26H4.094a.5.5 0 0 0-.44.26zM1 10v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"></path> </g></svg>
          <span class="text-stone-200 text-xs inline-block py-1 px-2 rounded-full uppercase">
            {{ productStore.formatSize(device.assignedStorage.limit) }} Limit
          </span>
        </div>
      </div>
    </div>

  </div>
</template>