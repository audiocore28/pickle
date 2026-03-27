import { ref, shallowRef } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const toggleMenu = ref(false);
  const menuComponent = shallowRef(null);
  const toggleAlert = ref(false);
  const alertComponent = shallowRef(null);
  const alertProps = ref({ title: '', message: '' });

  function openMenu(comp) {
    menuComponent.value = comp;
    toggleMenu.value = true;
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

  return {
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

