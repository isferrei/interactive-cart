import axios from "axios";

export default {
  exec: async function(offsetValue) {
    eval((await axios.get('arquivos/ScrollMagic.min.js')).data);

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
    new ScrollMagic.Scene({triggerElement: "#section-one", duration: 100, offset: offsetValue})
        .setPin("#section-one")
        .addTo(controller);

    sceneSectionTwo = new ScrollMagic.Scene({triggerElement: "#section-two", duration: 0})
        .setPin("#section-two")
        .on("enter", updateBox)
        .addTo(controller);
  }
};
