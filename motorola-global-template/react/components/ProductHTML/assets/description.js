import axios from "axios";

export default {
  exec: async function() {
    eval(
      (await axios.get(
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
      )).data
    );
    eval((await axios.get("/arquivos/slick.min.js")).data);

    var players = {};
    window.onYouTubeIframeAPIReady = function() {
      $.each($(".md-block-movie-player"), function() {
        var id = $(this).attr("id");
        var is_modal = $(this).parents(".md-modal").length;
        var yt_id = $(this).attr("data-youtube");

        var vHeight = "360";
        var vWidth = "640";
        if (
          $(this).attr("data-height") != undefined &&
          $(this).attr("data-height") != null
        ) {
          vHeight = $(this).attr("data-height");
        }
        if (
          $(this).attr("data-width") != undefined &&
          $(this).attr("data-width") != null
        ) {
          vWidth = $(this).attr("data-width");
        }

        players[id] = new YT.Player(id, {
          width: vWidth,
          height: vHeight,
          videoId: yt_id,
          playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            fs: 0,
            loop: is_modal ? 1 : 0
          },
          events: {
            onStateChange: function(event) {
              if (event.data == 2) {
                var $e = $(event.target.a);
                if ($e.parents(".md-block-movie").length) {
                  stopPlayMovie($e, "stop");
                } else {
                  openCloseModal($e.parents(".md-modal"));
                }
              }
              if (is_modal && event.data == 0) {
                event.target.playVideo();
              }
            },
            onReady: function(event) {
              $(event.target.a)
                .parent()
                .find(".md-block-movie-play-btn")
                .on("click", function(event) {
                  event.preventDefault();
                  var $this = $(this);
                  var $parent = $this.parents(".md-block-movie");
                  var id = $parent.attr("data-id");

                  stopPlayMovie($this, "play");
                  players[id].playVideo();

                  return false;
                });
              var playerElement = $(event.target.a).attr("id");
              $(
                ".md-block-movie-play-btn-modal[data-yt-id='" +
                  playerElement +
                  "']"
              ).on("click", function(e) {
                e.preventDefault();

                var $this = $(this);
                var id = $this.attr("data-id");

                if ($(id).length) {
                  openCloseModal($(id));
                  var ytId = $this.attr("data-yt-id");
                  players[ytId].playVideo();
                }

                return false;
              });
              $(".md-close-modal").on("click", function() {
                var $this = $(this);
                var id = $this.attr("data-yt-id");
                players[id].stopVideo();
                openCloseModal($this.parents(".md-modal"));
                return false;
              });
            }
          }
        });
      });
    };

    if (!window.YT) {
      var tag = document.createElement("script");
      tag.src = "https://youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      window.onYouTubeIframeAPIReady();
    }
    var player;

    function goToByScroll($item) {
      $("html,body").animate(
        {
          scrollTop: $item.offset().top
        },
        "slow"
      );
    }

    function stopPlayMovie($this, type) {
      var $parent = $this.parents(".md-block-movie");

      if (type == "stop") {
        $parent.find(".md-block-movie-play").fadeIn();
        $parent.find(".md-movie-bg").fadeIn();
        $parent.find(".md-block-movie-player").fadeOut();
      } else {
        $parent.find(".md-block-movie-play").fadeOut();
        $parent.find(".md-movie-bg").fadeOut();
        $parent.find(".md-block-movie-player").fadeIn();
      }
    }
    function openCloseModal($this) {
      if ($this.is(":visible")) {
        $this.fadeOut();
      } else {
        $this.fadeIn();
      }
    }

    $(document).ready(function() {
      var imagesBgMovieWidthAuto = [
        "arquivos/pic-1-0005.jpg",
        "arquivos/pic-1-0061.jpg"
      ];

      $(".md-button-item").click(function() {
        var $this = $(this);
        var _class = $this.attr("data-item");
        var $box = $this.parents(".md-select-alter-photo");

        $box.find(".md-button-item").removeClass("active");
        $this.addClass("active");

        $box.find(".md-select-photos img").hide();
        $box.find(_class).fadeIn();
        return false;
      });

      for (var x = 0; x < imagesBgMovieWidthAuto.length; x++) {
        var $tempImg = $(
          '.md-movie-bg[src*="' + imagesBgMovieWidthAuto[x] + '"]'
        );
        if ($tempImg.length) {
          $tempImg
            .parents(".md-block-movie")
            .height("auto")
            .removeClass("img-absolute");
        }
      }

      var ajustHeightMovie = function() {
        $.each($(".md-item.md-block-movie"), function() {
          if (
            $(this)
              .attr("style")
              .indexOf("height: auto") >= 0
          ) {
            var height = $(this)
              .find(".md-movie-bg")
              .height();

            $(this).css({
              "min-height": height
            });
            $(this)
              .find(".md-block-movie-player")
              .css({
                position: "relative",
                left: "auto",
                top: "auto",
                right: "auto",
                bottom: "auto",
                height: height,
                width: "100%"
              });
          }
        });
      };
      ajustHeightMovie();
      $(window).resize(function() {
        ajustHeightMovie();
      });

      var ajustHeightCard = function() {
        $.each($(".md-columns-cards-box"), function() {
          var $this = $(this);
          var max = 0;
          if ($(window).width() < 768) {
            $.each($this.find(".md-card-item .md-card-details"), function() {
              var $t = $(this);
              if ($t.outerHeight() > max) {
                max = $t.outerHeight();
              }
            });
            $this.find(".md-card-item .md-card-details").css("min-height", max);
          } else {
            $this
              .find(".md-card-item .md-card-details")
              .css("min-height", "auto");
          }
        });
      };

      $(window).resize(function() {
        ajustHeightCard();
      });
      ajustHeightCard();

      $.each($(".md-specification-item .icon img"), function() {
        if ($(this).attr("src") == "/arquivos/") {
          $(this).remove();
        }
      });

      var ajustBtnCarousel = function() {
        setTimeout(function() {
          $.each($(".md-slider-box"), function() {
            var $btn = $(this).find(".slick-arrow");
            var height = $(this)
              .find(".md-slider-item > img")
              .eq(0)
              .height();
            $btn.css("height", height);
            var $btnsMovie = $(this).find(".md-block-movie-play-btn-modal");

            $btnsMovie.css({ top: height / 2 + "px" });
          });
        }, 1500);
      };
      $(window).resize(function() {
        ajustBtnCarousel();
      });
      $(window).scroll(function() {
        ajustBtnCarousel();
      });

      ajustBtnCarousel();

      $(".md-mosaic-modal-nav-carousel")
        .not(".slick-initialized")
        .slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: ".md-mosaic-modal-items-carousel",
          dots: false
        });
      $(".md-mosaic-modal-items-carousel")
        .not(".slick-initialized")
        .slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          fade: true,
          adaptiveHeight: true,
          asNavFor: ".md-mosaic-modal-nav-carousel"
        });
      $(".md-mosaic-modal").fadeOut();

      $(document).on("click", ".md-mosaic-hover-box", function() {
        var $this = $(this);
        var $box = $this.parents(".md-mosaic-items-box-modal");
        $box.find(".md-mosaic-modal").fadeIn(function() {
          $(this)
            .find(".slick-slider")
            .slick("resize");
        });
        return false;
      });
      $(document).on("click", ".md-mosaic-modal-btn-close", function() {
        var $this = $(this);
        $this.parents(".md-mosaic-modal").fadeOut();
        return false;
      });

      $(".md-slider-box")
        .not(".slick-initialized")
        .slick({
          centerMode: true,
          centerPadding: "200px",
          slidesToShow: 1,
          dots: true,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                centerPadding: "5px"
              }
            }
          ]
        });
      $(".md-block-movie-slider")
        .not(".slick-initialized")
        .slick({
          centerMode: false,
          slidesToShow: 1,
          infinite: false,
          dots: true
        });

      $.each($(".md-slider-box"), function() {
        $(this)
          .find(".slick-dots > li button")
          .css("background", $(this).attr("data-pager-color"));
      });

      $(window).on("scroll", function() {
        var $elem = $(
          ".admake-effect-right, .admake-effect-left, .admake-effect-down"
        );
        var $window = $(window);
        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        $.each($elem, function() {
          var elemTop = $(this).offset().top;
          var elemBottom = elemTop + $(this).height();
          if (elemBottom < docViewBottom) {
            $(this).addClass("admake-animate");
          }
        });
      });
      var btnMoreBtn = $(".md-specification-btn-more-btn");
      btnMoreBtn.off("click");
      btnMoreBtn.unbind("click");
      btnMoreBtn.on("click", function() {
        var $this = $(this);
        var $box = $this.parents(".md-specification-btn-more");
        var $more = $box.find(".md-specification-2-box-more");

        if ($more.is(":visible")) {
          $this.find(".md-btn-icon").html("+");
          $more.slideUp();
        } else {
          $this.find(".md-btn-icon").html("-");
          $more.slideDown();
        }
        return false;
      });

      let moreInfoBtn = $(".md-more-info-btn");

      moreInfoBtn.toArray().forEach(element => {
        if (element.id) {
          return;
        }

        element.id = Math.floor(Math.random() * 10000);
        let $element = $(element);
        $element.off("click");
        $element.unbind("click");

        $element.on("click", function(event) {
          event.stopPropagation();
          event.preventDefault();
          let $this = $(this);

          let $box = $this.parents(".md-more-info-box");
          let $item = $box.find(".md-item-more-info");
  
          if ($item.length) {
            if ($item.is(":visible")) {
              $item.slideUp();
              goToByScroll($box);
            } else {
              $item.slideDown(function() {
                let $slick = $(this).find(".slick-slider");
                if ($slick.length) {
                  setTimeout(function() {
                    $slick.slick('next');
                  }, 0);
                  setTimeout(function() {
                    $slick.slick('prev');
                  }, 700);
                  setTimeout(function() {
                    $slick.slick('resize');
                  }, 1000);
                }
              });
              goToByScroll($item);
            }
          }
          return false;
        });
      });
    });
  }
};
