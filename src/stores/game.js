import { ref, shallowRef, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import html2canvas from 'html2canvas';
import { useModalStore } from './modal';
import Alert from '@/components/Alert.vue';

export const useGameStore = defineStore('game', () => {
  const modalStore = useModalStore();

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwBDQML7oIs5nSLLaLeE33PjkLT8AQGJJ69x1zKzxyaEA5oyabWZ2rThbMuqHAsUGQAxg/exec';
  const games = ref([]);
  const selected = ref([]);
  const search = ref('');
  const platform = ref('all');
  const sortBy = ref('A-Z');
  const total = ref(0);
  const driveCapacity = ref(440);
  const now = ref(new Date());
  const captureContainer = ref(null);

  function toggleSelect(g) {
    if (selected.value.includes(g.id)) {
      selected.value = selected.value.filter(s => s !== g.id);
      total.value -= g.size;
      total.value = Math.max(0, total.value);

    } else {
      if (total.value + g.size > driveCapacity.value) {
        modalStore.open(Alert, { title: 'Not enough space!', message: `Adding ${g.name} (${g.size.toFixed(1)} GB) exceeds the ${driveCapacity.value.toFixed(0)} GB limit.`})
        return;
      }

      flyToCart(document.getElementById(g.id));

      selected.value.push(g.id);
      total.value += g.size;
    }
  }

  const flyToCart = (startElement) => {
    const targetElement = document.getElementById('gameCount'); 
    const startRect = startElement.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

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
      total.value = 0;
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

  const groupedSelection = computed(() => {
    const g = selected.value.map(sid => {
      return games.value.find(g => g.id === sid)
    });
  
    return g.reduce((accumulator, currentGame) => {
      const platform = currentGame.platform;
      if (!accumulator[platform]) {
        accumulator[platform] = [];
      }
      accumulator[platform].push(currentGame);
      accumulator[platform].sort((a, b) => b.size - a.size);

      return accumulator;
    }, {});
  });

  const progress = computed(() => (total.value / driveCapacity.value) * 100 );
  const freeSpace = computed(() => Math.max(0, driveCapacity.value - total.value ));

  // Styles
  const percentageWidth = computed(() => {
      return `${progress.value}%`;
  });

  const percentageColor = computed(() => {
    const clampedPercentage = Math.min(100, Math.max(0, progress.value));
    const hue = 120 - (clampedPercentage * 1.2); 
    return `hsl(${hue}, 100%, 45%)`;

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
    games,
    selected,
    search,
    platform,
    sortBy,
    total,
    driveCapacity,
    toggleSelect,
    filteredGames,
    progress,
    freeSpace,
    percentageWidth,
    percentageColor,
    groupedSelection,
    clearAll,
    captureContainer,
    captureElement,
    now,
  }

});
