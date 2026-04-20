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
  const games = shallowRef([]);
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
  const genreIndex = ref('all');
  const platform = ref('win');
  const sortBy = ref('A-Z');
  const minSize = ref(0);
  const maxSize = ref(50);
  const minGap = ref(10);
  const minPercent = ref(0);
  const maxPercent = ref(100);
  const now = ref(new Date());
  const togglePlatform = ref(true);
  const captureContainer = ref(null);
  const targetElementRef = ref(null);
  const minSizeRef = ref(null);


  function toggleSelect(g) {
    const index = selected.value.findIndex(s => s.id === g.id);

    if (index > -1) {
      selected.value.splice(index, 1);

    } else {
      if (groupedSize.value + g.size > device.assignedStorage.limit) {
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


  const genre = computed(() => {
    if (genreIndex.value !== 'all') {
      return filteredGenres.value[genreIndex.value];
    } else {
      return 'all';
    }
  });

  const filteredGenres = computed(() => {
    let filtered = [];

    filtered = groupedGames.value.list
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

  const filteredGames = computed(() => {
    let filtered = [];

    if (genreIndex.value !== 'all') {
      filtered = groupedGames.value.list
        .filter(g => g.size >= minSize.value && g.size <= maxSize.value)
        .filter(g => g.genres.includes(genre.value))
        .filter(g => g.name.toLowerCase().includes(search.value));
    } else {
      filtered = groupedGames.value.list
        .filter(g => g.size >= minSize.value && g.size <= maxSize.value)
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
          accumulator.groupCount++;
        }

        return accumulator;

      }, {
        list: {},
        count: {},
        groupCount: 0
      });
    }

  });

  const groupedSize = computed(() => {

    if (device.unit === 'pc' || device.unit === 'ps4' || device.unit === 'nsw') {
      return selected.value.reduce((accumulator, currentGame) => {

        if (device.platforms.includes(currentGame.platform)) {
          accumulator += currentGame.size;
        }

        return accumulator;
      },0);
    }

  });

  const freeSpace = computed(() => Math.max(0, device.assignedStorage.limit - groupedSize.value ));
  const percentage = computed(() => (groupedSize.value / device.assignedStorage.limit) * 100 );

  // Styles
  const percentageWidth = computed(() => {
      return `${percentage.value}%`;
  });

  const percentageColor = computed(() => {
    const clampedPercentage = Math.min(100, Math.max(0, percentage.value));
    const hue = 120 - (clampedPercentage * 1.2); 
    return `hsl(${hue}, 100%, 40%)`;
  });

  const rangeTrackStyles = computed(() => ({
    left: minPercent.value + "%",
    right: 100 - maxPercent.value + "%"
  }));


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
    minSize,
    maxSize,
    minGap,
    minPercent,
    maxPercent,
    toggleSelect,
    filteredGenres,
    filteredGames,
    selectDevice,
    updateRange,
    genre,
    percentage,
    freeSpace,
    percentageWidth,
    percentageColor,
    rangeTrackStyles,
    groupedGames,
    groupedSelection,
    groupedSize,
    clearAll,
    togglePlatform,
    captureContainer,
    captureElement,
    now,
    targetElementRef, 
    minSizeRef,
  }

}, {
  persist: {
    pick: ['games', 'selected', 'device'] // Specify only the fields you want to save to localStorage
  }
});