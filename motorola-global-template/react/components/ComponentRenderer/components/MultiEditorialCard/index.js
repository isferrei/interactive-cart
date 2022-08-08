import React, { Fragment } from "react";
import "./multiEditorialCard.global.css";
import { handleResize, debounce } from "../../common/js/deviceDetection";
import MultiEditorialColumn from "./components/MultiEditorialColumn";

class MultiEditorialCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
    };
  }

  componentDidMount() {
    let current = this;
    window.addEventListener(
      "resize",
      debounce(function() {
        current.setState({ checkDevice: handleResize() });
      }, 500)
    );
  }

  render = () => {
    let mcedi_columns;
    if (this.props.data.mcedi_column.length > 0) {
      mcedi_columns = this.props.data.mcedi_column.map(
        (mcedi_column, i) => {
          return <MultiEditorialColumn data={mcedi_column} key={i} device={this.state.checkDevice} count={this.props.data.mcedi_column.length} />;
        }
      );
    }

    return (
      <Fragment>
        <div
          className="multi-editorial-card"
          style={{
            backgroundColor:
              (this.state.checkDevice.isMobile && this.props.data.mcedi_bg_color_mobile) ? "#" + this.props.data.mcedi_bg_color_mobile
              : (this.state.checkDevice.isDesktop && this.props.data.mcedi_bg_color_desktop) ? "#" + this.props.data.mcedi_bg_color_desktop
              : "#" + this.props.data.mcedi_bg_color_desktop
          }}
        >
          <div className="mec-container">
            {this.props.data.mcedi_headline ?
              (<div
                className="mec-header"
                dangerouslySetInnerHTML={{
                  __html: this.props.data.mcedi_headline
                }}
                style={{
                  color:
                    (this.state.checkDevice.isMobile && this.props.data.mcedi_headline_color_mobi) ? "#" + this.props.data.mcedi_headline_color_mobi
                    : (this.state.checkDevice.isDesktop && this.props.data.mcedi_headline_color_desk) ? "#" + this.props.data.mcedi_headline_color_desk
                    : "#" + this.props.data.mcedi_headline_color_desk,
                  textAlign: this.props.data.mcedi_headline_alignment
                }}
                />) : null
            }
            <div className="mec-multi-editorial-columns">{mcedi_columns}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MultiEditorialCard;
