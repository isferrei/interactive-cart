import $ from "jquery";

let openAnimate = scrollPosition => {
  scrollToPosition(scrollPosition - 100);
};
let closeAnimate = scrollElement => {
  var scrollPosition = $(scrollElement)
    .offset().top;
  scrollToPosition(scrollPosition - 100);
};
let scrollToPosition = scrollPosition => {
  $("html,body").animate({ scrollTop: scrollPosition }, "slow");
};
let mobileAnimation = element => {
  var parentElement = $(element).parent();
  if (parentElement.hasClass("mobile-open")) {
    parentElement.removeClass("mobile-open");
  } else {
    $(".psd-items-group").removeClass("mobile-open");
    parentElement.addClass("mobile-open");
  }
};

export { openAnimate, closeAnimate, mobileAnimation };
