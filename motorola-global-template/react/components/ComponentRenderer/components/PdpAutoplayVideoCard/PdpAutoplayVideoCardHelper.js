// Helper function for pause video when not inside viewport.
let isInViewport = (videoId) => {
  let scroll = window.scrollY || window.pageYOffset;
  let elementTop = document.getElementById(videoId).getBoundingClientRect().top + scroll - 100;
  let elementBottom = elementTop + document.getElementById(videoId).getBoundingClientRect().bottom;
  let viewportTop = scroll;
  let viewportBottom = scroll + window.innerHeight;

  return (((elementTop <= viewportBottom) && (elementTop >= viewportTop)) || ((elementBottom <= viewportBottom) && (elementBottom >= viewportTop)));
}

export { isInViewport };