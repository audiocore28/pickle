<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import GameList from '@/components/GameList.vue';
import Counter from '@/components/Counter.vue';
import Platform from '@/components/Platform.vue';
import Search from '@/components/Search.vue';
import Sort from '@/components/Sort.vue';
import Overlay from './components/Overlay.vue';
import MenuModal from '@/components/MenuModal.vue';

const modalStore = useModalStore();
const { toggleMenu } = storeToRefs(modalStore);
</script>

<template>
  <div class="font-oswald">
    <!-- Filters -->
    <div class="bg-stone-900 fixed top-0 w-full z-[200] border border-b-stone-800">
      <div class="lg:flex justify-between items-center max-w-screen-2xl lg:px-16 mx-auto">
        <div class="flex justify-center lg:justify-between w-full items-center rounded-lg relative mt-3 lg:mt-5 px-4 lg:pb-3">

          <Search />

        </div>

        <div class="flex justify-center items-center rounded-lg relative pb-2 lg:pt-4">
          <Transition name="slide-l">
            <Platform />
          </Transition>
        </div>

      </div>
    </div>
    <!-- / Filters -->

    <Transition name="slide-y">
      <MenuModal v-show="toggleMenu"/>
    </Transition>

    <GameList />

    <Counter />

    <Teleport to="#modal">

      <Overlay />

    </Teleport>

  </div>
</template>

<style>
  .slide-y-enter-active, .slide-y-leave-active {
    transition: all 0.5s ease;
  }

  .slide-y-enter-from, .slide-y-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  .slide-y-enter-to, .slide-y-leave-from {
    transform: translateY(0);
    opacity: 1;
  }
</style>