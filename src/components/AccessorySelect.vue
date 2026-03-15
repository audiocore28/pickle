<script setup>
import { ref } from 'vue';
import ControllerIcon from './ControllerIcon.vue';

const icons = {
  controller: ControllerIcon,
};

const accessories = ref([
  {
    id: 1,
    icon: icons.controller,
    description: 'DS4 OEM Bluetooth Controller',
    quantity: 0
  },
  {
    id: 2,
    icon: icons.controller,
    description: 'USB C OTG',
    quantity: 0
  },
]); 


function incrementQty(item) {
  item.quantity = Math.min(5, item.quantity + 1);
}

function decrementQty(item) {
  item.quantity = Math.max(0, item.quantity - 1);
}
</script>

<template>
  <li v-for="accessory in accessories" class="flex items-center justify-between py-2 border-b border-gray-600">
    <div class="flex items-center">
      <span class="-m-3">
        <component :is="accessory.icon" />
      </span>
      <span class="text-sm text-gray-200 max-w-[200px] xs:max-w-[260px] ml-3 truncate">{{ accessory.description }}</span>
    </div>

    <div class="py-1 px-2 bg-stone-600 rounded-[170px] border border-stone-500 justify-around items-center flex">
      <svg @click="decrementQty(accessory)" width="14" height="15" class="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.33398 7.5H11.6673" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
      <span class="w-12 text-center text-stone-200 text-xs">{{ accessory.quantity }}</span>
      <svg @click="incrementQty(accessory)" class="cursor-pointer relative" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </div>
  </li>
</template>