import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import { useGameStore } from './game';
import { useSelectStore } from './select';
import driveIcon from '../assets/icons/drive.svg?raw';
import xboxControllerIcon from '../assets/icons/xboxController.svg?raw';
import ds4ControllerIcon from '../assets/icons/ds4Controller.svg?raw';

export const useProductStore = defineStore('product', () => {
  const gameStore = useGameStore();
  const selectStore = useSelectStore();

  const icons = {
    drive: driveIcon,
    ds4Controller: ds4ControllerIcon,
    xboxController: xboxControllerIcon,
  };

  // --- States ---------------------------------------------


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
          price: 0,
          isAvailable: true
        },
        {
          size: 500,
          limit: 440,
          price: 0,
          isAvailable: true
        },
        {
          size: 640,
          limit: 580,
          price: 0,
          isAvailable: true
        },
        {
          size: 750,
          limit: 680,
          price: 0,
          isAvailable: true
        },
        {
          size: 1000,
          limit: 910,
          price: 0,
          isAvailable: true
        },
        {
          size: 2000,
          limit: 1800,
          price: 0,
          isAvailable: true
        },
        {
          size: 4000,
          limit: 3700,
          price: 0,
          isAvailable: true
        },
      ]
    }
  ]); 

   const pcAccessories = ref([
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

   const ps4Accessories = ref([
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

   const nswAccessories = ref([
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

  // --- Getters ---------------------------------------------

  const accessoriesTotalPrice = computed(() => gameStore.device.assignedAccessories.reduce((sum, currentItem) =>  sum += (currentItem.price * currentItem.quantity), 0));

  const accessoriesTotalQty = computed(() => gameStore.device.assignedAccessories.reduce((sum, currentItem) =>  sum += currentItem.quantity, 0));

  const totalPrice = computed(() => {
    if (gameStore.device.assignedStorage.id === 3) {
      return accessoriesTotalPrice.value + selectStore.groupedSize;
    } else {
      return accessoriesTotalPrice.value + gameStore.device.assignedStorage.price;
    }
  });

  // --- Actions ---------------------------------------------

  function getStorageSize(storageId) {
    if (gameStore.device.assignedStorage.id === storageId) {
      return formatSize(gameStore.device.assignedStorage.size);
    } else {
      return 0; 
    }
  }

  function getStoragePrice(storageId) {
    if (gameStore.device.assignedStorage.id === storageId) {
      return formattedAmount(gameStore.device.assignedStorage.price);
    } else {
      return formattedAmount(0); 
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
      higherCapacities = storage.capacities.filter(cap => cap.limit > gameStore.device.assignedStorage.limit && cap.limit > selectStore.groupedSize && cap.isAvailable === true);
    } else {
      higherCapacities = storage.capacities.filter(cap => cap.limit > 0 && cap.limit > selectStore.groupedSize && cap.isAvailable === true);
    }
    
    if (higherCapacities.length > 0) { 
      const nextCapacity = higherCapacities.reduce((accumulator, current) => {
        return (current.limit < accumulator.limit) ? current : accumulator;
      }, higherCapacities[0]); 

      updateDeviceStorage({id: storage.id, description: storage.description, ...nextCapacity});
    } 
  }

  function getNextLowerCapacity(storage) {
    let lowerCapacities = [];

    if (storage.id === gameStore.device.assignedStorage.id) {
      lowerCapacities = storage.capacities.filter(cap => cap.limit < gameStore.device.assignedStorage.limit && cap.limit > selectStore.groupedSize && cap.isAvailable === true);
    } else {
      lowerCapacities = storage.capacities.filter(cap => cap.limit < 0 && cap.limit > selectStore.groupedSize && cap.isAvailable === true);
    }


    if (lowerCapacities.length > 0) { 
      const prevCapacity = lowerCapacities.reduce((accumulator, current) => {
        return (current.limit > accumulator.limit) ? current : accumulator;
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

  function updateDeviceAccessories(selectedAccessory) {
    let accessoryToUpdate = [];

    // save state
    if (gameStore.device.unit === 'pc') {
      accessoryToUpdate = pcAccessories.value.find(acc => acc.id === selectedAccessory.id);
    } else if (gameStore.device.unit === 'ps4') {
      accessoryToUpdate = ps4Accessories.value.find(acc => acc.id === selectedAccessory.id);
    } else if (gameStore.device.unit === 'nsw') {
      accessoryToUpdate = nswAccessories.value.find(acc => acc.id === selectedAccessory.id);
    }

    accessoryToUpdate.quantity = selectedAccessory.quantity;
  }

  function incrementQty(accessory) {
    accessory.quantity = Math.min(accessory.limit, accessory.quantity + 1);

    updateDeviceAccessories(accessory);
  }

  function decrementQty(accessory) {
    accessory.quantity = Math.max(0, accessory.quantity - 1);

    updateDeviceAccessories(accessory);
  }


  return {
    // states
    storages, pcStorage, ps4Storage, nswStorage, pcAccessories, ps4Accessories, nswAccessories,
    // getters
    accessoriesTotalPrice, accessoriesTotalQty, totalPrice,
    // actions
    getStorageSize, getStoragePrice, updateDeviceStorage, getNextHigherCapacity, getNextLowerCapacity,
    updateDeviceAccessories, incrementQty, decrementQty,
  }

}, {
  persist: ['pcAccessories', 'ps4Accessories', 'nswAccessories']
});