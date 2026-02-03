<script setup>
import { ref, onMounted } from 'vue';

const games = ref([]);
const selected = ref([]);

function toggleSelect(i) {
  if (selected.value.includes(i)) {
    selected.value = selected.value.filter(s => s !== i);
  } else {
    selected.value.push(i);
  }
}

onMounted(async () => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxF12XlQz20IAuoy2NYYlwn4LGIGe61iKOcnrGZ6T3bY10aMpUxYSB0b_GvnYwPIsGZ/exec'); 
    const data = await response.json();
    games.value = data.games;
  } catch (error) {
    console.error('Error fetching games', error);
  }
});
</script>

<template>
  <div>
    <!-- Gamelists -->
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div v-if="games.length" class="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">

        <div v-for="(game, i) in games" :key="game.id" @click.prevent="toggleSelect(i)" class="rounded overflow-hidden shadow-lg">
          <a href="#"></a>
          <div class="relative">
            <a href="#">
                <img class="w-full" :src="game.image" alt="game image">
                <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            </a>
            <a href="#!">
              <div class="absolute bottom-0 left-0 bg-neutral-300 px-4 py-2 text-white text-sm hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">{{ game.platform }}</div>
            </a>
            <a href="!#">
              <div class="text-md absolute top-0 right-0 bg-neutral-300 px-4 text-white rounded-full h-16 w-16 flex flex-col items-center justify-center mt-3 mr-3" :class="{ selected : selected.includes(i) }">
                <span class="font-bold">{{ game.size }}</span>
                <small>GB</small>
              </div>
            </a>
          </div>

          <div class="px-6 py-4">
            <a href="#"class="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{{ game.name }}</a>
            <p class="text-gray-500 text-sm">suggestion specs info</p>
          </div>

        </div>

      </div>
      <div v-else>
        <div id="loading" style="text-align:center; font-size:18px; color:yellow; display:none;"></div>
        <img src="https://i.imgur.com/llF5iyg.gif" style="width:40px; height:40px;"><br/>
        Loading games... please wait.
      </div>
    </div>
    <!-- / Gamelists -->

  </div>
</template>

<style scoped>

.selected {
  background-color: green;
}

</style>