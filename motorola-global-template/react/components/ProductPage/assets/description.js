import axios from 'axios';

export default {
	exec: async function () {
		eval((await axios.get('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js')).data)
		eval((await axios.get('/arquivos/slick.min.js')).data);

		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		var player;

		function goToByScroll($item) {
			$('html,body').animate({
				scrollTop: $item.offset().top
			}, 'slow');
		}


		function stopPlayMovie($this, type) {
			var $parent = $this.parents('.md-block-movie');

			if (type == 'stop') {
				$parent.find('.md-block-movie-play').fadeIn();
				$parent.find('.md-movie-bg').fadeIn();
				$parent.find('.md-block-movie-player').fadeOut();
			} else {
				$parent.find('.md-block-movie-play').fadeOut();
				$parent.find('.md-movie-bg').fadeOut();
				$parent.find('.md-block-movie-player').fadeIn();
			}
		}
		function openCloseModal($this) {
			if ($this.is(':visible')) {
				$this.fadeOut();
			} else {
				$this.fadeIn();
			}
		}

		var players = {};
		window.onYouTubeIframeAPIReady = function() {

			$.each($('.md-block-movie-player'), function () {
				var id = $(this).attr('id');
				var yt_id = $(this).attr('data-youtube');

				players[id] = new YT.Player(id, {
					width: '640',
					height: '360',
					videoId: yt_id,
					playerVars: {
						'autoplay': 0,
						'controls': 0,
						'rel': 0,
						'fs': 0,
					},
					events: {
						'onStateChange': function (event) {
							if (event.data == 2) {
								var $e = $(event.target.a);
								if ($e.parents('.md-block-movie').length) {
									stopPlayMovie($e, 'stop');
								} else {
									openCloseModal($e.parents('.md-modal'))
								}
							}
						}
					}
				});
			});
		}

		$(document).on('click', '.md-block-movie-play-btn', function (event) {
			event.preventDefault()
			var $this = $(this);
			var $parent = $this.parents('.md-block-movie');
			var id = $parent.attr('data-id');

			stopPlayMovie($this, 'play');
			players[id].playVideo();

			return false;
		});
		$(document).on('click', '.md-block-movie-play-btn-modal', function (event) {
			event.preventDefault()
			var $this = $(this);
			var id = $this.attr('data-id');

			if ($(id).length) {
				openCloseModal($(id));
				var ytId = $this.attr('data-yt-id');
				players[ytId].playVideo();
			}

			return false;
		});

		$(document).ready(function () {
			$(document).on('click', '.md-more-info-btn', function () {
				var $this = $(this);
				var $box = $this.parents('.md-more-info-box');
				var $item = $box.find('.md-item-more-info');

				if ($item.length) {
					if ($item.is(':visible')) {
						$item.slideUp();
						goToByScroll($box);
					} else {
						$item.slideDown(function () {
							$(this).find('.slick-slider').slick('resize');
						});
						goToByScroll($item);
					}
				}
				return false;
			});

			$('.md-slider-box').slick({
				centerMode: true,
				centerPadding: '200px',
				slidesToShow: 1,
				dots: true,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerPadding: '5px',
						}
					}
				]
			});
			$('.md-block-movie-slider').slick({
				centerMode: false,
				slidesToShow: 1,
				infinite: false,
				dots: true,
			});
			$.each($('.md-slider-box'), function () {
				$(this).find('.slick-dots > li button').css('background', $(this).attr('data-pager-color'));
			});

			$(window).on('scroll', function () {
				var $elem = $('.admake-effect-right, .admake-effect-left, .admake-effect-down');
				var $window = $(window);
				var docViewTop = $window.scrollTop();
				var docViewBottom = docViewTop + $window.height();

				$.each($elem, function () {
					var elemTop = $(this).offset().top;
					var elemBottom = elemTop + $(this).height();
					if (elemBottom < docViewBottom) {
						$(this).addClass('admake-animate');
					}
				});
			});

			$(document).on('click', '.md-close-modal', function () {
				var $this = $(this);
				var id = $this.attr('data-yt-id');
				players[id].stopVideo();
				openCloseModal($this.parents('.md-modal'));
				return false;
			});

			$(document).on('click', '.md-specification-btn-more-btn', function () {
				var $this = $(this);
				var $box = $this.parents('.md-specification-btn-more');
				var $more = $box.find('.md-specification-2-box-more');

				if ($more.is(':visible')) {
					$this.find('.md-btn-icon').html('+');
					$more.slideUp();
				} else {
					$this.find('.md-btn-icon').html('-');
					$more.slideDown();
				}
				return false;
			});

		});

	}
}