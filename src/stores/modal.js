import { ref, shallowRef, onMounted, onUnmounted } from 'vue';
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

  function openMenu(comp, tab) {
    menuComponent.value = comp;
    toggleMenu.value = true;
    currentTab.value = tab;
  }

  function closeMenu() {
    menuComponent.value = null;
    toggleMenu.value = false;
  }

  function openAlert(comp, compProps = {}) {
    alertComponent.value = comp;
    alertProps.value = compProps;
    toggleAlert.value = true;

  }

  function closeAlert() {
    alertComponent.value = null;
    alertProps.value = {};
    toggleAlert.value = false;
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
        toggleMenu.value = false;
        toggleAlert.value = false;
        currentTab.value = '';
        break;
      case ' ':
        event.preventDefault();
        toggleMenu.value = false;
        toggleAlert.value = false;
        currentTab.value = '';
        break;
    
      default:
        break;
    }
  }

  onMounted(async () => { window.addEventListener('keydown', handleKeydown) });
  onUnmounted(() => {  window.removeEventListener('keydown', handleKeydown) });

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
    closeAlert
  }
});

