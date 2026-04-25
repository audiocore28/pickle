import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import html2canvas from 'html2canvas';
import { useGameStore } from '../stores/game';
import { useModalStore } from './modal';
import Alert from '@/components/Alert.vue';

export const useSelectStore = defineStore('select', () => {
  const gameStore = useGameStore();
  const modalStore = useModalStore();

  // --- State ---------------------------------------------
  const selected = ref([]);
  const now = ref(new Date());
  const captureContainer = ref(null);
  const targetElementRef = ref(null);

  // --- Getters ---------------------------------------------

  const groupedSelection = computed(() => {

    return selected.value.reduce((accumulator, currentGame) => {
      const platform = currentGame.platform;

      if (gameStore.device.platforms.includes(platform)) {
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

  });

  const groupedSize = computed(() => {

    return selected.value.reduce((accumulator, currentGame) => {

      if (gameStore.device.platforms.includes(currentGame.platform)) {
        accumulator += currentGame.size;
      }

      return accumulator;
    },0);

  });

  const freeSpace = computed(() => Math.max(0, gameStore.device.assignedStorage.limit - groupedSize.value ));
  const percentage = computed(() => (groupedSize.value / gameStore.device.assignedStorage.limit) * 100 );

  // Styles
  const percentageWidth = computed(() => {
      return `${percentage.value}%`;
  });

  const percentageColor = computed(() => {
    const clampedPercentage = Math.min(100, Math.max(0, percentage.value));
    const hue = 120 - (clampedPercentage * 1.2); 
    return `hsl(${hue}, 100%, 40%)`;
  });


  // --- Actions ---------------------------------------------

  function toggleSelect(g) {
    const index = selected.value.findIndex(s => s.id === g.id);

    if (index > -1) {
      selected.value.splice(index, 1);

    } else {
      if (groupedSize.value + g.size > gameStore.device.assignedStorage.limit) {
        modalStore.openAlert(Alert, { title: 'Not enough space!', message: `Adding ${g.name} (${g.size.toFixed(1)} GB) exceeds the ${gameStore.device.assignedStorage.limit.toFixed(0)} GB limit.`})
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


  return {
    // state
    selected, now, captureContainer, targetElementRef, 
    //getters
    groupedSelection, groupedSize, freeSpace, percentage, percentageWidth, percentageColor,
    // actions
    toggleSelect, clearAll, captureElement,
  }

}, {
  persist: {
    pick: ['selected'] // Specify only the fields you want to save to localStorage
  }
});

