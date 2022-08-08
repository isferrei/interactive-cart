import React, { Component, Fragment } from "react";
import "./panelDrawSection.global.css";
import { imagePath } from "../../CommonProductLogic/index";
import { handleResize, debounce } from "../../../common/js/deviceDetection";
import FullBleedImage from "../../FullBleedImage/index";
import SpacerCard from "../../SpacerCard/index";
import ImageVideoGallery from "../../ImageVideoGallery/index";
import BuilderCard from "../index";
import MotoExperience from "../../MotoExperience/index";

class PanelDrawSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, panelDrawID, panelDrawClose } = this.props;

    let drawItem = data.panel_draw_regions.map((drawregions, index) => {
      if (drawregions.card_name == "full_bleed_image") {
        return <FullBleedImage key={index} data={drawregions.contents} />;
      }
      if (drawregions.card_name == "spacer_card") {
        return <SpacerCard key={index} data={drawregions.contents} />;
      }
      if (drawregions.card_name == "image_video_gallery") {
        return <ImageVideoGallery key={index} data={drawregions.contents} />;
      }
      if (drawregions.card_name == "panels") {
        return <BuilderCard key={index} data={drawregions.contents} />;
      }
      if (drawregions.card_name == "newmotoexp") {
        return <MotoExperience key={index} data={drawregions.contents} />;
      }
    });

    return (
      <Fragment>
        <div className="bc-region-section">{drawItem}</div>
        <div className="bc-draw-region-close">
          <span className="bc-draw-region-close-icon">
            <img
              src={
                data.draw_close_button_theme == "dark"
                  ? imagePath + "close-icon-dark.svg"
                  : imagePath + "close-icon-light.svg"
              }
              onClick={() => panelDrawClose(panelDrawID)}
              data-target={panelDrawID}
              alt="Close Icon"
            />
          </span>
        </div>
      </Fragment>
    );
  }
}

export default PanelDrawSection;
