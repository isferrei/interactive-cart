import $ from "jquery";
import { handleResize } from "../../../common/js/deviceDetection";
import regeneratorRuntime from "regenerator-runtime";

export default {
  exec: async function() {
    var whichDevice = null;
    function checkDevice() {
      whichDevice = handleResize();
    }

    $(document).ready(function() {
      function checkReadyYoutube() {
        if (typeof YT !== "undefined" && YT && YT.Player) {
          onYouTubeIframeAPIReady();
        } else {
          if (!window.YT) {
            var tag = document.createElement("script");
            tag.src = "https://youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          }
          setTimeout(checkReadyYoutube, 100);
        }
      }
      checkReadyYoutube();

      var allVideoPlayers;
      // get all youtube video divs
      function onYouTubeIframeAPIReady() {
        allVideoPlayers = $("div[id^='builder-yt-video']");
        if (allVideoPlayers.length > 0) {
          for (var i = 0; i < allVideoPlayers.length; i++) {
            var playflag = $(allVideoPlayers[i]).attr("data-playflag");
            var playerId = $(allVideoPlayers[i]).attr("id");
            createPlayer(allVideoPlayers[i], playflag, playerId);
          }
        }
      }
      // create a youtube player for each divs
      function createPlayer(videoPlayer, playflag, playerId) {
        var videoId = $(videoPlayer).attr("data-ytsrc");
        return new YT.Player($(videoPlayer)[0].id, {
          height: "100%",
          width: "100%",
          videoId: videoId,
          playerVars: {
            autoplay: playflag,
            controls: "0",
            rel: "0",
            autohide: "0",
            showinfo: "0",
            mode: "opaque",
            wmode: "transparent",
            modestbranding: "1",
            mute: playflag,
            enablejsapi: "1",
            iv_load_policy: "3",
            playlist: videoId,
            loop: "1"
          },
          events: {
            onReady: function(event) {
              triggerScrollWindow(event.target, playflag, playerId);
            }
          }
        });
      }
      // Pause video when not inside viewport.
      function triggerScrollWindow(playerObject, autoPlayFlag, playerId) {
        $(window).on("scroll", function() {
          checkDevice();
          // Pause video when not inside viewport.
          if (
            typeof playerObject == "object" &&
            playerObject &&
            playerId
          ) {
            pauseVideoIfNotInViewport(playerObject, autoPlayFlag, playerId);
          }
        });
      }
      // Helper function for pause video when not inside viewport.
      function pauseVideoIfNotInViewport(playerObject, autoPlayFlag, playerId) {
        if (!isInViewport(playerId)) {
          if (typeof playerObject == "object") {
            playerObject.pauseVideo();
          }
        } else {
          if (autoPlayFlag == "1") {
            var drawVideo = $("#" + playerId).closest(".bc-panel-draw-region");
            if (drawVideo.length > 0) {
              if (drawVideo.css("visibility") == "visible") {
                playerObject.playVideo();
              }
            } else {
              playerObject.playVideo();
            }
          }
        }
      }
      // Helper function for pause video when not inside viewport.
      function isInViewport(videoId) {
        var eTopAdd = 0;
        var eBotSub = 0;
        var vBotSub = 0;
        if (whichDevice.isDesktop || whichDevice.isWide) {
          eTopAdd = 800;
          eBotSub = 800;
        } else if (whichDevice.isTablet) {
          eTopAdd = 600;
          eBotSub = 850;
          vBotSub = 350;
        } else {
          eTopAdd = 300;
          eBotSub = 375;
          vBotSub = 100;
        }

        var scroll = window.scrollY || window.pageYOffset;

        var elementTop =
          document.getElementById(videoId).getBoundingClientRect().top +
          scroll +
          eTopAdd;
        var elementBottom =
          elementTop +
          document.getElementById(videoId).getBoundingClientRect().bottom -
          eBotSub;
        var viewportTop = scroll;
        var viewportBottom = scroll + window.innerHeight - vBotSub;

        return (
          (elementTop <= viewportBottom && elementTop >= viewportTop) ||
          (elementBottom <= viewportBottom && elementBottom >= viewportTop)
        );
      }
    });
  },

  terminateMethodCall: function() {
    $(window).off("scroll");
  }
};
