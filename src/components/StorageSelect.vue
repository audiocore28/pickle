<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

import DriveIcon from './DriveIcon.vue';

const gameStore = useGameStore();
const { driveCapacity } = storeToRefs(gameStore);

const icons = {
  drive: DriveIcon,
};

const storages = ref([
  {
    id: 1,
    icon: icons.drive,
    description: '2.5\" External Drive',
    capacities: [280,440,910],
    selectedCapacity:440 
  },
  {
    id: 2,
    icon: icons.drive,
    description: '3.5\" Internal Drive',
    capacities: [440,910],
    selectedCapacity: 0
  },
  {
    id: 3,
    icon: icons.drive,
    description: 'Your Own Storage',
    capacities: [280,440,580,680,910,1800,3700],
    selectedCapacity: 0
  }
]); 

function getNextHigherCapacity(storage) {
  storages.value.forEach(s => {
      if (s.id !== storage.id) {
        s.selectedCapacity = 0;
      }
  });

  const maxCapacity = Math.max(...storage.capacities);
  const higherCapacities = storage.capacities.filter(size => size > storage.selectedCapacity);

  
  if (higherCapacities.length > 0) { 
    storage.selectedCapacity = Math.min(...higherCapacities);
  } else {
    storage.selectedCapacity = maxCapacity;
  }

  driveCapacity.value = storage.selectedCapacity;
}

function getNextLowerCapacity(storage) {
  if (storage.selectedCapacity === 0) {
    return;
  }
  
  storages.value.forEach(s => {
      if (s.id !== storage.id) {
        s.selectedCapacity = 0;
      }
  });

  const minCapacity = Math.min(...storage.capacities);
  const lowerCapacities = storage.capacities.filter(size => size < storage.selectedCapacity);

  if (lowerCapacities.length > 0) { 
    storage.selectedCapacity = Math.max(...lowerCapacities) ;
  } else { 
    storage.selectedCapacity = minCapacity;
  }

  driveCapacity.value = storage.selectedCapacity;
}
</script>

<template>
  <li class="flex items-start">
    <table class="w-full rounded-xl">
      <tbody>
        <tr v-for="storage in storages" class="text-center border-b border-gray-600">
          <td class="flex items-center py-2 pl-1 text-left align-top max-w-[140px] sm:max-w-[110px]">
            <div>
              <component :is="storage.icon" />
            </div>
            <div class="">
              <h5 class="text-sm text-gray-200 leading-4 max-w-[200px] xs:max-w-[260px] truncate">{{ storage.description }}</h5>
              <small class="text-[10px] text-gray-300 py-2">$14.00</small>
            </div>
          </td>
          <td class="max-w-[80px] sm:max-w-[60px]">
            <div class="p-1 bg-stone-600 rounded-[10px] border border-stone-500 justify-around items-center flex">
              <svg @click="getNextLowerCapacity(storage)" width="14" height="15" class="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33398 7.5H11.6673" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span class="w-10 text-center text-stone-200 text-xs">{{ storage.selectedCapacity }} GB</span>
              <svg @click="getNextHigherCapacity(storage)" class="cursor-pointer relative" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
          </td>
          <td class="text-xs text-gray-300 py-2">
            <div class="flex justify-end px-4">
              <span>$70.00</span>
            </div>
          </td>
        </tr>
        <tr class="text-center border-b border-gray-600 h-14">
          <td class="flex items-center py-2 pl-1 text-left align-top max-w-[140px] sm:max-w-[110px]">
          </td>
          <td class="max-w-[80px] sm:max-w-[60px]">
            <span class="text-sm text-gray-300 uppercase">Total:</span>
          </td>
          <td class="text-xs text-gray-300 py-2">
            <div class="flex justify-end px-4">
              <span>3,000</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
</template>