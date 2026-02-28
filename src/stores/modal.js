import { ref, shallowRef } from 'vue';
import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const component = shallowRef(null);
  const props = ref({ title: '', message: '' });

  function open(comp, compProps = {}) {
    component.value = comp;
    props.value = compProps;
    isOpen.value = true;

  }

  function close() {
    component.value = null;
    props.value = {};
    isOpen.value = false;

  }

  return {
    isOpen,
    component,
    props,
    open,
    close
  }

});

