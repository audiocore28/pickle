
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { defineStore } from 'pinia';
import { useGameStore } from './game';

import DriveIcon from '../components/DriveIcon.vue';
import DS4ControllerIcon from '../components/DS4ControllerIcon.vue';
import XboxControllerIcon from '../components/XboxControllerIcon.vue';

export const useProductStore = defineStore('product', () => {

  const gameStore = useGameStore();
  const { driveCapacity, device } = storeToRefs(gameStore);

  const icons = {
    drive: DriveIcon,
    ds4Controller: DS4ControllerIcon,
    xboxController: XboxControllerIcon,
  };

  const storages = ref([
    {
      id: 1,
      icon: icons.drive,
      description: '2.5\" External Drive',
      devices: ['pc','ps4','nsw'],
      capacities: [
        {
          limit: 280,
          price: 1000,
          isAvailable: true
        },
        {
          limit: 440,
          price: 1300,
          isAvailable: true
        },
        {
          limit: 580,
          price: 1500,
          isAvailable: false
        },
        {
          limit: 680,
          price: 1800,
          isAvailable: false
        },
        {
          limit: 910,
          price: 2300,
          isAvailable: true
        },
        {
          limit: 1800,
          price: 3200,
          isAvailable: false
        },
        {
          limit: 3700,
          price: 6500,
          isAvailable: false
        },
      ],
      selectedCapacity: 440,
      selectedPrice: 1300 
    },
    {
      id: 2,
      icon: icons.drive,
      description: '3.5\" Internal Drive',
      devices: ['pc'],
      capacities: [
        {
          limit: 440,
          price: 900,
          isAvailable: true
        },
        {
          limit: 910,
          price: 1500,
          isAvailable: true
        },
      ],
      selectedCapacity: 0,
      selectedPrice: 0 
    },
    {
      id: 3,
      icon: icons.drive,
      description: 'Provide Your Own',
      devices: ['pc','ps4','nsw'],
      capacities: [
        {
          limit: 280,
          price: 1000,
          isAvailable: true
        },
        {
          limit: 440,
          price: 1300,
          isAvailable: true
        },
        {
          limit: 580,
          price: 1500,
          isAvailable: true
        },
        {
          limit: 680,
          price: 1800,
          isAvailable: true
        },
        {
          limit: 910,
          price: 2300,
          isAvailable: true
        },
        {
          limit: 1800,
          price: 3200,
          isAvailable: true
        },
        {
          limit: 3700,
          price: 6500,
          isAvailable: true
        },
      ],
      selectedCapacity: 0,
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


  const total = computed(() => accessories.value.reduce((sum, currentItem) =>  sum += (currentItem.price * currentItem.quantity), 0));
  const count = computed(() => accessories.value.reduce((sum, currentItem) =>  sum += currentItem.quantity, 0));


  function getNextHigherCapacity(storage) {
    storages.value.forEach(s => {
        if (s.id !== storage.id) {
          s.selectedCapacity = 0;
          s.selectedPrice = 0;
        }
    });

    const higherCapacities = storage.capacities.filter(size => size.limit > storage.selectedCapacity && size.isAvailable === true);
    
    if (higherCapacities.length > 0) { 
      const nextCapacity = higherCapacities.reduce((accumulator, current) => {
        return (current.limit < accumulator.limit) ? current : accumulator;
      }, higherCapacities[0]); 


      storage.selectedCapacity = nextCapacity.limit;
      storage.selectedPrice = nextCapacity.price;
    } 

    driveCapacity.value = storage.selectedCapacity;
  }

  function getNextLowerCapacity(storage) {
    if (storage.selectedCapacity === 0) {
      return;
    }
    
    storages.value.forEach(s => {
        if (s.id !== storage.id) {
          s.selectedCapacity = 0;
          s.selectedPrice = 0;
        }
    });

    const lowerCapacities = storage.capacities.filter(size => size.limit < storage.selectedCapacity && size.isAvailable === true);

    if (lowerCapacities.length > 0) { 
      const prevCapacity = lowerCapacities.reduce((accumulator, current) => {
        return (current.limit > accumulator.limit) ? current : accumulator;
      }, lowerCapacities[0]);


      storage.selectedCapacity = prevCapacity.limit;
      storage.selectedPrice = prevCapacity.price;
    }

    driveCapacity.value = storage.selectedCapacity;
  }

  function incrementQty(item) {
    item.quantity = Math.min(item.limit, item.quantity + 1);
  }

  function decrementQty(item) {
    item.quantity = Math.max(0, item.quantity - 1);
  }

  function formattedAmount(amount) {
    return amount.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
    });
  }

  return {
    icons,
    storages,
    accessories,
    total,
    count,
    formattedAmount,
    getNextHigherCapacity,
    getNextLowerCapacity,
    incrementQty,
    decrementQty
  }

});

