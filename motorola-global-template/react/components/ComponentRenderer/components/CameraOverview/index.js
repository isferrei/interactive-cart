import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import ScrollMagic from "../../../../utils/ScrollMagic";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import { imagePath } from "../../components/CommonProductLogic/index";
import "./CameraOverviewCard.global.css";

const CameraOverview = props => {
  const { title, description, phones } = props.data;
  const { mobile_image, mobile_image_alt, desktop_image, desktop_image_alt } = props.data.phones;

  const [device, setDevice] = useState(handleResize());
  const deviceDetectRef = useRef(device);
  const whichDevice = handleResize();

  const refCameraOverview = useRef();
  const refCameraOverlay = useRef([]);
  const refInfos = useRef([]);

  const [isTabletPotrait, setIsTabletPotrait] = useState(false);

  function scrollEffect() {
    ScrollMagicPluginGsap(ScrollMagic, gsap);
    const timeLineStream = gsap.timeline({ onUpdate: updatePercentage });
    const controller = new ScrollMagic.Controller();

    let PREVIOUS = 0;

    for (let i = 0; i < phones.length; i++) {
      const DELAY = (1 / phones.length) * (i + 1);
      const DELAY_SPACING = 0.001;
      const DELAY_PREVIOUS =
        DELAY + DELAY_SPACING > 1 ? 1 : DELAY + DELAY_SPACING;

      if (PREVIOUS === 0) {
        timeLineStream
          .to(
            refInfos.current[i],
            { duration: 0.04, transform: "translatey(0)", top: "10%", opacity: 1 },
            DELAY
          )
          .to(
            refInfos.current[i],
            { duration: 0.10, transform: "translatey(-575px)", top: "-55%", opacity: 0 },
            DELAY_PREVIOUS
          );
        timeLineStream
          .to(
            refCameraOverlay.current[i],
            { duration: 0.001, opacity: 1 },
            PREVIOUS + DELAY_SPACING
          )
          .to(
            refCameraOverlay.current[i],
            { duration: 0.001, opacity: 1 },
            DELAY
          )
          .to(
            refCameraOverlay.current[i],
            { duration: 0.001, opacity: 0 },
            DELAY_PREVIOUS
          );
      } else if (DELAY_PREVIOUS < 1) {
        timeLineStream
          .to(
            refInfos.current[i],
            { duration: 0.04, transform: "translatey(0)", top: "10%", opacity: 1 },
            PREVIOUS + DELAY_SPACING
          )
          .to(
            refInfos.current[i],
            { duration: 0.04, transform: "translatey(0)", top: "10%", opacity: 1 },
            DELAY
          )
          .to(
            refInfos.current[i],
            { duration: 0.10, transform: "translatey(-575px)", top: "-55%", opacity: 0 },
            DELAY_PREVIOUS
          );
        timeLineStream
          .to(
            refCameraOverlay.current[i],
            { duration: 0.001, top: "10%", opacity: 1 },
            PREVIOUS + DELAY_SPACING
          )
          .to(
            refCameraOverlay.current[i],
            { duration: 0.001, top: "10%", opacity: 1 },
            DELAY
          )
          .to(
            refCameraOverlay.current[i],
            { duration: 0.001, top: "-55%", opacity: 0 },
            DELAY_PREVIOUS
          );
      } else {
        timeLineStream
          .to(
            refInfos.current[i],
            { duration: 0.04, transform: "translatey(0)", top: "10%", opacity: 1 },
            PREVIOUS + DELAY_SPACING
          )
          .to(
            refInfos.current[i],
            { duration: 0.04, transform: "translatey(0)", top: "10%", opacity: 1 },
            DELAY
          );
        timeLineStream
          .to(
            refCameraOverlay.current[i],
            { duration: 0.001, top: "10%", opacity: 1 },
            PREVIOUS + DELAY_SPACING
          )
          .to(
            refCameraOverlay.current[i],
            { duration: 0.001, top: "10%", opacity: 1 },
            DELAY
          );
      }
      PREVIOUS = DELAY_PREVIOUS;
    }

    new ScrollMagic.Scene({
      triggerElement: refCameraOverview.current,
      triggerHook: "onLeave",
      duration: `${phones.length - 1}00%`
    })
      .setPin(refCameraOverview.current)
      .setTween(timeLineStream)
      .addTo(controller);

    function updatePercentage() {
      timeLineStream.progress();
    }
  }

  useEffect(() => {
    scrollEffect();
  }, []);

  useEffect(() => {
    deviceDetectRef.current = device;
    window.addEventListener("resize", detectDevice);

    return () => {
      window.removeEventListener("resize", detectDevice);
      window.removeEventListener("scroll", scrollEffect);
    };
  }, [device]);

  const detectDevice = () => {
    setDevice(handleResize());
    if((whichDevice.isTablet || device.isTablet) && (window.matchMedia("(orientation: portrait)").matches)) {
      setIsTabletPotrait(true);
    } else {
      setIsTabletPotrait(false);
    }
  }

  const getBackgroundStyle = () => {
    let backgroundObj;
    let backgroundSize;
    let backgroundRepeat;
    let backgroundPosition;
    let backgroundObjGRD;
    if (whichDevice.isMobile || device.isMobile) {
      if (props.data.co_bg_image_mobile) {
        backgroundObj  = `url('${imagePath}${props.data.co_bg_image_mobile}')`;
      } else {
        backgroundObj = `linear-gradient(${props.data.gradient_effect_direction_mobile}, #${props.data.gradient_start_color} -46%, #${props.data.gradient_end_color} 50%)`;
      }
    } 
    else if((whichDevice.isTablet || device.isTablet) && (window.matchMedia("(orientation: portrait)").matches)) {
      if (props.data.co_bg_image_tablet) {
        backgroundObj  = `url('${imagePath}${props.data.co_bg_image_tablet}')`;
      } else {
        backgroundObj = `linear-gradient(${props.data.gradient_effect_direction_mobile}, #${props.data.gradient_start_color} -46%, #${props.data.gradient_end_color} 50%)`;
      }
    } 
    else {
      if (props.data.co_bg_image_desktop) {
        backgroundObj = `url('${imagePath}${props.data.co_bg_image_desktop}')`;
      } else {
        backgroundObj = `linear-gradient(${props.data.gradient_effect_direction_desktop}, #${props.data.gradient_start_color} -46%, #${props.data.gradient_end_color} 50%)`;
      }
    }
     return {
       'background-image': backgroundObj,
     };
  }

  return (
    <div className="camera-overview-container">
      <section
        ref={refCameraOverview}
        id="camera-overview flex flex-column justify-between min-vh-100"
        className="camera-overview"
       style={getBackgroundStyle()}
      >
        <div className="camera-overview__cameras flex flex-column w-100 relative">
          <div className="camera-overview__cameras__infos relative">
            {phones.length &&
              phones.map((item, index) => (
                <div>
                  <div
                    key={index}
                    className={`camera-overview__cameras__infos__texts o-0 pa0 pl5 pr5 absolute camera-overview__cameras__infos__texts-${index + 1
                      }`}
                    ref={ref => refInfos.current.push(ref)}
                  >
                    <h2
                      className="camera-overview__cameras__infos__texts__title white ma0 fw4 w-100 subtitle_tahoe"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p
                      className="camera-overview__cameras__infos__texts__description w-100 ma0 description_tahoe"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="camera-overview__cameras__camera relative">
            {props.data.phones.length &&
              props.data.phones.map((item, index) => (
                <img
                  className={`camera-overview__cameras__camera__camera-overlay o-0 absolute w-100 camera-overview__cameras__camera__camera-overlay-${index + 1}`}
                  key={index}
                  ref={ref => refCameraOverlay.current.push(ref)}
                  alt={(whichDevice.isMobile || device.isMobile) ? item.mobile_image_alt : (whichDevice.isDesktop || device.isDesktop || isTabletPotrait) ? item.desktop_image_alt : item.tablet_image_alt}
                  src={(whichDevice.isMobile || device.isMobile) ? `${imagePath}${item.mobile_image}` : (whichDevice.isDesktop || device.isDesktop || isTabletPotrait || whichDevice.isWide || device.isWide) ? `${imagePath}${item.desktop_image}` : `${imagePath}${item.tablet_image}`}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}



export default CameraOverview;
