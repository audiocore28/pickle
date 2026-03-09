<script setup>
import GameList from '@/components/GameList.vue';
import Counter from '@/components/Counter.vue';
import Platform from '@/components/Platform.vue';
import Search from '@/components/Search.vue';
import Sort from '@/components/Sort.vue';
import Overlay from './components/Overlay.vue';
import Device from './components/Device.vue';
</script>

<template>
  <div class="font-oswald">
    <!-- Filters -->
    <div class="bg-stone-100 fixed top-0 w-full z-[200]">
      <div class="xl:flex justify-between items-center max-w-screen-2xl xl:px-16 mx-auto">
        <div class="flex justify-center items-center rounded-lg relative pb-2 pt-4">

          <Search />
          <Sort />

        </div>

        <div class="flex justify-center items-center rounded-lg relative pb-2 pt-4">
          <Device />
          <Transition name="slide-l">
            <Platform />
          </Transition>
        </div>

      </div>
    </div>
    <!-- / Filters -->

    <GameList />

    <Counter />

    <Teleport to="#modal">

      <Overlay />

    </Teleport>

  </div>
</template>

<style>
  .slide-l-enter-active {
    transition: all 0.5s ease-in;
  }

  .slide-l-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-l-enter-to {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-l-leave-active {
    transition: all 0.5s ease-out;
  }

  .slide-l-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-l-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }
</style>