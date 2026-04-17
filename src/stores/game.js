import { ref, reactive, shallowRef, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import html2canvas from 'html2canvas';
import { useModalStore } from './modal';
import { useProductStore } from './product';
import Alert from '@/components/Alert.vue';

export const useGameStore = defineStore('game', () => {
  const modalStore = useModalStore();
  const productStore = useProductStore();

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBDQML7oIs5nSLLaLeE33PjkLT8AQGJJ69x1zKzxyaEA5oyabWZ2rThbMuqHAsUGQAxg/exec';
  const games = ref([]);
  const selected = ref([]);
  const device = reactive({
    unit: 'pc',
    platforms: ['win', 'ps3', 'ps2'],
    style: {
      color: '#eab308',
      textColor: 'text-stone-600',
      background: 'bg-yellow-500',

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
  const genreIndex = ref(0);
  const platform = ref('win');
  const sortBy = ref('A-Z');
  const now = ref(new Date());
  const togglePlatform = ref(true);
  const captureContainer = ref(null);
  const targetElementRef = ref(null);

  function toggleSelect(g) {
    if (selected.value.some(s => s.id === g.id)) {
      selected.value = selected.value.filter(s => s.id !== g.id);

    } else {
      if (groupedSelection.value.size + g.size > device.assignedStorage.limit) {
        modalStore.openAlert(Alert, { title: 'Not enough space!', message: `Adding ${g.name} (${g.size.toFixed(1)} GB) exceeds the ${device.assignedStorage.limit.toFixed(0)} GB limit.`})
        return;
      }

      flyToCart(document.getElementById(g.id));

      selected.value.push(g);
    }
  }

  const flyToCart = (startElement) => {
    const startRect = startElement.getBoundingClientRect();
    const targetRect = targetElementRef.value.getBoundingClientRect();

    // Create clone
    const clone = startElement.cloneNode(true);
    Object.assign(clone.style, {
      position: 'fixed',
      top: `${startRect.top}px`,
      left: `${startRect.left}px`,
      width: `${startRect.width}px`,
      height: `${startRect.height}px`,
      transition: 'all 0.5s ease-in-out',
      zIndex: 9999,
      cursor: 'pointer'
    });
    document.body.appendChild(clone);

    // Animate to cart
    requestAnimationFrame(() => {
      Object.assign(clone.style, {
        top: `${targetRect.top}px`,
        left: `${targetRect.left}px`,
        width: '20px',
        height: '20px',
        opacity: '0.5',
        cursor: 'pointer'
      });
    });

    // Cleanup
    setTimeout(() => clone.remove(), 500);
  };

  function clearAll() {
    const isConfirmed = confirm("Are you sure you want to clear ALL selected games from the list?");
    
    if (isConfirmed) {
      selected.value = [];
    }
  }

  const captureElement = async () => {
    // Capture using html2canvas
    html2canvas(captureContainer.value, {
      scale: 2, // Use a higher scale for better resolution
      useCORS: true,
      // Capture the element in its entirety
      width: captureContainer.value.offsetWidth,
      height: captureContainer.value.offsetHeight,
    }).then(canvas => {
      // Trigger Download (.jpeg format requested)
      const image = canvas.toDataURL('image/jpeg', 0.9); // JPEG format, 0.9 quality

      const link = document.createElement('a');
      link.download = `Gamelist_${now.value.getTime()}.jpeg`; 
      link.href = image;
      // Trigger download immediately
      link.click();
      
      // Show alert message
      modalStore.openAlert(Alert, { title: 'Download Complete!', message: 'Please send downloaded screenshot'})
    });
  };

  function selectDevice(dv) {
    device.unit = dv;

    if (dv === 'pc') {
      device.platforms = ['win', 'ps3', 'ps2'];
      device.style = {
        color: '#eab308',
        textColor: 'text-stone-600',
        background: 'bg-yellow-500',
      };
      device.assignedStorage = productStore.pcStorage; // get storage state
    } else if (dv === 'ps4') {
      device.platforms = ['ps4'];
      device.style = {
        color: '#4c1d95',
        textColor: 'text-stone-200',
        background: 'bg-violet-900',
      };
      device.assignedStorage = productStore.ps4Storage;
    } else if (dv === 'nsw') {
      device.platforms = ['nsw'];
      device.style = {
        color: '#be123c',
        textColor: 'text-stone-200',
        background: 'bg-rose-700',
      };
      device.assignedStorage = productStore.nswStorage;
    }

    platform.value = device.platforms[0];
  }

  const genre = computed(() => groupedGames.value.genres[genreIndex.value]); 

  const filteredGames = computed(() => {
    let filtered = [];

    filtered = groupedGames.value.list
        .filter(g => g.genres.includes(genre.value))
        .filter(g => g.name.toLowerCase().includes(search.value));

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

  const groupedGames = computed(() => {

    if (device.unit === 'pc' || device.unit === 'ps4' || device.unit === 'nsw') {

      return games.value.reduce((accumulator, currentGame) => {
        const platform = currentGame.platform;
        const categories = currentGame.genres.split(",").map(category => category.trim());

        if (device.platforms.includes(platform)) {
          accumulator.list.push(currentGame);
          accumulator.genres = [...new Set([...accumulator.genres, ...categories])]
            .filter(genre => genre !== '')
            .sort();
        }

        return accumulator;

      }, {
        list: [],
        genres: [],
      });

    }

  });

  const groupedSelection = computed(() => {

    if (device.unit === 'pc' || device.unit === 'ps4' || device.unit === 'nsw') {
      return selected.value.reduce((accumulator, currentGame) => {
        const platform = currentGame.platform;

        if (device.platforms.includes(platform)) {
          if (!accumulator.list[platform]) {
            accumulator.list[platform] = [];
          }

          if (!accumulator.count[platform]) {
            accumulator.count[platform] = [];
          }

          accumulator.list[platform].unshift(currentGame);
          accumulator.count[platform]++;
          accumulator.size += currentGame.size;
          accumulator.groupCount++;
        }

        return accumulator;

      }, {
        list: {},
        count: {},
        size: 0,
        groupCount: 0
      });
    }

  });

  const freeSpace = computed(() => Math.max(0, device.assignedStorage.limit - groupedSelection.value.size ));
  const percentage = computed(() => (groupedSelection.value.size / device.assignedStorage.limit) * 100 );

  // Styles
  const percentageWidth = computed(() => {
      return `${percentage.value}%`;
  });

  const percentageColor = computed(() => {
    const clampedPercentage = Math.min(100, Math.max(0, percentage.value));
    const hue = 120 - (clampedPercentage * 1.2); 
    return `hsl(${hue}, 100%, 40%)`;

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

  return {
    device,
    games,
    selected,
    search,
    platform,
    genreIndex,
    sortBy,
    toggleSelect,
    filteredGames,
    selectDevice,
    genre,
    percentage,
    freeSpace,
    percentageWidth,
    percentageColor,
    groupedGames,
    groupedSelection,
    clearAll,
    togglePlatform,
    captureContainer,
    captureElement,
    now,
    targetElementRef, 
  }

}, {
  persist: true // enables persistence for this store
});