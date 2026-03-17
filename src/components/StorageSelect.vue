<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

import DriveIcon from './DriveIcon.vue';

const gameStore = useGameStore();
const { driveCapacity, device } = storeToRefs(gameStore);

const icons = {
  drive: DriveIcon,
};

const storages = ref([
  {
    id: 1,
    icon: icons.drive,
    description: '2.5\" External Drive',
    devices: ['pc','ps4','nsw'],
    capacities: [
      {
        limit: 280,
        price: 1000,
        isAvailable: true
      },
      {
        limit: 440,
        price: 1300,
        isAvailable: true
      },
      {
        limit: 580,
        price: 1500,
        isAvailable: false
      },
      {
        limit: 680,
        price: 1800,
        isAvailable: false
      },
      {
        limit: 910,
        price: 2300,
        isAvailable: true
      },
      {
        limit: 1800,
        price: 3200,
        isAvailable: false
      },
      {
        limit: 3700,
        price: 6500,
        isAvailable: false
      },
    ],
    selectedCapacity: 440,
    selectedPrice: 1300 
  },
  {
    id: 2,
    icon: icons.drive,
    description: '3.5\" Internal Drive',
    devices: ['pc'],
    capacities: [
      {
        limit: 440,
        price: 900,
        isAvailable: true
      },
      {
        limit: 910,
        price: 1500,
        isAvailable: true
      },
    ],
    selectedCapacity: 0,
    selectedPrice: 0 
  },
  {
    id: 3,
    icon: icons.drive,
    description: 'Provide Your Own',
    devices: ['pc','ps4','nsw'],
    capacities: [
      {
        limit: 280,
        price: 1000,
        isAvailable: true
      },
      {
        limit: 440,
        price: 1300,
        isAvailable: true
      },
      {
        limit: 580,
        price: 1500,
        isAvailable: true
      },
      {
        limit: 680,
        price: 1800,
        isAvailable: true
      },
      {
        limit: 910,
        price: 2300,
        isAvailable: true
      },
      {
        limit: 1800,
        price: 3200,
        isAvailable: true
      },
      {
        limit: 3700,
        price: 6500,
        isAvailable: true
      },
    ],
    selectedCapacity: 0,
    selectedPrice: 0 
  }
]); 

function getNextHigherCapacity(storage) {
  storages.value.forEach(s => {
      if (s.id !== storage.id) {
        s.selectedCapacity = 0;
        s.selectedPrice = 0;
      }
  });

  const higherCapacities = storage.capacities.filter(size => size.limit > storage.selectedCapacity && size.isAvailable === true);
  
  if (higherCapacities.length > 0) { 
    const nextCapacity = higherCapacities.reduce((accumulator, current) => {
      return (current.limit < accumulator.limit) ? current : accumulator;
    }, higherCapacities[0]); 


    storage.selectedCapacity = nextCapacity.limit;
    storage.selectedPrice = nextCapacity.price;
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
        s.selectedPrice = 0;
      }
  });

  const lowerCapacities = storage.capacities.filter(size => size.limit < storage.selectedCapacity && size.isAvailable === true);

  if (lowerCapacities.length > 0) { 
    const prevCapacity = lowerCapacities.reduce((accumulator, current) => {
      return (current.limit > accumulator.limit) ? current : accumulator;
    }, lowerCapacities[0]);


    storage.selectedCapacity = prevCapacity.limit;
    storage.selectedPrice = prevCapacity.price;
  }

  driveCapacity.value = storage.selectedCapacity;
}
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
              <svg @click="getNextLowerCapacity(storage)" width="14" height="15" class="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33398 7.5H11.6673" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span class="w-10 text-center text-stone-200 text-xs">{{ storage.selectedCapacity }} GB</span>
              <svg @click="getNextHigherCapacity(storage)" class="cursor-pointer relative" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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