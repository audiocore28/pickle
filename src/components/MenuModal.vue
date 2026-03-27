<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '../stores/modal';
import Screenshot from './Screenshot.vue';

const modalStore = useModalStore();

const { toggleMenu, menuComponent } = storeToRefs(modalStore);
</script>

<template>
  <div v-show="toggleMenu" class="z-400 w-full transition flex items-center shadow-lg">

    <Screenshot />

    <component :is="menuComponent"/>

  </div>
</template>