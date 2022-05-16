import Player from "@vimeo/player";
import $ from "jquery";

export default {
  exec: async function() {
    window.mecVimeoPlayers = [];

    $(document).ready(function() {
      loadVimeoPlayer();
      var allVideoPlayers;
      // get all video divs
      function loadVimeoPlayer() {
        allVideoPlayers = $("iframe[id^='mec-vimeo-video']");
        if (allVideoPlayers.length > 0) {
          for (var i = 0; i < allVideoPlayers.length; i++) {
            var iframeVideo = allVideoPlayers[i];
            mecVimeoPlayers[i] = createPlayer(iframeVideo);
          }
          triggerScroll(); // initializing scroll window
        }
      }
      function createPlayer(iframeVideoPlayer) {
        return new Player($(iframeVideoPlayer)[0].id);
      }
      // Pause video when not inside viewport.
      function triggerScrollWindow(playerObject) {
        $(window).on("scroll", function() {
          // Pause video when not inside viewport.
          if (typeof playerObject == "object" && playerObject) {
            pauseVideoIfNotInViewport(playerObject);
          }
        });
      }
      // Helper function for pause video when not inside viewport.
      function pauseVideoIfNotInViewport(playerObject) {
        var videoId = $(playerObject.element)[0].id;
        if (!isInViewport(videoId)) {
          if (typeof playerObject == "object") {
            playerObject
              .pause()
              .then(function() {
                // The video is pause
              })
              .catch(function(error) {
                switch (error.name) {
                  case "PasswordError":
                    // The video is password-protected
                    break;

                  case "PrivacyError":
                    // The video is private
                    break;

                  default:
                    // Some other error occurred
                    break;
                }
              });
          }
        }
      }
      // Helper function for pause video when not inside viewport.
      function isInViewport(videoId) {        
        let scroll = window.scrollY || window.pageYOffset;
        let elementTop =
          document.getElementById(videoId).getBoundingClientRect().top +
          scroll-300;
        let elementBottom =
          elementTop +
          document.getElementById(videoId).getBoundingClientRect().bottom;
        let viewportTop = scroll;
        let viewportBottom = scroll + window.innerHeight+200;

        return (
          (elementTop <= viewportBottom && elementTop >= viewportTop) ||
          (elementBottom <= viewportBottom && elementBottom >= viewportTop)
        );
      }
      function triggerScroll() {
        mecVimeoPlayers.forEach(function(player) {
          triggerScrollWindow(player);
        });
      }
    });
  }
};
