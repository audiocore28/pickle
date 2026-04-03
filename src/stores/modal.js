import { ref, shallowRef, computed, onMounted, onUnmounted } from 'vue';
import { defineStore } from 'pinia';
import Device from '@/components/Device.vue';
import SelectedGames from '@/components/SelectedGames.vue';
import Products from '@/components/Products.vue';

export const useModalStore = defineStore('modal', () => {
  const toggleMenu = ref(false);
  const menuComponent = shallowRef(null);
  const toggleAlert = ref(false);
  const alertComponent = shallowRef(null);
  const alertProps = ref({ title: '', message: '' });
  const currentTab = ref('');
  const menuHeight = ref(470);
  const isDragging = ref(false);
  const startY = ref(0);

  function openMenu(comp, tab) {
    if (currentTab.value === tab) {
      closeMenu();
    } else {
      toggleMenu.value = true; // open
      menuComponent.value = comp;
      currentTab.value = tab;
      menuHeight.value = 470;
    } 
  }

  function closeMenu() {
    toggleMenu.value = false;
    currentTab.value = '';
    // menuComponent.value = null;
  }

  function openAlert(comp, compProps = {}) {
    alertComponent.value = comp;
    alertProps.value = compProps;
    toggleAlert.value = true;

  }

  function closeAlert() {
    alertProps.value = {};
    toggleAlert.value = false;
    // alertComponent.value = null;
  }

  const handleKeydown = (event) => {
    switch (event.key) {
      case 'a':
        event.preventDefault(); // Prevent default spacebar action (scrolling)
        openMenu(Device, 'device');
        break;
      case 's':
        event.preventDefault();
        openMenu(SelectedGames, 'list');
        break;
      case 'd':
        event.preventDefault();
        openMenu(Products, 'products');
        break;
      case 'Escape':
        event.preventDefault();
        closeMenu();
        closeAlert();
        break;
      case ' ':
        event.preventDefault();
        closeMenu();
        closeAlert();
        break;
    
      default:
        break;
    }
  }

  // Sets initial drag position and sheetContent height
  const dragStart = (e) => {
    // Clear any existing text selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    isDragging.value = true;
    startY.value = e.touches?.[0].pageY;
  }

  // Calculates the new height for the menu modal
  const dragging = (e) => {
    if (isDragging.value === false) {
      return; 
    }

    const delta = startY.value - e.touches?.[0].pageY;
    const newHeight = menuHeight.value + delta / window.innerHeight * 100;

    if (newHeight > 480) {
      dragStop();
    } 

    menuHeight.value = newHeight;
  }

  const dragStop = () => {
    isDragging.value = false;

    if (menuHeight.value < 300) {
      closeMenu();
    } else {
      menuHeight.value = 470;
    }
  }

  const contentHeight = computed(() => {
     return `${menuHeight.value}px`;
  });

  onMounted(async () => { 
    window.addEventListener('keydown', handleKeydown);
    document.addEventListener('touchend', dragStop);
  });

  onUnmounted(() => {  
    window.removeEventListener('keydown', handleKeydown) 
    document.addEventListener('touchend', dragStop);
  });

  return {
    currentTab,
    toggleMenu,
    menuComponent,
    openMenu,
    closeMenu,
    toggleAlert,
    alertComponent,
    alertProps,
    openAlert,
    closeAlert,
    menuHeight,
    contentHeight,
    dragStart,
    dragging,
    dragStop,
  }
});

