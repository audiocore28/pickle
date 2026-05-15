<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import { useProductStore } from '../stores/product';
import StorageSelect from './StorageSelect.vue';
import AccessorySelect from './AccessorySelect.vue';
import SelectedList from './SelectedList.vue';
import IconHardDrive from './icons/IconHardDrive.vue';

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
        <IconHardDrive :style="{ color: device.style.color }" style="width: 20px; height: 20px; margin-top: 2px;" />
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