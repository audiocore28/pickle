<script setup>
import GameList from '@/components/GameList.vue';
import Counter from '@/components/Counter.vue';
import Platform from '@/components/Platform.vue';
import Search from '@/components/Search.vue';
import Sort from '@/components/Sort.vue';
import Overlay from './components/Overlay.vue';
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

        <Platform />
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