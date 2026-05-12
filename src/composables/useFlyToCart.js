export const useFlyToCart = () => {

  const flyToCart = (productElementId, cartElementId) => {
    const productImg = document.getElementById(productElementId).getBoundingClientRect();
    const cart = document.getElementById(cartElementId).getBoundingClientRect();

    if (!productImg || !cart) return;

    // Clone image
    const imgClone = document.getElementById(productElementId).cloneNode(true);
    Object.assign(imgClone.style, {
      position: 'fixed',
      top: `${productImg.top}px`,
      left: `${productImg.left}px`,
      width: `${productImg.width}px`,
      height: `${productImg.height}px`,
      transition: 'all 0.5s ease-in-out',
      zIndex: 9999,
      cursor: 'pointer'
    });

    document.body.appendChild(imgClone);

    // Animate to cart
    requestAnimationFrame(() => {
      Object.assign(imgClone.style, {
        top: `${cart.top}px`,
        left: `${cart.left}px`,
        width: '20px',
        height: '20px',
        opacity: '0.5',
        cursor: 'pointer'
      });
    });

    // Cleanup
    setTimeout(() => imgClone.remove(), 500);
  };

  return {
    flyToCart
  };
}