import React, { Component } from "react";
import "./builderCard.global.css";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import BuilderCardInnerSection from "./components/BuilderCardInnerSection";
import PanelDrawSection from "./components/PanelDrawSection";
import {
  drawCloseAnimate,
  drawOpenAnimate
} from "./components/BuilderCardFunctions";

class BuilderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      drawerFlag: false,
      currentDrawID: ""
    };
  }

  componentDidMount() {
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 100)
    );
  }

  panelDrawDisplay = drawID => {
    drawOpenAnimate(this.refs[drawID].offsetTop);
    this.setState({ drawerFlag: true, currentDrawID: drawID });
  };

  panelDrawClose = drawID => {
    let refKey = "parent_" + drawID;
    let scrollPosition = this.refs[refKey].offsetTop;
    drawCloseAnimate(scrollPosition);
    this.setState({ drawerFlag: false, currentDrawID: drawID });
  };

  verticalRegionStyle = column => {
    const {
      data: { panel_region_percentage }
    } = this.props;
    return {
      width:
        (this.state.checkDevice.isDesktop || this.state.checkDevice.isWide) &&
        column == 0 &&
        panel_region_percentage
          ? panel_region_percentage + "%"
          : (this.state.checkDevice.isDesktop ||
              this.state.checkDevice.isWide) &&
            column == 1 &&
            panel_region_percentage
          ? 100 - panel_region_percentage + "%"
          : "",
      maxWidth:
        (this.state.checkDevice.isDesktop || this.state.checkDevice.isWide) &&
        column == 0 &&
        panel_region_percentage
          ? panel_region_percentage + "%"
          : (this.state.checkDevice.isDesktop ||
              this.state.checkDevice.isWide) &&
            column == 1 &&
            panel_region_percentage
          ? 100 - panel_region_percentage + "%"
          : ""
    };
  };

  render() {
    const {
      data: {
        panel_background_color,
        panel_regions,
        panel_draw_region_id,
        panel_orientation,
        panel_draw_regions,
        panel_flip_to_right,
        panel_mobile_col_reverse,
        panel_background_image
      }
    } = this.props;
    if (!Array.isArray(panel_regions) || !panel_regions.length) {
      return null;
    }
    let drawStyle = {
      visibility:
        panel_draw_region_id == this.state.currentDrawID &&
        this.state.drawerFlag
          ? "visible"
          : "hidden",

      height:
        panel_draw_region_id == this.state.currentDrawID &&
        this.state.drawerFlag
          ? "auto"
          : "0px",
      width:
        panel_draw_region_id == this.state.currentDrawID &&
        this.state.drawerFlag
          ? "100%"
          : "0px"
    };
    if (panel_regions.length == 1) {
      return (
        <div
          className="builder-card bc-paragraphs-item-panels"
          ref={`parent_${panel_draw_region_id}`}
        >
          <div className="bc-single">
            <div className="bc-region-section">
              <BuilderCardInnerSection
                data={panel_regions[0]}
                panelType="single"
                panelDrawID={panel_draw_region_id}
                panelDrawDisplay={this.panelDrawDisplay}
              />
            </div>
          </div>
          {panel_draw_region_id.trim() != "" &&
          Array.isArray(panel_draw_regions) &&
          panel_draw_regions.length ? (
            <div
              className="bc-panel-draw-region"
              id={panel_draw_region_id}
              style={drawStyle}
              ref={panel_draw_region_id}
            >
              <PanelDrawSection
                data={this.props.data}
                panelDrawID={panel_draw_region_id}
                panelDrawClose={this.panelDrawClose}
              />
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div
        className="builder-card bc-paragraphs-item-panels"
        ref={`parent_${panel_draw_region_id}`}
        style={{ backgroundColor: panel_background_color }}
      >
        {(this.state.checkDevice.isDesktop || this.state.checkDevice.isWide) &&
          panel_background_image && (
            <img
              src={panel_background_image}
              alt="panel-background-image"
              className="bc-bg-image"
            />
          )}

        {panel_orientation == 0 ? (
          <div
            className="bc-vertical"
            style={{
              flexDirection:
                this.state.checkDevice.isDesktop ||
                this.state.checkDevice.isWide
                  ? panel_flip_to_right
                    ? "row-reverse"
                    : "row"
                  : this.state.checkDevice.isMobile && panel_mobile_col_reverse
                  ? "column-reverse"
                  : "column"
            }}
          >
            {panel_regions.map((panelRegions, index) => {
              return (
                <div
                  className="bc-region-section colmd-6"
                  style={this.verticalRegionStyle(index)}
                  key={index}
                >
                  <BuilderCardInnerSection
                    data={panelRegions}
                    panelType="vertical"
                    panelDrawID={panel_draw_region_id}
                    panelDrawDisplay={this.panelDrawDisplay}
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        {panel_orientation == 1 ? (
          <div className="bc-horizontal">
            {panel_regions.map((panelRegions, index) => {
              return (
                <div className="bc-region-section" key={index}>
                  <BuilderCardInnerSection
                    data={panelRegions}
                    panelType="horizontal"
                    panelDrawID={panel_draw_region_id}
                    panelDrawDisplay={this.panelDrawDisplay}
                  />
                </div>
              );
            })}
          </div>
        ) : null}
        {panel_draw_region_id.trim() != "" &&
        Array.isArray(panel_draw_regions) &&
        panel_draw_regions != null &&
        panel_draw_regions.length ? (
          <div
            className="bc-panel-draw-region"
            id={panel_draw_region_id}
            style={drawStyle}
            ref={panel_draw_region_id}
          >
            <PanelDrawSection
              data={this.props.data}
              panelDrawID={panel_draw_region_id}
              panelDrawClose={this.panelDrawClose}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default BuilderCard;
