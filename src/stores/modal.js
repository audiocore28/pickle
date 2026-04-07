import { ref, shallowRef, computed, watch, onMounted, onUnmounted } from 'vue';
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
  const sheetHeight = ref(80);
  const maxHeight = 80;
  const isDragging = ref(false);

  function openMenu(comp, tab) {
    if (currentTab.value === tab) {
      closeMenu();
    } else {
      toggleMenu.value = true; // open
      menuComponent.value = comp;
      currentTab.value = tab;
      sheetHeight.value = maxHeight;
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
  }

  // Calculates the new height for the menu modal
  const onDrag = (e) => {
    if (isDragging.value === false) {
      return; 
    }

    const touchY = e.touches[0].clientY;
    const newHeight = ((window.innerHeight - touchY) / window.innerHeight) * 100;

    sheetHeight.value = newHeight;

  }

  const dragStop = () => {
    isDragging.value = false;

    if (sheetHeight.value < 60) {
      closeMenu();
    } else {
      sheetHeight.value = maxHeight;
    }
  }

  // Watch the modal's open state
  watch(() => toggleMenu.value, (value) => {
    if (value) {
      document.body.classList.add('overflow-hidden', 'md:overflow-visible');
    } else {
      document.body.classList.remove('overflow-hidden', 'md:overflow-visible');
    }
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
    sheetHeight,
    dragStart,
    onDrag,
    dragStop,
  }
});