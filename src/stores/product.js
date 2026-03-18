import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import DriveIcon from '../components/DriveIcon.vue';
import DS4ControllerIcon from '../components/DS4ControllerIcon.vue';
import XboxControllerIcon from '../components/XboxControllerIcon.vue';

export const useProductStore = defineStore('product', () => {

  const icons = {
    drive: DriveIcon,
    ds4Controller: DS4ControllerIcon,
    xboxController: XboxControllerIcon,
  };

  const selectedStorage = ref(
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
      ],
      selectedSize: 500, // default storage
      selectedLimit: 440,
      selectedPrice: 1300 
    }
  );

  const storages = ref([
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
      ],
      selectedSize: 500, // default storage
      selectedLimit: 440,
      selectedPrice: 1300 
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
      ],
      selectedSize: 0,
      selectedLimit: 0,
      selectedPrice: 0 
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
      ],
      selectedSize: 0,
      selectedLimit: 0,
      selectedPrice: 0 
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
  const totalPrice = computed(() => accessoriesTotalPrice.value + selectedStorage.value.selectedPrice);


  function getNextHigherCapacity(storage) {
    storages.value.forEach(s => {
        if (s.id !== storage.id) {
          s.selectedSize = 0;
          s.selectedLimit = 0;
          s.selectedPrice = 0;
        }
    });

    const higherCapacities = storage.capacities.filter(cap => cap.size > storage.selectedSize && cap.isAvailable === true);
    
    if (higherCapacities.length > 0) { 
      const nextCapacity = higherCapacities.reduce((accumulator, current) => {
        return (current.size < accumulator.size) ? current : accumulator;
      }, higherCapacities[0]); 


      storage.selectedSize = nextCapacity.size;
      storage.selectedLimit = nextCapacity.limit;
      storage.selectedPrice = nextCapacity.price;
    } 

    selectedStorage.value = storage;
  }

  function getNextLowerCapacity(storage) {
    if (storage.selectedSize === 0) {
      return;
    }
    
    storages.value.forEach(s => {
        if (s.id !== storage.id) {
          s.selectedSize = 0;
          s.selectedLimit = 0;
          s.selectedPrice = 0;
        }
    });

    const lowerCapacities = storage.capacities.filter(cap => cap.size < storage.selectedSize && cap.isAvailable === true);

    if (lowerCapacities.length > 0) { 
      const prevCapacity = lowerCapacities.reduce((accumulator, current) => {
        return (current.size > accumulator.size) ? current : accumulator;
      }, lowerCapacities[0]);


      storage.selectedSize = prevCapacity.size;
      storage.selectedLimit = prevCapacity.limit;
      storage.selectedPrice = prevCapacity.price;
    }

    selectedStorage.value = storage;
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
    selectedStorage,
    storages,
    accessories,
    accessoriesTotalPrice,
    accessoriesTotalQty,
    totalPrice,
    getNextHigherCapacity,
    getNextLowerCapacity,
    formatSize,
    formattedAmount,
    incrementQty,
    decrementQty
  }

});

