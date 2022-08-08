let device = {};

function handleResize() {
  device = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isWide: false,
    isPortrait: false,
    isLandscape: false
  };
  const { innerWidth } = window;

  if (innerWidth < 768) {
    device.isMobile = true;
  } else if (innerWidth < 992 && innerWidth >= 768) {
    device.isTablet = true;
  } else if (innerWidth < 1200 && innerWidth >= 992) {
    device.isDesktop = true;
  } else if (innerWidth >= 1200) {
    device.isWide = true;
  }

  return device;
}

let debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export { handleResize, debounce };
