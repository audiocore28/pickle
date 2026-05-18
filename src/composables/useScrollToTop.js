import { ref, onMounted, onUnmounted } from 'vue';

export  const useScrollToTop = () => {
  const isVisible = ref(false);

  const handleScroll = () => {
    isVisible.value = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMounted(async () => { 
    window.addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {  
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    isVisible,
    scrollToTop
  };
}