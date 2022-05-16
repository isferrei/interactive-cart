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

// Set text color for h5 & h6 tags.
let setTextColorForH5H6Tags = (descRef, device, props) => {
  (device.isMobile && props.mcedi_head_color_mobile) ?  $(descRef).find('h5').css('color', '#' + props.mcedi_head_color_mobile)
  : (device.isDesktop && props.mcedi_head_color_desktop) ? $(descRef).find('h5').css('color', '#' + props.mcedi_head_color_desktop)
  : (!device.isMobile && !device.isDesktop && props.mcedi_head_color_desktop) ? $(descRef).find('h5').css('color', '#' + props.mcedi_head_color_desktop)
  : $(descRef).find('h5').css('color', '#222C30');

  (device.isMobile && props.mcedi_text_color_mobile) ? $(descRef).find('h6').css('color', '#' + props.mcedi_text_color_mobile)
  : (device.isDesktop && props.mcedi_text_color_desktop) ? $(descRef).find('h6').css('color', '#' + props.mcedi_text_color_desktop)
  : props.mcedi_text_color_desktop ? $(descRef).find('h6').css('color', '#' + props.mcedi_text_color_desktop)
  : $(descRef).find('h6').css('color', '#222C30');
}

// Helper function to perform css operations
// on click of custom play button.
let performCssOperationsOnPlayIconClick = (currentElement) => {
  let parent = $(currentElement).parents(".mec-multi-editorial-column");
  $(parent).find('.mec-video-wrapper .mec-background-image').css('visibility', 'hidden');
  $(parent).find('.mec-video-wrapper iframe').css('display', 'block');
  $(parent).find('.mec-play-btn').css('display', 'none');
}

// Play video on click of custom play icon.
let playIconClick = (event, playerObject) => {
  performCssOperationsOnPlayIconClick(event.target);

  if ((typeof playerObject == 'object') && playerObject) {
    playerObject.playVideo();
  }
}

// On state change of video (pause), perform css operations.
let onStateChangeTrigger = (event) => {
  // When stopped.
  if (event.data == 0) {
    let parent = $(event.target.a).parents(".mec-multi-editorial-column");
    $(parent).find('.mec-video-wrapper .mec-background-image').css('visibility', 'visible');
    $(parent).find('.mec-play-btn').css('display', 'block');
    let imgHeight = $(parent).find('.mec-video-wrapper .mec-background-image').css("height");
    let imgHeightNumeric = imgHeight.split("px");
    $(parent).find('.mec-video-wrapper .mec-background-image').css("height", (imgHeightNumeric[0] - 4) + "px");
  }

  // When paused.
  if (event.data == 2) {
    let parent = $(event.target.a).parents(".mec-video");
    $(parent).find('.mec-play-btn').css('display', 'block');
  }
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
  let elementTop = document.getElementById(videoId).getBoundingClientRect().top + scroll;
  let elementBottom = elementTop + document.getElementById(videoId).getBoundingClientRect().bottom;
  let viewportTop = scroll;
  let viewportBottom = scroll + window.innerHeight;

  return (((elementTop <= viewportBottom) && (elementTop >= viewportTop)) || ((elementBottom <= viewportBottom) && (elementBottom >= viewportTop)));
 }

 // Setting background color.
 let setBackgroundColorForFourColCard = (colRef, count) => {
   if (count == 4) {
     let color = $(colRef).css("background-color");
     $(colRef).parents(".mec-multi-editorial-column.cols-4").css("background-color", color);
     $(colRef).css("background-color", "");
   }
 }

export { youTubeGetID, setTextColorForH5H6Tags, playIconClick, onStateChangeTrigger, triggerScrollWindow, setBackgroundColorForFourColCard };
