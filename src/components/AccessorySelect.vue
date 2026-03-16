<script setup>
import { ref, computed } from 'vue';
import ControllerIcon from './ControllerIcon.vue';

const icons = {
  controller: ControllerIcon,
};

const accessories = ref([
  {
    id: 1,
    icon: icons.controller,
    description: 'Wireless Controller',
    price: 899,
    quantity: 0,
    limit: 2
  },
  {
    id: 2,
    icon: icons.controller,
    description: 'USB C OTG',
    price: 299,
    quantity: 0,
    limit: 1
  },
]); 


function incrementQty(item) {
  item.quantity = Math.min(item.limit, item.quantity + 1);
}

function decrementQty(item) {
  item.quantity = Math.max(0, item.quantity - 1);
}

function formattedAmount(amount) {
  return amount.toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
  });
}

const total = computed(() => accessories.value.reduce((sum, currentItem) =>  sum += (currentItem.price * currentItem.quantity), 0));
const count = computed(() => accessories.value.reduce((sum, currentItem) =>  sum += currentItem.quantity, 0));

</script>

<template>
  <li class="flex items-start">
    <table class="w-full rounded-xl">
      <tbody>
        <tr v-for="accessory in accessories" class="text-center border-b border-gray-600">
          <td class="flex items-center py-2 pl-1 text-left align-top max-w-[140px] sm:max-w-[110px]">
            <div>
              <component :is="accessory.icon" />
            </div>
            <div class="ml-3">
              <h5 class="text-sm text-gray-200 leading-4 max-w-[200px] xs:max-w-[260px] truncate">{{ accessory.description }}</h5>
              <small class="text-[10.5px] text-gray-300 py-2">₱{{ accessory.price.toFixed(2) }}</small>
            </div>
          </td>
          <td class="max-w-[80px] sm:max-w-[60px]">
            <div class="py-1 px-2 bg-stone-600 rounded-[170px] border border-stone-500 justify-around items-center flex">
              <svg @click="decrementQty(accessory)" width="14" height="15" class="cursor-pointer" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33398 7.5H11.6673" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <span class="w-5 text-center text-stone-200 text-xs">{{ accessory.quantity }}</span>
              <svg @click="incrementQty(accessory)" class="cursor-pointer relative" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.33398 7.49998H11.6673M7.00065 2.83331V12.1666V2.83331Z" stroke="#292524" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
          </td>
          <td class="text-xs text-gray-300 py-2">
            <div class="flex justify-end px-4">
              <span>{{ formattedAmount(accessory.price * accessory.quantity) }}</span>
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
              <span>{{ formattedAmount(total) }}</span>
              <!-- <span>{{ count }}</span> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </li>
</template>