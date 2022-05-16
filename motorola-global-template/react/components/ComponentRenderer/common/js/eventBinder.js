let windowResize = (fn) => {
  window.addEventListener('resize', fn);
}

export default {
  windowResize : windowResize
};