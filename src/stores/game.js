import { ref, reactive, shallowRef, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { useProductStore } from './product';

export const useGameStore = defineStore('game', () => {
  const productStore = useProductStore();

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBDQML7oIs5nSLLaLeE33PjkLT8AQGJJ69x1zKzxyaEA5oyabWZ2rThbMuqHAsUGQAxg/exec';

  // --- State ---------------------------------------------
  const games = shallowRef([]);
  const device = reactive({
    unit: 'pc',
    platforms: ['win', 'ps3', 'ps2'],
    style: {
      color: '#0d9488',
      textColor: 'text-stone-200',
      background: 'bg-teal-800',
      gradient: 'bg-gradient-to-r from-teal-800/90 to-stone-900'
    },
    assignedStorage: {
      id: 1,
      description: '2.5\" External Drive',
      size: 500,
      limit: 440,
      price: 1300,
      isAvailable: true
    }
  });
  const search = ref('');
  const platform = ref('win');
  const genreIndex = ref('all');
  const sortBy = ref('Recently Added');
  const minSize = ref(0);
  const maxSize = ref(50);
  const minGap = ref(10);
  const minPercent = ref(0);
  const maxPercent = ref(100);
  const togglePlatform = ref(true);
  const minSizeRef = ref(null);

  // --- Getters ---------------------------------------------

  const groupedGames = computed(() => {

    return games.value.reduce((accumulator, currentGame) => {
      if (device.platforms.includes(currentGame.platform)) {
        accumulator.push(currentGame);
      }

      return accumulator;
    },[]); 

  });

  const filteredGames = computed(() => {
    let filtered = [];

    if (genreIndex.value !== 'all') {
      filtered = groupedGames.value
        .filter(g => g.size >= minSize.value && g.size <= maxSize.value)
        .filter(g => g.genres.includes(genre.value))
        .filter(g => g.name.toLowerCase().includes(search.value));
    } else {
      filtered = groupedGames.value
        .filter(g => g.size >= minSize.value && g.size <= maxSize.value)
        .filter(g => g.name.toLowerCase().includes(search.value));
    }

    switch (sortBy.value) {
      case 'Recently Added':
        return filtered.sort((a, b) => b.id - a.id);
        break;
      case 'Title (A-Z)':
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

  const filteredGenres = computed(() => {
    let filtered = [];

    filtered = groupedGames.value
      .filter(g => g.size >= minSize.value && g.size <= maxSize.value)
      .filter(g => g.name.toLowerCase().includes(search.value));

    return filtered.reduce((accumulator, currentGame) => {
      const categories = currentGame.genres.split(",").map(category => category.trim());

      accumulator = [...new Set([...accumulator, ...categories])]
        .filter(genre => genre !== '')
        .sort();

      return accumulator;
    }, []);

  });

  const genre = computed(() => {
    if (genreIndex.value !== 'all') {
      return filteredGenres.value[genreIndex.value];
    } else {
      return 'all';
    }
  });

  // Styles
  const rangeTrackStyles = computed(() => ({
    left: minPercent.value + "%",
    right: 100 - maxPercent.value + "%"
  }));

  // --- Actions ---------------------------------------------

  function selectDevice(dv) {
    device.unit = dv;

    // clear all filters
    search.value = '';
    genreIndex.value = 'all';
    sortBy.value = 'Recently Added';
    minSize.value = 0;
    maxSize.value = 50;

    updateRange(minSizeRef.value);

    if (dv === 'pc') {
      device.platforms = ['win', 'ps3', 'ps2'];
      device.style = {
        color: '#0d9488',
        textColor: 'text-stone-200',
        background: 'bg-teal-800',
        gradient: 'bg-gradient-to-r from-teal-800/90 to-stone-900'
      };
      device.assignedStorage = productStore.pcStorage; // get storage state
    } else if (dv === 'ps4') {
      device.platforms = ['ps4'];
      device.style = {
        color: '#a21caf',
        textColor: 'text-stone-200',
        background: 'bg-fuchsia-900',
        gradient: 'bg-gradient-to-r from-fuchsia-900/90 to-stone-900'
      };
      device.assignedStorage = productStore.ps4Storage;
    } else if (dv === 'nsw') {
      device.platforms = ['nsw'];
      device.style = {
        color: '#eab308',
        textColor: 'text-stone-600',
        background: 'bg-yellow-500',
        gradient: 'bg-gradient-to-r from-yellow-400/90 to-stone-900'
      };
      device.assignedStorage = productStore.nswStorage;
    }

    platform.value = device.platforms[0];
  }

  function updateRange(event) {
    // Ensure min & max have a gap of at least `minGap`
    if (maxSize.value - minSize.value < minGap.value) {
      if (event.target === minSizeRef.value) {
        minSize.value = maxSize.value - minGap.value;
      } else {
        maxSize.value = minSize.value + minGap.value;
      }
    }

    minPercent.value = (minSize.value / 50) * 100;
    maxPercent.value = (maxSize.value / 50) * 100;
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
    // state
    games, device, search, platform, genreIndex, sortBy, minSize, maxSize, minGap, minPercent, maxPercent, togglePlatform, minSizeRef,
    // getters
    groupedGames, filteredGames, filteredGenres, genre, rangeTrackStyles,
    // actions
    selectDevice, updateRange
  }

}, {
  persist: {
    pick: ['games', 'device'] // Specify only the fields you want to save to localStorage
  }
});