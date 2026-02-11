import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', () => {

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBDQML7oIs5nSLLaLeE33PjkLT8AQGJJ69x1zKzxyaEA5oyabWZ2rThbMuqHAsUGQAxg/exec';
  const games = ref([]);
  const selected = ref([]);
  const search = ref('');
  const platform = ref('all');
  const sortBy = ref('A-Z');
  const sorts = ref(['New Add', 'A-Z', 'Size Asc', 'Size Desc']);
  const platforms = ref([
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
      desc: 'NSW Console',
    },
    {
      name: 'playstation3',
      desc: 'PS3 Console',
    },
    {
      name: 'playstation2',
      desc: 'PS2 Console',
    },
    {
      name: 'low-end',
      desc: 'Basic / Low-End',
    },
    {
      name: '2-players',
      desc: '2 Players',
    },
  ]);
  const total = ref(0);
  const driveCapacity = ref(440);

  const toggleSearch = ref(true);
  const toggleSort = ref(false);

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

    switch (sortBy.value) {
      case 'New Add':
        return filtered.sort((a, b) => b.id - a.id);
        break;
      case 'A-Z':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Size Asc':
        return filtered.sort((a, b) => a.size - b.size);
        break;
      case 'Size Desc':
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

  function scrollLeft() {
    const scrollContainer = document.getElementById('scrollContainer');

    scrollContainer.scrollBy({
      left: -150,
      behavior: 'smooth'
    });
  }

  function scrollRight() {
    const scrollContainer = document.getElementById('scrollContainer');

    scrollContainer.scrollBy({
      left: 150,
      behavior: 'smooth'
    });
  }

  onMounted(async () => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL); 
      const data = await response.json();
      games.value = data.games;
    } catch (error) {
      console.error('Error fetching games', error);
    }
  });

  return {
    games,
    selected,
    search,
    platform,
    sortBy,
    sorts,
    platforms,
    total,
    driveCapacity,
    toggleSearch,
    toggleSort,
    toggleSelect,
    filteredGames,
    progress,
    freeSpace,
    progressStyle,
    scrollLeft,
    scrollRight,
  }

});
