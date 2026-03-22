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
        modalStore.open(Alert, { title: 'Not enough space!', message: `Adding ${g.name} (${g.size.toFixed(1)} GB) exceeds the ${device.assignedStorage.limit.toFixed(0)} GB limit.`})
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
      modalStore.open(Alert, { title: 'Download Complete!', message: 'Please send downloaded screenshot'})
    });
  };

  function setupDevice(dv) {
    device.unit = dv;

    if (dv === 'pc') {
      device.platforms = ['win', 'ps3', 'ps2'];
      device.assignedStorage = productStore.pcStorage; // get storage state
    } else if (dv === 'ps4') {
      device.platforms = ['ps4'];
      device.assignedStorage = productStore.ps4Storage;
    } else if (dv === 'nsw') {
      device.platforms = ['nsw'];
      device.assignedStorage = productStore.nswStorage;
    }

    platform.value = device.platforms[0];
  }

  const filteredGames = computed(() => {
    let filtered = [];

    filtered = games.value
        .filter(g => g.platform === platform.value)
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

  const groupedSelection = computed(() => {

    if (device.unit === 'pc' || device.unit === 'ps4' || device.unit === 'nsw') {
      return selected.value.reduce((accumulator, currentGame) => {
        const platform = currentGame.platform;

        if (device.platforms.includes(platform)) {
          if (!accumulator.list[platform]) {
            accumulator.list[platform] = [];
          }

          accumulator.list[platform].push(currentGame);
          accumulator.size += currentGame.size;
          accumulator.count++ ;
        }

        return accumulator;

      }, {
        list: {},
        size: 0,
        count: 0
      });
    }

  });

  const pcCount = computed(() => {

    const platforms = groupedSelection.value.list; // object
    let games = Object.values(platforms); // converted to array of arrays
    games = games.flat(); // merged arrays into 1 array
    
    return games.reduce((accumulator, currentGame) => {

      switch (currentGame.platform) {
        case 'win':
          accumulator.win = (accumulator.win || 0) + 1;
          break;
        case 'ps3':
          accumulator.ps3 = (accumulator.ps3 || 0) + 1;
          break;
        case 'ps2':
          accumulator.ps2 = (accumulator.ps2 || 0) + 1;
          break;
      
        default:
          break;
      }

      return accumulator;
    },{});

  });

  const progress = computed(() => (groupedSelection.value.size / device.assignedStorage.limit) * 100 );
  const freeSpace = computed(() => Math.max(0, device.assignedStorage.limit - groupedSelection.value.size ));

  // Styles
  const percentageWidth = computed(() => {
      return `${progress.value}%`;
  });

  const percentageColor = computed(() => {
    const clampedPercentage = Math.min(100, Math.max(0, progress.value));
    const hue = 120 - (clampedPercentage * 1.2); 
    return `hsl(${hue}, 100%, 40%)`;

  });

  const deviceColor = computed(() => {
    return {
      'bg-yellow-500 text-stone-600 hover:bg-yellow-400': device.unit === 'pc',
      'bg-violet-900 text-stone-200 hover:bg-violet-800': device.unit === 'ps4',
      'bg-rose-700 text-stone-200 hover:bg-rose-600': device.unit === 'nsw',
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

  return {
    pcCount,
    device,
    deviceColor,
    games,
    selected,
    search,
    platform,
    sortBy,
    toggleSelect,
    filteredGames,
    setupDevice,
    progress,
    freeSpace,
    percentageWidth,
    percentageColor,
    groupedSelection,
    clearAll,
    togglePlatform,
    captureContainer,
    captureElement,
    now,
    targetElementRef, 
  }

});
