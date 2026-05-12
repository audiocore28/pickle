import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
import html2canvas from 'html2canvas';
import Alert from '@/components/Alert.vue';

export function useCaptureElement() {
  const modalStore = useModalStore();

  const now = ref(new Date());

  const captureElement = async () => {
    const captureContainer = document.getElementById('listContainer');

    // Capture using html2canvas
    html2canvas(captureContainer, {
      scale: 2, // Use a higher scale for better resolution
      useCORS: true,
      // Capture the element in its entirety
      width: captureContainer.offsetWidth,
      height: captureContainer.offsetHeight,
    }).then(canvas => {
      // Trigger Download (.jpeg format requested)
      const image = canvas.toDataURL('image/jpeg', 0.9); // JPEG format, 0.9 quality

      const link = document.createElement('a');
      link.download = `Gamelist_${now.value.getTime()}.jpeg`; 
      link.href = image;
      // Trigger download immediately
      link.click();
      
      // Show alert message
      modalStore.openAlert(Alert, { title: 'Download Complete!', message: 'Please send downloaded screenshot'})
    });
  };

  return {
    captureElement
  };
}