import $ from "jquery";

export default {
  exec: async function() {
    $(document).ready(function() {
      if (navigator.platform !== "iPhone" && navigator.platform !== "iPad") {
        $(this).on("click", ".slick-active .ivg-container", openFullScreenMode);
        $(".ivg-close-icon").on("click", closeFullScreenMode);
      } else {
        $.each($(".ivg-container"), function() {
          let video = $(this).siblings(".ivg-video");
          if (video.length <= 0) {
            $(this)
              .off("click", openFullScreenMode)
              .on("click", openFullScreenMode);
            $(".ivg-close-icon")
              .off("click", closeFullScreenMode)
              .on("click", closeFullScreenMode);
          } else {
            $(this)
              .off("click", iphoneVideoPlay)
              .on("click", iphoneVideoPlay);
          }
        });
      }

      $(this).on("click", ".slick-slide:not(.slick-active)", function(e) {
        e && e.stopImmediatePropagation();

        if (navigator.platform === "iPad") {
          $.each($(".ivg-video"), function() {
            let ytId = parseYoutubeId($(this).attr("data-ytsrc"));
            let ytUrl =
              "https://www.youtube.com/embed/" +
              ytId +
              "?controls=1&mode=opaque&rel=0&autohide=1&showinfo=1&wmode=transparent&modestbranding=1&loop=1" +
              "&mute=0&enablejsapi=1&iv_load_policy=3&playlist=" +
              ytId +
              "&origin=https://" +
              document.location.host;
            $(this).attr("src", "");
            $(this).attr("src", ytUrl);
          });
        }
      });

      function parseYoutubeId(url) {
        let ytId = url.match(
          /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
        );
        return ytId != null ? ytId[1] : url;
      }

      function setOnDebounceResize(action) {
        let resizeTimer;
        $(window).on("resize.fullscreenmode", function(e) {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(action, 150);
        });
      }

      function callPlayer(frame_id, func, args) {
        if (window.jQuery && frame_id instanceof jQuery)
          frame_id = frame_id.get(0).id;
        let iframe = document.getElementById(frame_id);
        if (iframe && iframe.tagName.toUpperCase() != "IFRAME") {
          iframe = iframe.getElementsByTagName("iframe")[0];
        }
        if (iframe) {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: func,
              args: args || [],
              id: frame_id
            }),
            "*"
          );
        }
      }

      function openFullScreenMode(e) {
        e && e.preventDefault();
        e.stopImmediatePropagation();
        let carousel = document.querySelector(".ivg-carousel");
        let isMobile = window.innerWidth <= 768;
        let video = $(this).siblings(".ivg-video");

        if (video.length > 0) {
          let ytId = parseYoutubeId(video.attr("data-ytsrc"));
          let ytUrl =
            "https://www.youtube.com/embed/" +
            ytId +
            "?controls=0&autoplay=1&mode=opaque&rel=0&autohide=1&showinfo=1&wmode=transparent&modestbranding=1&loop=1" +
            "&mute=0&enablejsapi=1&iv_load_policy=3&playlist=" +
            ytId +
            "&origin=https://" +
            document.location.host;

          let fullScreen = $(this)
            .parents(".image-video-gallery")
            .find(".ivg-fullscreen");

          video = video.clone(true);
          video.attr("src", ytUrl);
          video.attr("id", ytId + "-full");
          video.on("load", function() {
            callPlayer(ytId + "-full", "playVideo");
          });
          video.attr("allow", "autoplay");
          fullScreen.prepend(video);
          fullScreen.fadeIn(1000, function() {
            callPlayer(ytId + "-full", "playVideo");
          });

          $(".main-header-container").css("z-index", "0");
          setOnDebounceResize(function() {
            $(".main-header-container").css("z-index", "0");
          });
        } else if (isMobile) {
          let image = $(this);

          setOnDebounceResize(updateImageAspectRatio);
          updateImageAspectRatio();

          $(this)
            .parents(".image-video-gallery")
            .find(".ivg-fullscreen")
            .css(
              "background-image",
              "url(" + image.children().attr("src") + ")"
            )
            .fadeIn("2000ms");

          function updateImageAspectRatio() {
            let windowAspectRatio =
              $(window).innerWidth() / $(window).innerHeight();
            let imageAspectRatio = image.outerWidth() / image.outerHeight();

            $(this)
              .parents(".image-video-gallery")
              .find(".ivg-fullscreen")
              .css(
                "background-size",
                windowAspectRatio >= imageAspectRatio
                  ? "auto 100%"
                  : "100% auto"
              );
            $(".main-header-container").css("z-index", "0");
            $("html, body").addClass("scroll-lock");
          }
        }
      }

      function iphoneVideoPlay(e) {
        e && e.preventDefault();

        let video = $(this).siblings(".ivg-video");

        if (video.length > 0) {
          let ytId = parseYoutubeId(video.attr("data-ytsrc"));
          let ytUrl =
            "https://www.youtube.com/embed/" +
            ytId +
            "?controls=1&mode=opaque&rel=0&autohide=1&showinfo=1&wmode=transparent&modestbranding=1&loop=1" +
            "&mute=0&enablejsapi=1&iv_load_policy=3&playlist=" +
            ytId +
            "&origin=https://" +
            document.location.host;
          video.attr("src", ytUrl);
          video.attr("id", ytId);
          $("#" + ytId).css(
            "width",
            $(this)
              .children("img")
              .innerWidth() + "px"
          );
          $("#" + ytId).css(
            "height",
            $(this)
              .children("img")
              .innerHeight() + "px"
          );
          $("#" + ytId).show();
          $(this).hide();
        }
      }

      function closeFullScreenMode(e) {
        e.preventDefault();
        $("#navbar").removeAttr("style");
        $(this)
          .parent()
          .removeAttr("style");
        $(this)
          .parent()
          .fadeOut("1000ms")
          .find(".ivg-video")
          .remove();
        $(window).off("resize.fullscreenmode");
        $("html, body").removeClass("scroll-lock");
      }
    });
  },
  setCarouselArrowHeight(dynHeight, imgFlag, device) {
    var $btn = $(".image-video-gallery").find(".slick-arrow");
    dynHeight = `height:${dynHeight}px !important`;
    $btn.css({ cssText: dynHeight });
    if (imgFlag) {
      if ($(".ivg-vimeo-wrapper").length) {
        var $vimeoWrapper = $(".ivg-vimeo-wrapper");
        $vimeoWrapper.css({ cssText: dynHeight });
      }
    } else {
      if ($(".ivg-vimeo-wrapper").length) {
        // for vimeo wrapper height
        var $vimeoWrapper = $(".ivg-vimeo-wrapper");
        var Fixedheight = "500";
        if (device.isDesktop) {
          Fixedheight = "500";
        }
        if (device.isWide) {
          Fixedheight = "500";
        }
        if (device.isTablet) {
          Fixedheight = "300";
        }
        if (device.isMobile) {
          Fixedheight = "250";
        }
        Fixedheight = `height:${Fixedheight}px !important`;
        $vimeoWrapper.css({ cssText: Fixedheight });
        // for arrow height
        $btn.css({ cssText: Fixedheight });
      }
    }
  },
  adjustBtnCarousel(imgFlag, device) {
    var $btn = $(".image-video-gallery").find(".slick-arrow");
    let height = $(".image-video-gallery")
      .find(".ivg-container > img")
      .eq(0)
      .height();
    height = `height:${height}px !important`;
    $btn.css({ cssText: height });
    if (imgFlag) {
      if ($(".ivg-vimeo-wrapper").length) {
        var $vimeoWrapper = $(".ivg-vimeo-wrapper");
        $vimeoWrapper.css({ cssText: height });
      }
    } else {
      if ($(".ivg-vimeo-wrapper").length) {
        // for vimeo wrapper height
        var $vimeoWrapper = $(".ivg-vimeo-wrapper");
        var Fixedheight = "400";

        if (device.isWide) {
          Fixedheight = "575";
        }
        if (device.isDesktop) {
          Fixedheight = "500";
        }
        if (device.isTablet) {
          Fixedheight = "300";
        }
        if (device.isMobile) {
          Fixedheight = "200";
        }
        Fixedheight = `height:${Fixedheight}px !important`;
        $vimeoWrapper.css({ cssText: Fixedheight });
        // for arrow height
        $btn.css({ cssText: Fixedheight });
      }
    }
  }
};
