import { handleResize } from "../../ComponentRenderer/common/js/deviceDetection";
import ScrollMagic from "../../../utils/ScrollMagic";

export default {
  exec: async function() {
    var whichDevice = handleResize();
    if (whichDevice.isDesktop || whichDevice.isWide || whichDevice.isTablet) {
      var controllerDesktop = new ScrollMagic.Controller();
      var revealElements = document.getElementsByClassName(
        "qv-animation-items"
      );
      for (var i = 0; i < revealElements.length; i++) {
        // create a scene for each element
        new ScrollMagic.Scene({
          triggerElement: revealElements[i],
          offset: 120,
          duration: "35%",
          triggerHook: 0.5,
          reverse: true
        })
          .setClassToggle(revealElements[i], "visible")
          .addTo(controllerDesktop);
      }
    } else if (whichDevice.isMobile) {
      let offsetvalue;
      let navBar = document.getElementsByClassName(
        "vtex-store-components-3-x-notificationBarInner"
      );
      let subNav = document.getElementsByClassName("sub-nav");
      let mainHeader = document.getElementsByClassName("main-header");
      let leftContentSection = document.getElementsByClassName(
        "qv-content-section"
      );

      navBar = navBar.length > 0 ? navBar[0].clientHeight : 0;
      subNav = subNav.length > 0 ? subNav[0].clientHeight : 0;
      mainHeader = mainHeader.length > 0 ? mainHeader[0].clientHeight : 0;
      leftContentSection =
        leftContentSection.length > 0 ? leftContentSection[0].clientHeight : 0;

      let offsetCompute = navBar + subNav + mainHeader + leftContentSection;

      if (offsetCompute == 0) {
        offsetvalue = setTimeout(this.offsetVal, 1000);
      } else {
        offsetvalue = "-" + offsetCompute;
      }
      var controllerMobile = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: "onLeave",
          duration: 0
        }
      });
      let sceneSectionThree;
      document.getElementsByClassName("qv-content-section")[0].style.top = navBar + subNav + mainHeader + "px";
      function updateBox(e) {
        if (typeof sceneSectionThree == "object") {
          sceneSectionThree.removePin();
        }
        if (e.scrollDirection == "REVERSE") {
          document.getElementById("qv-sticky-content-section").style.position =
            "sticky";
          document.getElementById("qv-sticky-content-section").style.top =
            navBar + subNav + mainHeader + "px";
        } else {
          let pos = document.getElementById("qv-sticky-content-section")
            .offsetTop;
          document.getElementById("qv-sticky-content-section").style.top =
            pos + "px";
          document.getElementById("qv-sticky-content-section").style.position =
            "relative";
        }
      }

      // Build scenes.
      new ScrollMagic.Scene({
        triggerElement: "#qv-animation-item-0",
        duration: "100%",
        offset: offsetvalue
      })
        .setPin("#qv-animation-item-0", { pushFollowers: false })
        .addTo(controllerMobile);
      new ScrollMagic.Scene({
        triggerElement: "#qv-animation-item-1",
        duration: "100%",
        offset: offsetvalue
      })
        .setPin("#qv-animation-item-1", { pushFollowers: false })
        .addTo(controllerMobile);

      sceneSectionThree = new ScrollMagic.Scene({
        triggerElement: "#qv-animation-item-2",
        offset: offsetvalue,
        duration: 0
      })
        .setPin("#qv-animation-item-2", { pushFollowers: false })
        .on("enter leave", updateBox)
        .addTo(controllerMobile);
    }
  }
};
