<script setup>
import { ref, computed, onMounted } from 'vue';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBDQML7oIs5nSLLaLeE33PjkLT8AQGJJ69x1zKzxyaEA5oyabWZ2rThbMuqHAsUGQAxg/exec';
const games = ref([]);
const selected = ref([]);
const search = ref('');
const platform = ref('switch');
const sort = ref('latest');
const total = ref(0);
const driveCapacity = ref(440);
const platforms = [
  {
    name: 'all',
    desc: 'All Platforms',
  },
  {
    name: 'pc',
    desc: 'PC Games',
  },
  {
    name: 'switch',
    desc: 'Switch Games',
  },
  {
    name: 'ps3',
    desc: 'PS3 Games',
  },
  {
    name: 'ps2',
    desc: 'PS2 Games',
  },
  {
    name: 'basic',
    desc: 'Basic / Low-End',
  },
  {
    name: '2p',
    desc: '2 Players',
  },
];

function toggleSelect(g) {
  if (selected.value.includes(g.id)) {
    selected.value = selected.value.filter(s => s !== g.id);
    total.value -= g.size;
  } else {
    selected.value.push(g.id);
    total.value += g.size;
  }
}

const filteredGames = computed(() => {
  let filtered = [];

  if (platform.value !== 'all') {
    filtered = games.value
      .filter(g => g.platform === platform.value)
      .filter(g => g.name.toLowerCase().includes(search.value));
  } else {
    filtered = games.value
      .filter(g => g.name.toLowerCase().includes(search.value));
  }

  switch (sort.value) {
    case 'latest':
      return filtered.sort((a, b) => b.id - a.id);
      break;
    case 'name':
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'sizeAsc':
      return filtered.sort((a, b) => a.size - b.size);
      break;
    case 'sizeDesc':
      return filtered.sort((a, b) => b.size - a.size);
      break;
  
    default:
      return filtered.sort((a, b) => b.id - a.id);
      break;
  }
});

const progress = computed(() => (total.value / driveCapacity.value) * 100 );
const freeSpace = computed(() => driveCapacity.value - total.value );

const progressStyle = computed(() => {
    return { 
      width: progress.value + "%" 
    };
});

onMounted(async () => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL); 
    const data = await response.json();
    games.value = data.games;
  } catch (error) {
    console.error('Error fetching games', error);
  }
});
</script>

<template>
  <div>

    <div class="bg-neutral-100 fixed top-0 w-full z-[2000] pb-2" >

      <!-- Search -->
      <div class="mx-auto flex w-full items-center justify-center py-2">
        <div class="relative">
          <input
            v-model="search"
            class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            type="text"
            placeholder="Search..."
          />
          <div class="absolute right-0 inset-y-0 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <div class="absolute left-0 inset-y-0 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <!-- / Search -->

      <!-- Platforms -->
      <div class="mx-auto flex items-center md:justify-center overflow-x-scroll space-x-2 p-4 text-xs uppercase whitespace-nowrap scroll-smooth">
        <button v-for="pf in platforms" @click.prevent="platform = pf.name" 
          :class="{
            'bg-neutral-300 text-white' : platform !== pf.name,
            'bg-green-200 text-green-600 font-semibold' : platform == pf.name,
          }"
          class="uppercase flex-shrink-0 px-2 py-2 rounded-full cursor-pointer hover:bg-neutral-600"
        >
          {{ pf.desc }}
        </button>
      </div>
      <!-- / Platforms -->

    </div>

    <!-- Gamelists -->
    <section class="bg-gray-200 mt-28 sm:mt-22">
      <div class="max-w-screen-2xl mx-auto p-5 sm:p-10 md:p-16">
      <!-- <div class="min-h-screen bg-gray-100 p-8"> -->
        <div v-if="games.length" class="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6">

          <div 
            v-for="game in filteredGames" :key="game.id" @click.prevent="toggleSelect(game)" 
            :class="{
              'bg-green-600 text-green-100' : selected.includes(game.id),
              'hover:text-green-600 transition duration-500 ease-in-out' : !selected.includes(game.id)
            }"
            class="rounded overflow-hidden shadow-lg"
          >
            <a href="#"></a>
            <div class="relative">
              <a href="#">
                  <img class="w-full" :src="game.image" alt="game image">
                  <div 
                    :class="{
                      'hover:bg-transparent transition duration-300 bg-gray-900 opacity-40' : !selected.includes(game.id)
                    }"
                    class="absolute bottom-0 top-0 right-0 left-0"></div>
              </a>
              <a href="#!">
                <div class="absolute bottom-0 left-0 bg-neutral-600 px-4 py-2 text-white text-sm">{{ game.platform }}</div>
              </a>
              <a href="!#">
                <div 
                  :class="{
                    'bg-green-600 text-green-100 text-sm h-16 w-16 px-2 transition duration-500 ease-in-out' : selected.includes(game.id),
                    'bg-neutral-700 text-white text-xs h-14 w-14 px-4 transition duration-500 ease-in-out' : !selected.includes(game.id)
                    }"
                  class="absolute top-0 right-0 rounded-full flex flex-col items-center justify-center mt-3 mr-3" 
                  >
                  <span class="font-bold">{{ game.size }}</span>
                  <small>GB</small>
                </div>
              </a>
            </div>

            <div class="px-3 py-3">
              <a href="#" class="font-semibold text-sm inline-block">{{ game.name }}</a>
              <p class="text-gray-500 text-xs">{{ game.note1 }}</p>
            </div>

          </div>

        </div>
        <div v-else>
          <div id="loading" style="text-align:center; font-size:18px; color:yellow; display:none;"></div>
          <img src="https://i.imgur.com/llF5iyg.gif" style="width:40px; height:40px;"><br/>
          Loading games... please wait.
        </div>
      </div>
    </section>
    <!-- / Gamelists -->

    <div class="fixed bottom-0 sm:p-6 w-full flex justify-center z-[2000]">
      <div class="bg-white bg-opacity-95 text-xs rounded-md fade w-full sm:w-[450px] show">
        <div class="sm:px-4 rounded border border-green-600">

          <!-- Progress Bar (Total Game Size) -->
          <div class="relative p-4 m-2 max-w-lg mx-auto">
            <div class="flex rounded-full h-2 bg-gray-200">
              <div 
                :style="progressStyle" class="rounded-full" 
                :class="{ 
                  'bg-green-500' : progress < 80,
                  'bg-yellow-500' : progress >= 80,
                }"
              >
              </div>
            </div>
            <div class="flex mt-4 items-center justify-between">
              <div>
                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  Total: {{ total }} GB
                </span>
              </div>
              <div class="text-right">
                <span class="text-xs inline-block text-neutral-300">
                  {{ `${freeSpace} GB free of ${driveCapacity} GB` }}
                </span>
              </div>
            </div>
          </div>
          <!-- / Progress Bar (Total Game Size) -->

        </div>
      </div>
    </div>

  </div>
</template>