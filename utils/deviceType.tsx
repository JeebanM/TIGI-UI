export const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

export const isMobile = (): boolean => {
    if (typeof navigator === "undefined") {
      return false;
    }
    const userAgent = navigator.userAgent || navigator.vendor;
  
    return /android|iPad|iPhone|iPod/i.test(userAgent);
  };
  
  export const isDesktop = (): boolean => {
    return !isMobile();
  };