import { ref, onMounted, onUnmounted } from 'vue';

export  const useSmartNav = () => {
  const isVisible = ref(true);
  const isAtBottom = ref(false);
  const lastScrollPosition = ref(0);

  const handleScroll = () => {
    const contentArea = document.getElementById('contentArea');
    const currentScrollPosition = contentArea.scrollTop;
     
    // Ignore small scrolls and negative values (iOS bounce)
    if (currentScrollPosition < 0) return;
    if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 100) return;
    
    isAtBottom.value = contentArea.clientHeight + contentArea.scrollTop >= contentArea.scrollHeight - 100; // Allow a small threshold

    // Hide if scrolling down, show if scrolling up / near top / at bottom
    isVisible.value = currentScrollPosition < lastScrollPosition.value || currentScrollPosition < 1000 || isAtBottom.value;

    lastScrollPosition.value = currentScrollPosition;
  }

  onMounted(() => document.getElementById('contentArea').addEventListener('scroll', handleScroll));
  onUnmounted(() => document.getElementById('contentArea').removeEventListener('scroll', handleScroll));

  return { isVisible };
}