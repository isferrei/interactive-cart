import React from "react";
import "./motoExperience.global.css";
import { imagePath } from "../../components/CommonProductLogic/index";
import { Controller, Scene } from "react-scrollmagic";
import parse from "html-react-parser";
import LazyLoad from 'react-lazyload';

class MotoExperience extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data: {
        motoexp_layout_image,
        motoexp_layout_image_alt_text,
        motoexp_layout_text,
        motoexp_layout_title,
        motoexp_layout_title_color,
        motoexp_reverse_align,
        motoexp_text_bg,
        motoexp_text_bg_alt_text
      }
    } = this.props;
    return (
      <div className="moto-experience">
        <LazyLoad
          offset={-300}
          once
          throttle={300}
          placeholder={<img className="moto-experience-lazyload-default-img" src={imagePath + "Lazy-Load-Full-bleed-card.png"} alt="Lazyload Placeholder Image" />}
        >
        <div
          className={`me-container ${
            parseInt(motoexp_reverse_align) ? "layer-right" : "layer-left"
          }`}
        >
          <Controller>
            <Scene classToggle="animate-in" triggerHook="onEnter">
              <div
                className="me-title"
                style={{
                  color: `#${motoexp_layout_title_color}`
                }}
              >
                {motoexp_layout_title}
              </div>
            </Scene>
          </Controller>
          <div className="me-content">
            <Controller>
              <Scene triggerHook="onEnter" classToggle="animate-in">
                <div
                  className="me-textbox"
                  style={
                    motoexp_text_bg
                      ? {
                          backgroundImage: `url(${imagePath}${motoexp_text_bg})`
                        }
                      : null
                  }
                >
                  <div className="me-textbox-text">
                    {parse(motoexp_layout_text)}
                  </div>
                </div>
              </Scene>
              <Scene triggerHook="onEnter" classToggle="animate-in">
                <div className="me-image">
                  <LazyLoad
                    offset={-300}
                    once
                    throttle={300}
                    placeholder={<img className="moto-experience-lazyload-default-img" src={imagePath + "Lazy-Load-Square-batwing-03.png"} alt="Lazyload Placeholder Image" />}
                  >
                    <img src={`${imagePath}${motoexp_layout_image}`} alt={motoexp_layout_image_alt_text}/>
                  </LazyLoad>
                </div>
              </Scene>
            </Controller>
          </div>
        </div>
        </LazyLoad>
      </div>
    );
  }
}

export default MotoExperience;
