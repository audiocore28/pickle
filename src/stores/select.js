import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useGameStore } from '../stores/game';
import { useModalStore } from './modal';
import { useFlyToCart } from '../composables/useFlyToCart';
import Alert from '@/components/Alert.vue';

export const useSelectStore = defineStore('select', () => {
  const gameStore = useGameStore();
  const modalStore = useModalStore();
  const { flyToCart } = useFlyToCart();

  // --- State ---------------------------------------------

  const selected = ref([]);

  // --- Getters ---------------------------------------------

  const groupedSelection = computed(() => {

    return selected.value.reduce((accumulator, currentGame) => {
      const platform = currentGame.platform;

      if (gameStore.device.platforms.includes(platform)) {
        if (!accumulator.list[platform]) {
          accumulator.list[platform] = [];
        }

        accumulator.list[platform].unshift(currentGame);
        accumulator.count++;
      }

      return accumulator;

    }, {
      list: {},
      count: 0
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

      flyToCart(g.id, 'cart-icon');

      selected.value.push(g);
    }
  }

  function clearAll() {
    const isConfirmed = confirm("Are you sure you want to clear ALL selected games from the list?");
    
    if (isConfirmed) {
      selected.value = [];
    }
  }


  return {
    // state
    selected,
    //getters
    groupedSelection, groupedSize, freeSpace, percentage, percentageWidth, percentageColor,
    // actions
    toggleSelect, clearAll,
  }

}, {
  persist: {
    pick: ['selected'] // Specify only the fields you want to save to localStorage
  }
});

