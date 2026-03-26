<script setup>
import { toRefs } from 'vue';
import { useGameStore } from '../stores/game';
import StorageSelect from './StorageSelect.vue';
import AccessorySelect from './AccessorySelect.vue';

const gameStore = useGameStore();

const { device } = toRefs(gameStore);
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 rounded-xl">
    <h2 class="mb-3 mt-4 text-stone-300 text-xs font-semibold uppercase">{{ `Select One Storage for your ${device.unit} Device` }}</h2>
    <ul class="mb-5">
      <StorageSelect />
    </ul>
    <h2 class="mb-2 mt-8 text-stone-300 text-xs font-semibold uppercase">Add-ons</h2>
    <ul class="mb-5">
      <AccessorySelect />
    </ul>
  </div>
</template>