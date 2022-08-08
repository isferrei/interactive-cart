import $ from "jquery";

let openAnimate = scrollPosition => {
  scrollToPosition(scrollPosition - 100);
};
let closeAnimate = scrollElement => {
  var scrollPosition = $(scrollElement)
    .prev()
    .offset().top;
  scrollToPosition(scrollPosition - 100);
};
let scrollToPosition = scrollPosition => {
  $("html,body").animate({ scrollTop: scrollPosition }, "slow");
};
let mobileAnimation = element => {
  /* css class swap */
  var parentElement = $(element).parent();
  if (parentElement.hasClass("mobile-open")) {
    parentElement.removeClass("mobile-open");
  } else {
    $(".psd-items-group").removeClass("mobile-open");
    var scrollPosition = parentElement.offset().top;
    scrollToPosition(scrollPosition - 140);
    parentElement.addClass("mobile-open");
  }
};

export { openAnimate, closeAnimate, mobileAnimation };
