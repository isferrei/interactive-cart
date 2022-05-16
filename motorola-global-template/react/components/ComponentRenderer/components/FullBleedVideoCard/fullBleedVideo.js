import $ from "jquery";

// Get youtube video id.
let youTubeGetID = url => {
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}

// Pause video when not inside viewport.
let triggerScrollWindow = (playerObject) => {
  $(window).on('scroll', () => {
    // Pause video when not inside viewport.
    if ((typeof playerObject == 'object') && playerObject && (typeof playerObject.a == 'object') && playerObject.a) {
      pauseVideoIfNotInViewport(playerObject);
    }
  });
}

// Helper function for pause video when not inside viewport.
let pauseVideoIfNotInViewport = (playerObject) => {
  if (!isInViewport(playerObject.a.id)) {
    if (typeof playerObject == 'object') {
      playerObject.pauseVideo();
    }
  }
}

// Helper function for pause video when not inside viewport.
let isInViewport = (videoId) => {
  let scroll = window.scrollY || window.pageYOffset;
  let elementTop = document.getElementById(videoId).getBoundingClientRect().top + scroll + 100;
  let elementBottom = elementTop + document.getElementById(videoId).getBoundingClientRect().bottom;
  let viewportTop = scroll;
  let viewportBottom = scroll + window.innerHeight;

  return (((elementTop <= viewportBottom) && (elementTop >= viewportTop)) || ((elementBottom <= viewportBottom) && (elementBottom >= viewportTop)));
 }

 // On state change of video (pause), perform css operations.
 let onStateChangeTrigger = (event) => {
  // When stopped.
  if (event.data == 0) {
    let parent = $(event.target.a).parents(".full-bleed-video-card");
    $(parent).find('.fbvc-background-image-wrapper').css('visibility', 'visible');
    $(parent).find('.fbvc-headline-text').css('display', 'block');
    $(parent).find('.fbvc-headline-wrapper .fbvc-header-logo-wrapper').css('display', 'block');
    $(parent).find('.fbvc-loader-spinner').css('display', 'none');
    $(parent).find('.fbvc-play-btn').css('display', 'block');
    $(parent).find('.fbvc-background-image-deafult').css('visibility', 'visible');
  }

  // When played.
  if (event.data == 1) {
    let parent = $(event.target.a).parents(".fbvc-content.fbvc-loaded");
    $(parent).find('.fbvc-play-btn').css('display', 'none');
  }

  // When paused.
  if (event.data == 2) {
    let parent = $(event.target.a).parents(".fbvc-content.fbvc-loaded");
    $(parent).find('.fbvc-play-btn').css('display', 'block');
  }
}

// Helper function to perform css operations
// on click of custom play button.
let performCssOperationsOnPlayIconClick = (currentElement) => {
  let parent = $(currentElement).parents(".full-bleed-video-card");
  $(parent).find('.fbvc-background-image-wrapper').css('visibility', 'hidden');
  $(parent).find('.fbvc-youtube-video').css('display', 'block');
  $(parent).find('.fbvc-headline-text').css('display', 'none');
  $(parent).find('.fbvc-headline-wrapper .fbvc-header-logo-wrapper').css('display', 'none');
  $(parent).find('.fbvc-loader-spinner').css('display', 'none');
  $(parent).find('.fbvc-play-btn').css('display', 'none');
  $(parent).find('.fbvc-background-image-deafult').css('visibility', 'hidden');
}

// Play video on click of custom play icon.
let playIconClick = (event, playerObject) => {
  performCssOperationsOnPlayIconClick(event.target);

  if ((typeof playerObject == 'object') && playerObject) {
    playerObject.playVideo();
  }
}

export { youTubeGetID, triggerScrollWindow, onStateChangeTrigger, playIconClick };
