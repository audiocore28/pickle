<script setup>
import GameList from '@/components/GameList.vue';
import Counter from '@/components/Counter.vue';
import Platform from '@/components/Platform.vue';
import Search from '@/components/Search.vue';
import Sort from '@/components/Sort.vue';
import Overlay from './components/Overlay.vue';
</script>

<template>
  <div>
    <!-- Filters -->
    <div class="bg-white fixed top-0 w-full z-[200] pb-2">
      <div class="flex justify-center items-center rounded-lg relative pb-2 pt-4">

        <Search />
        <Sort />

      </div>

      <Platform />

    </div>
    <!-- / Filters -->

    <GameList />

    <Counter />

    <Teleport to="#modal">

      <Overlay />

    </Teleport>

  </div>
</template>