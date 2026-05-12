<script setup>
import { toRefs } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game';
import { useModalStore } from '@/stores/modal';
import GameList from '@/components/GameList.vue';
import Counter from '@/components/Counter.vue';
import Platform from '@/components/Platform.vue';
import Search from '@/components/Search.vue';
import Overlay from './components/Overlay.vue';
import Genre from './components/Genre.vue';
import MenuModal from '@/components/MenuModal.vue';
import Sidebar from '@/components/Sidebar.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';

const gameStore = useGameStore();
const modalStore = useModalStore();
const { toggleMenu } =  storeToRefs(modalStore);
const { device } = toRefs(gameStore);
</script>

<template>
  <div style="color: #1c1917" class="flex h-screen font-oswald">

    <Sidebar v-show="true" class="hidden lg:block"/>

    <!-- Content Area -->
    <div id="contentArea" class="w-full overflow-y-auto">
      <main>

        <!-- Filters -->
        <div class="bg-stone-900 sticky top-0 w-full z-[200] border border-b-stone-800 lg:hidden">
          <div class="max-w-screen-2xl mx-auto px-5 sm:px-10 md:px-16 2xl:px-28">
            <div class="lg:flex justify-between items-center max-w-screen-2xl lg:px-16 mx-auto">

              <div class="pt-2 flex justify-start items-center gap-1">
                <Search class="grow" />
                <button 
                  @click="gameStore.clearFilters" 
                  class="pl-3 pr-1 py-1.5 rounded-lg text-xs text-stone-400 transition-all whitespace-nowrap flex-shrink-0 font-inter capitalize cursor-pointer"
                >
                  <span class="flex justify-center items-center gap-2">
                    <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 15L21 21M21 15L15 21M10 21V14.6627C10 14.4182 10 14.2959 9.97237 14.1808C9.94787 14.0787 9.90747 13.9812 9.85264 13.8917C9.7908 13.7908 9.70432 13.7043 9.53137 13.5314L3.46863 7.46863C3.29568 7.29568 3.2092 7.2092 3.14736 7.10828C3.09253 7.01881 3.05213 6.92127 3.02763 6.81923C3 6.70414 3 6.58185 3 6.33726V4.6C3 4.03995 3 3.75992 3.10899 3.54601C3.20487 3.35785 3.35785 3.20487 3.54601 3.10899C3.75992 3 4.03995 3 4.6 3H19.4C19.9601 3 20.2401 3 20.454 3.10899C20.6422 3.20487 20.7951 3.35785 20.891 3.54601C21 3.75992 21 4.03995 21 4.6V6.33726C21 6.58185 21 6.70414 20.9724 6.81923C20.9479 6.92127 20.9075 7.01881 20.8526 7.10828C20.7908 7.2092 20.7043 7.29568 20.5314 7.46863L17 11" :stroke="device.style.color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    Reset
                  </span>
                </button>
              </div>
              <Genre />
              
              <div class="flex justify-center items-center rounded-lg relative pb-2 lg:pt-4">
                <Transition name="slide-l">
                  <Platform />
                </Transition>
              </div>

            </div>
          </div>
        </div>
        <!-- / Filters -->

        <Transition name="slide-y">
          <MenuModal v-if="toggleMenu"/>
        </Transition>

        <GameList />

        <Counter />

        <ScrollToTop />

        <Teleport to="#modal">

          <Overlay />

        </Teleport>

      </main>
    </div>
    <!-- / Content Area -->


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