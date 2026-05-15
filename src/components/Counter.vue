<script setup>
import { ref, toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import { useProductStore } from '../stores/product';
import { useModalStore } from '../stores/modal';
import Products from '@/components/Products.vue';
import SelectedGames from '@/components/SelectedGames.vue';
import Device from '@/components/Device.vue';
import IconArcadeController from './icons/IconArcadeController.vue';
import IconList from './icons/IconList.vue';
import IconHardDrive from './icons/IconHardDrive.vue';

const gameStore = useGameStore();
const selectStore = useSelectStore();
const productStore = useProductStore();
const modalStore = useModalStore();

const { device } = toRefs(gameStore);
const { groupedSize, percentageWidth, percentageColor } = storeToRefs(selectStore);
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
          <div class="z-500 absolute top-0 right-0 pt-1 pr-3 hidden sm:block">
            <span class="text-sm text-stone-600">a</span>
          </div>
          <!-- shortcut key label-->

          <IconArcadeController :style="{ color: device.style.color }" />
          <span class="text-stone-200 text-xs inline-block py-1 px-2 rounded-full uppercase">
            {{ device.unit }} Device
          </span>
        </div>
        <div @click="modalStore.openMenu(SelectedGames, 'list')" class="relative flex-1 flex justify-center items-center py-4 hover:bg-stone-700" :class="{ 'bg-stone-700' : currentTab === 'list' }">
          <!-- shortcut key label-->
          <div class="z-500 absolute top-0 right-0 pt-1 pr-3 hidden sm:block">
            <span class="text-sm text-stone-600">s</span>
          </div>
          <!-- shortcut key label-->

          <IconList :style="{ color: device.style.color }" />
          <span id="cart-icon" class="text-stone-200 text-xs inline-block py-1 px-2 rounded-full uppercase">
            {{ productStore.formatSize(groupedSize.toFixed(1)) }} Used
          </span>
        </div>
        <div @click="modalStore.openMenu(Products, 'products')" class="relative flex-1 flex justify-center items-center py-4 hover:bg-stone-700" :class="{ 'bg-stone-700' : currentTab === 'products' }">
          <!-- shortcut key label-->
          <div class="z-500 absolute top-0 right-0 pt-1 pr-3 hidden sm:block">
            <span class="text-xs text-stone-600">d</span>
          </div>
          <!-- shortcut key label-->

          <IconHardDrive :style="{ color: device.style.color }" />
          <span class="text-stone-200 text-xs inline-block py-1 px-2 rounded-full uppercase">
            {{ productStore.formatSize(device.assignedStorage.limit) }} Limit
          </span>
        </div>
      </div>
    </div>

  </div>
</template>