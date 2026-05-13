<script setup>
import { ref, toRefs, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';
import { useSelectStore } from '../stores/select';
import GameDetail from '@/components/GameDetail.vue';
import GameDetailSkeleton from './GameDetailSkeleton.vue';

const gameStore = useGameStore();
const selectStore = useSelectStore();

const { device } = toRefs(gameStore);
const { games, filteredGames, highlightGames } = storeToRefs(gameStore);
const { selected } = storeToRefs(selectStore);

const scrollContainerRef = ref(null);
const isDragging = ref(false);
let startX, scrollLeft;

const startDragging = (e) => {
  isDragging.value = false;
  startX = e.pageX - scrollContainerRef.value.offsetLeft;
  scrollLeft = scrollContainerRef.value.scrollLeft;
  
  // Attach to window to handle dragging outside the element
  window.addEventListener('mousemove', mouseMoveHandler);
  window.addEventListener('mouseup', stopDragging);
};

const mouseMoveHandler = (e) => {
  isDragging.value = true;
  if (!isDragging.value) return;
  e.preventDefault();
  const x = e.pageX - scrollContainerRef.value.offsetLeft;
  const walk = (x - startX); // Adjust multiplier for scroll speed
  scrollContainerRef.value.scrollLeft = scrollLeft - walk;
};

const stopDragging = () => {
  setTimeout(() => {
    isDragging.value = false;
  }, 100);

  window.removeEventListener('mousemove', mouseMoveHandler);
  window.removeEventListener('mouseup', stopDragging);
};

function handleClick(game) {
  // prevent clicking when dragging
  if (isDragging.value) return;

  selectStore.toggleSelect(game);
}

function scrollToLeft() {
  scrollContainerRef.value.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
}

function scrollToRight() {
  scrollContainerRef.value.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
}

// Cleanup listeners if component is destroyed while dragging
onUnmounted(stopDragging);
</script>

<template>
  <div class="mb-12">
    <h3 class="font-display text-3xl font-bold text-stone-300 uppercase mt-2 mb-1 flex items-center gap-2">Highlights</h3>;
    
    <div class="relative">
      <button @click="scrollToLeft()" class="absolute left-0 top-0 bottom-2 w-10 z-20 flex items-center justify-center bg-transparent transition-opacity cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          :stroke="'#e7e5e4'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-left w-5 h-5 text-foreground"
        >
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </button>
      <button @click="scrollToRight()" class="absolute right-0 top-0 bottom-2 w-10 z-20 flex items-center justify-center bg-transparent transition-opacity cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          :stroke="'#e7e5e4'"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-chevron-right w-5 h-5 text-foreground"
        >
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>

      <!-- container -->
      <div 
        ref="scrollContainerRef" 
        @mousedown="startDragging($event)"
        class="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 cursor-grab [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scrollbar-hide select-none"
      >


        <!-- loop -->
        <div v-if="games.length" v-for="game in highlightGames" :key="game.id" class="flex-shrink-0 snap-start rounded-md overflow-hidden transition-all duration-200 bg-card/80 backdrop-blur-sm border w-[130px] sm:w-[140px] border-primary/20 hover:border-primary/40">
          <div class="relative aspect-[3/4] bg-muted cursor-pointer">
          
            <div class="relative cursor-pointer rounded overflow-hidden shadow-lg"
              @click.stop.prevent="handleClick(game)" 
              :class="{
                'bg-stone-500 text-stone-200' : selected.includes(game.id),
                'hover:text-stone-500 transition duration-500 ease-in-out' : !selected.includes(game.id)
              }"
            >
              <GameDetail :game="game" />
            </div>

          </div>
        </div>

        <div v-else v-for="n in 12" :key="n" class="flex-shrink-0 snap-start rounded-md overflow-hidden transition-all duration-200 backdrop-blur-sm w-[130px] sm:w-[140px]">
          <div class="relative aspect-[3/4] bg-muted cursor-pointer">
          
            <div 
              :class="{
                'h-40 md:h-45 bg-stone-500' : device.unit === 'ps4',
                'h-50 md:h-55 bg-stone-500' : device.unit === 'nsw',
              }"
              class="relative rounded overflow-hidden shadow-lg"
            >
              <GameDetailSkeleton />
            </div>

          </div>
        </div>
        <!-- / loop -->

      </div>
      <!-- / container -->

    </div>
  </div>
</template>