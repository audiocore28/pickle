<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '../stores/game';

const store = useGameStore();
const { captureContainer, groupedSelection, groupedSize } = storeToRefs(store);

const now = new Date();
const timestamp = now.toLocaleString('en-US', {
  year: 'numeric', month: 'short', day: 'numeric',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hour12: true
});
</script>

<template>
  <div ref="captureContainer" class="absolute -top-[9999px] -left-[9999px] -z-1 w-[430px] cursor-pointer pointer-events-none my-auto p-2">
    <!-- <div class="watermark w-full">
      <img src="" alt="watermark">
       watermark
    </div> -->

    <div class="w-full py-2 cursor-default pointer-events-auto relative rounded-xl mx-auto max-w-sm">
      
      <!-- Header -->
      <span class="text-[8px] mx-auto flex items-center justify-center" style="color: #6c757d; ">{{ timestamp }}</span>
      <div class="text-sm uppercase font-semibold flex items-center justify-center justify-between mb-2">
          <span>{{ groupedSelection.count }} Games</span>
      </div>
      <div aria-hidden="true" class="border-b-2 p-2"></div>
      <!-- / Header -->
      
      <!-- Tab content -->
      <div class="rounded-md mb-4 mx-auto max-w-md">
        <div v-for="(group, groupName) in groupedSelection.list">
          <h2 class="text-xs font-semibold uppercase my-3">{{ groupName }}</h2>

          <ul>
            <li v-for="game in group" class="flex items-center justify-between border-b pb-3" style="border-bottom-color: #ddd; ">
              <div class="flex items-center">
                <span class="text-xs max-w-[360px] truncate py-2">{{ game.name }}</span>
              </div>

              <div class="flex items-center">
                <span class="text-xs text-left">{{ game.size.toFixed(1) }} GB</span>
              </div>
            </li>
          </ul>

        </div>
      </div>
      <!-- / Tab content -->
    
      <!-- Footer -->
      <div aria-hidden="true" class="border-t p-2"></div>
      <div class="text-sm uppercase font-semibold flex items-center justify-between mb-2">
          <span>Total Size:</span> 
          <span>{{ groupedSize.toFixed(1) }} GB</span>
      </div>
      <!-- Footer -->

    </div>
  </div>
</template>

<style scoped>
.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  font-size: 2rem;
  color: rgba(255, 0, 0, 0.5);
  pointer-events: none; /* Crucial: allows clicks to pass through */
  user-select: none;
}
</style>