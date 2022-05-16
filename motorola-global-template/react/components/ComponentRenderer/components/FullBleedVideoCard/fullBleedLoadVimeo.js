import Player from "@vimeo/player";
import $ from "jquery";

export default {
  exec: async function() {
    window.fbvVimeoPlayers = [];

    $(document).ready(function() {
      loadVimeoPlayer();
      var allVideoPlayers;
      // get all video divs
      function loadVimeoPlayer() {
        allVideoPlayers = $("iframe[id^='vimeo-video']");
        if (allVideoPlayers.length > 0) {
          for (var i = 0; i < allVideoPlayers.length; i++) {
            var iframeVideo = allVideoPlayers[i];
            fbvVimeoPlayers[i] = createPlayer(iframeVideo);
          }
          triggerScroll(); // initializing scroll window
        }
      }
      function createPlayer(iframeVideoPlayer) {
        return new Player($(iframeVideoPlayer)[0].id);
      }
      // Pause video when not inside viewport.
      function triggerScrollWindow(playerObject, autoPlayFlag, playerId) {
        $(window).on("scroll", function() {
          // Pause video when not inside viewport.
          if (typeof playerObject == "object" && playerObject && playerId) {
            pauseVideoIfNotInViewport(playerObject, autoPlayFlag);
          }
        });
      }
      // Helper function for pause video when not inside viewport.
      function pauseVideoIfNotInViewport(playerObject, autoPlayFlag) {
        var playerId = $(playerObject.element)[0].id;
        if (!isInViewport(playerId)) {
          if (typeof playerObject == "object") {
            playerObject.pause()
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
        } else {
          if (autoPlayFlag == 1) {
            var drawVideo = $("#" + playerId).closest(".bc-panel-draw-region");
            if (drawVideo.length > 0) {
              if (drawVideo.css("visibility") == "visible") {
                if (typeof playerObject == "object") {
                  playerObject.play()
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
            } else {
              if (typeof playerObject == "object") {
                playerObject.play()
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
        }
      }
      // Helper function for pause video when not inside viewport.
      function isInViewport(videoId) {
        let scroll = window.scrollY || window.pageYOffset;
        let elementTop =
          document.getElementById(videoId).getBoundingClientRect().top +
          scroll +
          100;
        let elementBottom =
          elementTop +
          document.getElementById(videoId).getBoundingClientRect().bottom;
        let viewportTop = scroll;
        let viewportBottom = scroll + window.innerHeight;

        return (
          (elementTop <= viewportBottom && elementTop >= viewportTop) ||
          (elementBottom <= viewportBottom && elementBottom >= viewportTop)
        );
      }
      function triggerScroll() {
        fbvVimeoPlayers.forEach(function(player) {
          var playflag = player.element.getAttribute("data-playflag");
          var playerId = player.element.getAttribute("id");
          triggerScrollWindow(player, playflag, playerId);
        });
      }
    });
  },
  terminateMethodCall: function() {
    $(window).off("scroll");
  }
};
