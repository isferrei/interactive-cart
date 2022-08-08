import ScrollMagic from "../../utils/ScrollMagic";

export default {
  exec: async function(offsetValue) {
    var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 'onLeave',
            duration: 0
        }
    });

    let sceneSectionTwo;

    function updateBox(e) {
        if (typeof sceneSectionTwo == 'object') {
            sceneSectionTwo.removePin();
        }
    }

    // Build scenes.
    new ScrollMagic.Scene({triggerElement: "#cs-items-section-0", duration: 100})
        .setPin("#cs-items-section-0")
        .addTo(controller);

    sceneSectionTwo = new ScrollMagic.Scene({triggerElement: "#cs-items-section-1", duration: 0})
        .setPin("#cs-items-section-1")
        .on("enter", updateBox)
        .addTo(controller);
  }
};
