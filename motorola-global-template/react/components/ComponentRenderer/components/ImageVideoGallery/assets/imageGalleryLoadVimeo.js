import Player from "@vimeo/player";
import $ from "jquery";
import { handleResize } from "../../../common/js/deviceDetection";

export default {
  exec: async function() {
    var whichDevice = null;
    function checkDevice() {
      whichDevice = handleResize();
    }
    window.ivgVimeoPlayers = [];

    $(document).ready(function() {
      loadVimeoPlayer();
      var allVideoPlayers;
      // get all video divs
      function loadVimeoPlayer() {
        allVideoPlayers = $("iframe[id^='ivg-vimeo-video']");
        if (allVideoPlayers.length > 0) {
          for (var i = 0; i < allVideoPlayers.length; i++) {
            var iframeVideo = allVideoPlayers[i];
            ivgVimeoPlayers[i] = createPlayer(iframeVideo);
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
          checkDevice();
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
        var eTopAdd = 0;
        var eBotSub = 0;
        var vBotSub = 0;
        if (whichDevice.isDesktop || whichDevice.isWide) {
          eTopAdd = 200;
          eBotSub = 200;
          vBotSub = 100;
        } else if (whichDevice.isTablet) {
          eTopAdd = 100;
          eBotSub = 200;
          vBotSub = 50;
        } else {
          eTopAdd = 0;
          eBotSub = 100;
          vBotSub = 100;
        }
        let scroll = window.scrollY || window.pageYOffset;
        let elementTop =
          document.getElementById(videoId).getBoundingClientRect().top +
          scroll +
          eTopAdd;
        let elementBottom =
          elementTop +
          document.getElementById(videoId).getBoundingClientRect().bottom -
          eBotSub;
        let viewportTop = scroll;
        let viewportBottom = scroll + window.innerHeight - vBotSub;

        return (
          (elementTop <= viewportBottom && elementTop >= viewportTop) ||
          (elementBottom <= viewportBottom && elementBottom >= viewportTop)
        );
      }
      function triggerScroll() {
        ivgVimeoPlayers.forEach(function(player) {
          triggerScrollWindow(player);
        });
      }

      // pause video on click arrows and dots.
      $(document).on("click", ".slick-arrow, .slick-dots li", function() {
        if (typeof ivgVimeoPlayers !== "undefined" && ivgVimeoPlayers.length) {
          ivgVimeoPlayers.forEach(function(player) {
            player
              .pause()
              .then(function() {
                // The video is paused
              })
              .catch(function(error) {
                //console.log(error.name);
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
          });
        }
      });
    });
  }
};
