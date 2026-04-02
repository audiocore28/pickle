<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '../stores/modal';
import Screenshot from './Screenshot.vue';

const modalStore = useModalStore();

const { toggleMenu, menuComponent } = storeToRefs(modalStore);
</script>

<template>
  <div class="relative z-400 w-full transition flex items-center shadow-lg">
    <!-- Close Button -->
    <div class="z-800 absolute top-0 right-0 pt-4 pr-4">
      <button @click="toggleMenu = false" type="button" data-behavior="cancel" class="cursor-pointer rounded-md text-gray-400 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span class="sr-only">Close</span>
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <!-- Close Button -->

    <!-- shortcut key label -->
    <div class="z-500 absolute top-0 right-0 pt-8 pr-4">
      <span class="text-sm text-stone-600">spacebar</span>
    </div>
    <!-- shortcut key label -->

    <Screenshot />

    <component :is="menuComponent"/>

  </div>
</template>