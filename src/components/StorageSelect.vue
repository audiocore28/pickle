<script setup>
import { storeToRefs } from 'pinia';
import { useProductStore } from '../stores/product';
import { useGameStore } from '../stores/game';

const gameStore = useGameStore();
const productStore = useProductStore();
const { device } = storeToRefs(gameStore);
const { storages } = storeToRefs(productStore);

</script>

<template>
  <li class="flex items-start">
    <table class="w-full rounded-xl">
      <tbody>
        <tr v-for="storage in storages" :key="storage.id" v-show="storage.devices.includes(device)" class="text-center border-b border-gray-600">
          <td class="flex items-center py-2 pl-1 text-left align-top w-[50px]">
            <div>
              <component :is="storage.icon" />
            </div>
            <div class="">
              <h5 class="text-sm text-gray-200 leading-4 w-[150px] truncate">{{ storage.description }}</h5>
              <small class="text-[10px] text-gray-300 py-2">{{ storage.selectedPrice }}</small>
            </div>
          </td>
          <td class="w-[100px]">
            <div class="p-1 bg-stone-600 rounded-[10px] border border-stone-500 justify-around items-center flex">
              <svg @click="productStore.getNextLowerCapacity(storage)" width="14" height="15" class="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33398 7.5H11.6673" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span class="w-10 text-center text-stone-200 text-xs">{{ storage.selectedCapacity }} GB</span>
              <svg @click="productStore.getNextHigherCapacity(storage)" class="cursor-pointer relative" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
          </td>
          <td class="w-[100px] text-xs text-gray-300 py-2">
            <div class="flex justify-end px-4">
              <span>{{ storage.selectedPrice }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
</template>