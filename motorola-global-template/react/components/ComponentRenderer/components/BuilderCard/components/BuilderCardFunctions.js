import $ from "jquery";
// Get youtube video id.
let youTubeGetID = url => {
  var youtubeId = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    youtubeId = url[2].split(/[^0-9a-z_\-]/i);
    youtubeId = youtubeId[0];
  } else {
    youtubeId = url;
  }
  return youtubeId;
};
let drawOpenAnimate = scrollPosition => {
  scrollToPosition(scrollPosition - 60);
};
let drawCloseAnimate = scrollPosition => {
  scrollToPosition(scrollPosition - 60);
};
let scrollToPosition = scrollPosition => {
  $("html,body").animate({ scrollTop: scrollPosition }, "slow");
};
let isHTML = data => {
  return /<\/?[a-z][\s\S]*>/i.test(data);
};
export { youTubeGetID, drawOpenAnimate, drawCloseAnimate, isHTML };
