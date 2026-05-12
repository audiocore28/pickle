<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import { useProductStore } from '../stores/product';
import StorageSelect from './StorageSelect.vue';
import AccessorySelect from './AccessorySelect.vue';
import SelectedList from './SelectedList.vue';

const gameStore = useGameStore();
const selectStore = useSelectStore();
const productStore = useProductStore();

const { totalPrice } = storeToRefs(productStore);
const { device } = toRefs(gameStore);
const { freeSpace, percentageColor } = storeToRefs(selectStore);
</script>

<template>
  <SelectedList>
    <template #header>
      <div class="flex">
        <svg :fill="device.style.color" width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" class="mt-1 bi bi-hdd"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.5 11a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 10.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path> <path d="M16 11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9.51c0-.418.105-.83.305-1.197l2.472-4.531A1.5 1.5 0 0 1 4.094 3h7.812a1.5 1.5 0 0 1 1.317.782l2.472 4.53c.2.368.305.78.305 1.198V11zM3.655 4.26 1.592 8.043C1.724 8.014 1.86 8 2 8h12c.14 0 .276.014.408.042L12.345 4.26a.5.5 0 0 0-.439-.26H4.094a.5.5 0 0 0-.44.26zM1 10v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"></path> </g></svg>
        <div class="ml-3">
          <h2 class="text-md text-stone-300 uppercase font-semibold">{{ device.unit }} game drive</h2>
          <p class="font-inter text-xs text-stone-400 pt-1">Remaining Space:   <span :style="{ color: percentageColor }">{{ productStore.formatSize(freeSpace.toFixed(1)) }}</span> / {{ productStore.formatSize(device.assignedStorage.limit) }} limit</p>
        </div>
      </div>
    </template>

    <template #content>
      <div class="max-w-2xl mx-auto px-4 mt-5 rounded-xl">
        <h2 class="mb-3 text-stone-300 text-xs font-semibold uppercase">{{ `Select One Storage for your ${device.unit} Device` }}</h2>
        <ul class="mb-5">
          <StorageSelect />
        </ul>
        <h2 class="mb-2 mt-8 text-stone-300 text-xs font-semibold uppercase">Add-ons</h2>
        <ul class="mb-5">
          <AccessorySelect />
        </ul>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between items-center h-8">
        <span class="text-stone-200 uppercase">Total :</span>
        <span class="text-stone-200">{{ productStore.formattedAmount(totalPrice) }}</span>
      </div>
    </template>
  </SelectedList>
</template>