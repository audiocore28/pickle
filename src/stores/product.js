import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { useGameStore } from './game';
import DriveIcon from '../components/DriveIcon.vue';
import DS4ControllerIcon from '../components/DS4ControllerIcon.vue';
import XboxControllerIcon from '../components/XboxControllerIcon.vue';

export const useProductStore = defineStore('product', () => {
  const gameStore = useGameStore();

  const icons = {
    drive: DriveIcon,
    ds4Controller: DS4ControllerIcon,
    xboxController: XboxControllerIcon,
  };

  const pcStorage = ref({
    id: 1,
    description: '2.5\" External Drive',
    size: 500,
    limit: 440,
    price: 1300,
    isAvailable: true
  });

  const ps4Storage = ref({
    id: 1,
    description: '2.5\" External Drive',
    size: 500,
    limit: 440,
    price: 1300,
    isAvailable: true
  });

  const nswStorage = ref({
    id: 1,
    description: '2.5\" External Drive',
    size: 500,
    limit: 440,
    price: 1300,
    isAvailable: true
  });

  const storages = reactive([
    {
      id: 1,
      icon: icons.drive,
      description: '2.5\" External Drive',
      devices: ['pc','ps4','nsw'],
      capacities: [
        {
          size: 320,
          limit: 280,
          price: 1000,
          isAvailable: true
        },
        {
          size: 500,
          limit: 440,
          price: 1300,
          isAvailable: true
        },
        {
          size: 640,
          limit: 580,
          price: 1500,
          isAvailable: false
        },
        {
          size: 750,
          limit: 680,
          price: 1800,
          isAvailable: false
        },
        {
          size: 1000,
          limit: 910,
          price: 2300,
          isAvailable: true
        },
        {
          size: 2000,
          limit: 1800,
          price: 3200,
          isAvailable: false
        },
        {
          size: 4000,
          limit: 3700,
          price: 6500,
          isAvailable: false
        },
      ]
    },
    {
      id: 2,
      icon: icons.drive,
      description: '3.5\" Internal Drive',
      devices: ['pc'],
      capacities: [
        {
          size: 500,
          limit: 440,
          price: 900,
          isAvailable: true
        },
        {
          size: 1000,
          limit: 910,
          price: 1500,
          isAvailable: true
        },
      ]
    },
    {
      id: 3,
      icon: icons.drive,
      description: 'Provide Your Own',
      devices: ['pc','ps4','nsw'],
      capacities: [
        {
          size: 320,
          limit: 280,
          price: 1000,
          isAvailable: true
        },
        {
          size: 500,
          limit: 440,
          price: 1300,
          isAvailable: true
        },
        {
          size: 640,
          limit: 580,
          price: 1500,
          isAvailable: true
        },
        {
          size: 750,
          limit: 680,
          price: 1800,
          isAvailable: true
        },
        {
          size: 1000,
          limit: 910,
          price: 2300,
          isAvailable: true
        },
        {
          size: 2000,
          limit: 1800,
          price: 3200,
          isAvailable: true
        },
        {
          size: 4000,
          limit: 3700,
          price: 6500,
          isAvailable: true
        },
      ]
    }
  ]); 

  const accessories = ref([
    {
      id: 1,
      icon: icons.ds4Controller,
      description: 'DS4 Wireless',
      price: 799,
      quantity: 0,
      limit: 2
    },
    {
      id: 2,
      icon: icons.xboxController,
      description: 'XBox Wired',
      price: 550,
      quantity: 0,
      limit: 2
    },
  ]); 


  const accessoriesTotalPrice = computed(() => accessories.value.reduce((sum, currentItem) =>  sum += (currentItem.price * currentItem.quantity), 0));
  const accessoriesTotalQty = computed(() => accessories.value.reduce((sum, currentItem) =>  sum += currentItem.quantity, 0));
  const totalPrice = computed(() => accessoriesTotalPrice.value + gameStore.device.assignedStorage.price);

  function getStorageSize(storageId) {
    if (gameStore.device.assignedStorage.id === storageId) {
      return formatSize(gameStore.device.assignedStorage.size);
    } else {
      return 0; 
    }
  }

  function updateDeviceStorage(selectedStorage) {
    gameStore.device.assignedStorage = selectedStorage;

    // save state
    if (gameStore.device.unit === 'pc') {
      pcStorage.value = selectedStorage;

    } else if (gameStore.device.unit === 'ps4') {
      ps4Storage.value = selectedStorage;

    } else if (gameStore.device.unit === 'nsw') {
      nswStorage.value = selectedStorage;
    }
  }

  function getNextHigherCapacity(storage) {
    let higherCapacities = [];

    if (storage.id === gameStore.device.assignedStorage.id) {
      higherCapacities = storage.capacities.filter(cap => cap.size > gameStore.device.assignedStorage.size && cap.size > gameStore.groupedSelection.size && cap.isAvailable === true);
    } else {
      higherCapacities = storage.capacities.filter(cap => cap.size > 0 && cap.size > gameStore.groupedSelection.size && cap.isAvailable === true);
    }
    
    if (higherCapacities.length > 0) { 
      const nextCapacity = higherCapacities.reduce((accumulator, current) => {
        return (current.size < accumulator.size) ? current : accumulator;
      }, higherCapacities[0]); 

      updateDeviceStorage({id: storage.id, description: storage.description, ...nextCapacity});
    } 
  }

  function getNextLowerCapacity(storage) {
    let lowerCapacities = [];

    if (storage.id === gameStore.device.assignedStorage.id) {
      lowerCapacities = storage.capacities.filter(cap => cap.size < gameStore.device.assignedStorage.size && cap.size > gameStore.groupedSelection.size && cap.isAvailable === true);
    } else {
      lowerCapacities = storage.capacities.filter(cap => cap.size < 0 && cap.size > gameStore.groupedSelection.size && cap.isAvailable === true);
    }


    if (lowerCapacities.length > 0) { 
      const prevCapacity = lowerCapacities.reduce((accumulator, current) => {
        return (current.size > accumulator.size) ? current : accumulator;
      }, lowerCapacities[0]);

      updateDeviceStorage({id: storage.id, description: storage.description, ...prevCapacity});
    }
  }

  function formatSize(sizeInGB) {
    if (sizeInGB >= 1000) {
      let tb = sizeInGB / 1000;

      return tb.toFixed(1).replace(/\.0$/, '') + ' TB';
    } else {
      return sizeInGB + ' GB';
    }
  }

  function formattedAmount(amount) {
    return amount.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
    });
  }

  function incrementQty(item) {
    item.quantity = Math.min(item.limit, item.quantity + 1);
  }

  function decrementQty(item) {
    item.quantity = Math.max(0, item.quantity - 1);
  }

  return {
    icons,
    pcStorage,
    ps4Storage,
    nswStorage,
    storages,
    accessories,
    accessoriesTotalPrice,
    accessoriesTotalQty,
    totalPrice,
    getStorageSize,
    updateDeviceStorage,
    getNextHigherCapacity,
    getNextLowerCapacity,
    formatSize,
    formattedAmount,
    incrementQty,
    decrementQty
  }

});