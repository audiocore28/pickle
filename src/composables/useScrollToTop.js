import { ref, onMounted, onUnmounted } from 'vue';

export  const useScrollToTop = () => {
  const isVisible = ref(false);

  const handleScroll = () => {
    isVisible.value = document.getElementById('contentArea').scrollTop > 300;
  }

  function scrollToTop() {
    document.getElementById('contentArea').scrollTo({ top: 0, behavior: 'smooth' });
  }

  onMounted(async () => { 
    document.getElementById('contentArea').addEventListener('scroll', handleScroll);
  });

  onUnmounted(() => {  
    document.getElementById('contentArea').removeEventListener('scroll', handleScroll);
  });

  return {
    isVisible,
    scrollToTop
  };
}