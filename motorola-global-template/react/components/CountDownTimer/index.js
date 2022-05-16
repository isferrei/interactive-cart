import { Component } from "react";
import ReactPlayer from "react-player";
import "./CountDownTimer.global.css";
import {
  handleResize,
  debounce
} from "../ComponentRenderer/common/js/deviceDetection";
import MobileSVG from "./components/MobileSVG";
import DesktopSVG from "./components/DesktopSVG";
import CTA from "../ComponentRenderer/components/CTA";

class CountDownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize(),
      timerBackgroundImage: "",
      countDownDays: "",
      countDownHours: "",
      countDownMinutes: "",
      countDownSeconds: "",
      loadView: "",
      showVideo: false,
      timerEnded: false,
      iosDeviceFlag: false,
      afterTimerEnd: false
    };
    this.timerInterval = "";
  }

  timerInterval = "";
  totalDays = "";

  static schema = {
    title: "Count Down Timer",
    description: "Count Down Timer",
    type: "object",
    properties: {
      showCountDownTimer: {
        type: "boolean",
        title: "Show Timer",
        default: false
      },
      timerStartDate: {
        type: "string",
        title: "Timer Start Date",
        description: "Enter the start date of timer format (YYYY-MM-DD) UTC time"
      },
      timerEndDate: {
        type: "string",
        title: "Timer End Date",
        description: "Enter the end date of timer format (YYYY-MM-DD) UTC time"
      },
      timerStartTime: {
        type: "string",
        title: "Timer Start Time",
        description: "Enter the start time of timer format (HH:MM:SS) UTC time"
      },
      timerEndTime: {
        type: "string",
        title: "Timer End Time",
        description: "Enter the end time of timer format (HH:MM:SS) UTC time"
      },
      backgroundColor: {
        type: "string",
        title: "Background Color",
        description: "Enter the hexa color for timer background"
      },
      desktopBackgroundImage: {
        type: "string",
        title: "Desktop Background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      mobileBackgroundImage: {
        type: "string",
        title: "Mobile Background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      tabletBackgroundImage: {
        type: "string",
        title: "Tablet Background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      backgroundImageAltText: {
        default: "",
        title: "Background image alt text",
        type: "string"
      },
      daysGradientStartColor: {
        type: "string",
        title: "Days gradient start color",
        description: "Enter the hexa color for days gradient start"
      },
      daysGradientEndColor: {
        type: "string",
        title: "Days gradient end color",
        description: "Enter the hexa color for days gradient end"
      },
      hoursGradientStartColor: {
        type: "string",
        title: "Hours gradient start color",
        description: "Enter the hexa color for hours gradient start"
      },
      hoursgradientEndColor: {
        type: "string",
        title: "Hours gradient end color",
        description: "Enter the hexa color for hous gradient end"
      },
      minutesgradientStartColor: {
        type: "string",
        title: "Minutes gradient start color",
        description: "Enter the hexa color for minutes gradient start"
      },
      minutesGradientEndColor: {
        type: "string",
        title: "Minutes gradient end color",
        description: "Enter the hexa color for minutes gradient end"
      },
      secondsGradientStartColor: {
        type: "string",
        title: "Seconds gradient start color",
        description: "Enter the hexa color for seconds gradient start"
      },
      secondsGradientEndColor: {
        type: "string",
        title: "Seconds gradient end color",
        description: "Enter the hexa color for seconds gradient end"
      },
      mobileGradientStartColor: {
        type: "string",
        title: "Mobile gradient start color",
        description: "Enter the hexa color for mobile gradient start"
      },
      mobileGradientEndColor: {
        type: "string",
        title: "Mobile gradient end color",
        description: "Enter the hexa color for mobile gradient end"
      },
      positionTimerText: {
        enum: ["left-right", "top-bottom"],
        enumNames: ["Left - Right", "Top - Bottom"],
        default: "top-bottom",
        type: "string",
        title: "Position",
        description: "Position of timer text",
        widget: {
          "ui:widget": "select"
        }
      },
      timerText: {
        type: "string",
        title: "Timer text 1",
        widget: {
          "ui:widget": "textarea"
        }
      },
      timerTextColor: {
        type: "string",
        title: "Timer text 1 color",
        description: "Enter the hexa color for timer text 1 color"
      },
      timerCTALabel: {
        type: "string",
        title: "Timer CTA 1 text label",
        description: "Enter the label for timer CTA 1"
      },
      timerCTALink: {
        type: "string",
        title: "Timer CTA 1 link",
        description: "Enter the link for timer CTA 1"
      },
      openInNewTab: {
        type: "boolean",
        title: "Open in new tab for timer 1",
        default: false
      },
      backgroundColorCTA: {
        type: "string",
        title: "Timer CTA 1 background color",
        description: "Enter the hexa color of background for timer CTA 1"
      },
      outlineColorCTA: {
        type: "string",
        title: "Timer CTA 1 outline color",
        description: "Enter the hexa color of outline for timer CTA 1"
      },
      textColorCTA: {
        type: "string",
        title: "Timer CTA 1 text color",
        description: "Enter the hexa color of text for timer CTA 1"
      },
      backgroundOpacityCTA: {
        type: "number",
        title: "Timer CTA 1 background opacity",
        description: "Enter the background opacity for timer CTA 1"
      },
      hoverBackgroundColorCTA: {
        type: "string",
        title: "Timer CTA 1 hover background color",
        description: "Enter the hexa color of hover background for timer CTA 1"
      },
      hoverOutlineColorCTA: {
        type: "string",
        title: "Timer CTA 1 hover outline color",
        description: "Enter the hexa color of hover outline for timer CTA 1"
      },
      hoverTextColorCTA: {
        type: "string",
        title: "Timer CTA 1 hover text color",
        description: "Enter the hexa color of hover text for timer CTA 1"
      },
      hoverBackgroundOpacityCTA: {
        type: "number",
        title: "Timer CTA 1 hover background opacity",
        description: "Enter the hover background opacity for timer CTA 1"
      },
      timerTextSecond: {
        type: "string",
        title: "Timer text 2",
        widget: {
          "ui:widget": "textarea"
        }
      },
      timerTextColorSecond: {
        type: "string",
        title: "Timer text 2 color",
        description: "Enter the hexa color for timer text 2 color"
      },
      timerCTALabelSecond: {
        type: "string",
        title: "Timer CTA text 2 label",
        description: "Enter the label for timer 2 CTA"
      },
      timerCTALinkSecond: {
        type: "string",
        title: "Timer CTA 2 link",
        description: "Enter the link for timer CTA 2"
      },
      openInNewTabSecond: {
        type: "boolean",
        title: "Open in new tab for timer CTA 2",
        default: false
      },
      backgroundColorCTASecond: {
        type: "string",
        title: "Timer CTA 2 background color",
        description: "Enter the hexa color of background for timer CTA 2"
      },
      outlineColorCTASecond: {
        type: "string",
        title: "Timer CTA 2 outline color",
        description: "Enter the hexa color of outline for timer CTA 2"
      },
      textColorCTASecond: {
        type: "string",
        title: "Timer CTA 2 text color",
        description: "Enter the hexa color of text for timer CTA 2"
      },
      backgroundOpacityCTASecond: {
        type: "number",
        title: "Timer CTA 2 background opacity",
        description: "Enter the background opacity for timer CTA 2"
      },
      hoverBackgroundColorCTASecond: {
        type: "string",
        title: "Timer CTA 2 hover background color",
        description: "Enter the hexa color of hover background for timer CTA 2"
      },
      hoverOutlineColorCTASecond: {
        type: "string",
        title: "Timer CTA 2 hover outline color",
        description: "Enter the hexa color of hover outline for timer CTA 2"
      },
      hoverTextColorCTASecond: {
        type: "string",
        title: "Timer CTA 2 hover text color",
        description: "Enter the hexa color of hover text for timer CTA 2"
      },
      hoverBackgroundOpacityCTASecond: {
        type: "number",
        title: "Timer CTA 2 hover background opacity",
        description: "Enter the hover background opacity for timer CTA 2"
      },
      videoLink: {
        type: "string",
        title: "Sizzle video Link",
        description: "Enter the sizzle video vimeo link"
      },
      timerEndText: {
        type: "string",
        title: "Timer end text",
        widget: {
          "ui:widget": "textarea"
        }
      },
      timerEndTextColor: {
        type: "string",
        title: "Timer end text color",
        description: "Enter the hexa color for timer end text color"
      },
      timerEndBackgroundColor: {
        type: "string",
        title: "Timer end background color",
        description: "Enter the hexa color for timer end background"
      },
      timerEndCTALabel: {
        type: "string",
        title: "Timer end CTA text label",
        description: "Enter the label for timer end CTA"
      },
      timerEndCTALink: {
        type: "string",
        title: "Timer end CTA link",
        description: "Enter the link for timer end CTA"
      },
      timerEndOpenInNewTab: {
        type: "boolean",
        title: "Open in new tab",
        default: false
      },
      timerEndBackgroundColorCTA: {
        type: "string",
        title: "Timer end CTA background color",
        description: "Enter the hexa color of background for timer end CTA"
      },
      timerEndOutlineColorCTA: {
        type: "string",
        title: "Timer end CTA outline color",
        description: "Enter the hexa color of outline for timer end CTA"
      },
      timerEndTextColorCTA: {
        type: "string",
        title: "Timer end CTA text color",
        description: "Enter the hexa color of text for timer end CTA"
      },
      timerEndBackgroundOpacityCTA: {
        type: "number",
        title: "Timer end CTA background opacity",
        description: "Enter the background opacity for timer end CTA"
      },
      timerEndHoverBackgroundColorCTA: {
        type: "string",
        title: "Timer end CTA hover background color",
        description:
          "Enter the hexa color of hover background for timer end CTA"
      },
      timerEndHoverOutlineColorCTA: {
        type: "string",
        title: "Timer end CTA hover outline color",
        description: "Enter the hexa color of hover outline for timer end CTA"
      },
      timerEndHoverTextColorCTA: {
        type: "string",
        title: "Timer end CTA hover text color",
        description: "Enter the hexa color of hover text for timer end CTA"
      },
      timerEndHoverBackgroundOpacityCTA: {
        type: "number",
        title: "Timer end CTA hover background opacity",
        description: "Enter the hover background opacity for timer end CTA"
      },
      timerEndBackgroundImage: {
        type: "string",
        title: "Timer end background image",
        widget: {
          "ui:widget": "image-uploader"
        }
      },
      timerEndBackgroundImageAltText: {
        default: "",
        title: "Timer end background image alt text",
        type: "string"
      },
      useOnlyTimerEnd: {
        type: "boolean",
        title: "Use only timer end without timer",
        default: false
      }
    }
  };

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
        this.detectBackgroundImage();
        this.detectView();
      }, 500)
    );
    this.detectBackgroundImage();
    this.timerInterval = setInterval(() => {
      if (this.props.timerEndDate && this.props.timerEndTime) {
        this.getTimeRemaining(
          `${this.props.timerEndDate}T${this.props.timerEndTime}Z`
        );
      }
    }, 1000);
    this.totalDays = Math.floor(
      (Date.parse(`${this.props.timerEndDate}T${this.props.timerEndTime}`) -
        Date.parse(
          `${this.props.timerStartDate}T${this.props.timerStartTime}`
        )) /
        (1000 * 60 * 60 * 24)
    );
    this.detectView();
    this.setState({ showTimerContent: true });
    let iosDevice = this.isIosDevice();
    this.setState({ iosDeviceFlag: iosDevice });
  }

  detectBackgroundImage = () => {
    if (this.state.checkDevice.isMobile) {
      this.setState({
        timerBackgroundImage: this.props.mobileBackgroundImage
      });
    } else if (this.state.checkDevice.isTablet) {
      this.setState({
        timerBackgroundImage: this.props.tabletBackgroundImage
      });
    } else {
      this.setState({
        timerBackgroundImage: this.props.desktopBackgroundImage
      });
    }
  };

  detectView = () => {
    if (this.state.checkDevice.isWide) {
      this.setState({
        loadView: "desktop"
      });
    } else {
      this.setState({
        loadView: "mobile"
      });
    }
  };

  getTimeRemaining = endtime => {
    var b = endtime.split(/\D+/);
    endtime = new Date(
      Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6])
    ).toUTCString();
    var t =
      Date.parse(endtime) -
      Date.parse(new Date().toUTCString());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    if (t <= 0 && t >= -86400000) {
      clearInterval(this.timerInterval);
      this.setState({
        countDownDays: 0,
        countDownHours: 0,
        countDownMinutes: 0,
        countDownSeconds: 0,
        showVideo: true,
        timerEnded: false,
        afterTimerEnd: true
      });
      return;
    } else if (t > 0) {
      this.setState({
        countDownDays: days,
        countDownHours: hours,
        countDownMinutes: minutes,
        countDownSeconds: seconds,
        showVideo: false,
        timerEnded: false,
        afterTimerEnd: false
      });
    } else {
      this.setState({
        countDownDays: 0,
        countDownHours: 0,
        countDownMinutes: 0,
        countDownSeconds: 0,
        showVideo: false,
        timerEnded: true,
        afterTimerEnd: false
      });
    }
  };

  hexToRgbA = (hex, opacity) => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + "," + opacity
      );
    }
    return null;
  };

  skipVideo = () => {
    clearInterval(this.timerInterval);
    this.setState({
      countDownDays: 0,
      countDownHours: 0,
      countDownMinutes: 0,
      countDownSeconds: 0,
      showVideo: false,
      timerEnded: true
    });
  };

  isIosDevice = () => {
    return (
      !!navigator.platform &&
      /iPad|iPhone|iPod|MacIntel/.test(navigator.platform)
    );
  };

  showEndTimer = () => {
    this.setState({ timerEnded: true, showVideo: false });
  };

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  render() {
    const {
      showCountDownTimer,
      backgroundColor,
      daysGradientStartColor,
      daysGradientEndColor,
      hoursGradientStartColor,
      hoursgradientEndColor,
      minutesgradientStartColor,
      minutesGradientEndColor,
      secondsGradientStartColor,
      secondsGradientEndColor,
      mobileGradientStartColor,
      mobileGradientEndColor,
      timerText,
      timerTextColor,
      timerCTALabel,
      timerCTALink,
      openInNewTab,
      outlineColorCTA,
      textColorCTA,
      backgroundOpacityCTA,
      hoverOutlineColorCTA,
      hoverTextColorCTA,
      hoverBackgroundOpacityCTA,
      timerTextSecond,
      timerTextColorSecond,
      timerCTALabelSecond,
      timerCTALinkSecond,
      openInNewTabSecond,
      outlineColorCTASecond,
      textColorCTASecond,
      backgroundOpacityCTASecond,
      hoverOutlineColorCTASecond,
      hoverTextColorCTASecond,
      hoverBackgroundOpacityCTASecond,
      timerEndText,
      timerEndTextColor,
      timerEndBackgroundColor,
      timerEndCTALabel,
      timerEndCTALink,
      timerEndOpenInNewTab,
      timerEndOutlineColorCTA,
      timerEndTextColorCTA,
      timerEndBackgroundOpacityCTA,
      timerEndHoverOutlineColorCTA,
      timerEndHoverTextColorCTA,
      timerEndHoverBackgroundOpacityCTA,
      useOnlyTimerEnd,
      timerEndBackgroundImage,
      positionTimerText,
      videoLink,
      backgroundImageAltText,
      timerEndBackgroundImageAltText
    } = this.props;
    let { showVideo, afterTimerEnd } = this.state;
    if (!showCountDownTimer) {
      return null;
    }
    const {
      countDownDays,
      countDownHours,
      countDownMinutes,
      countDownSeconds
    } = this.state;
    let backgroundColorCTA = this.hexToRgbA(
      "#" + this.props.backgroundColorCTA,
      backgroundOpacityCTA
    );
    let hoverBackgroundColorCTA = this.hexToRgbA(
      "#" + this.props.hoverBackgroundColorCTA,
      hoverBackgroundOpacityCTA
    );
    let backgroundColorCTASecond = this.hexToRgbA(
      "#" + this.props.backgroundColorCTASecond,
      backgroundOpacityCTASecond
    );
    let hoverBackgroundColorCTASecond = this.hexToRgbA(
      "#" + this.props.hoverBackgroundColorCTASecond,
      hoverBackgroundOpacityCTASecond
    );
    let timerEndBackgroundColorCTA = this.hexToRgbA(
      "#" + this.props.timerEndBackgroundColorCTA,
      timerEndBackgroundOpacityCTA
    );
    let timerEndHoverBackgroundColorCTA = this.hexToRgbA(
      "#" + this.props.timerEndHoverBackgroundColorCTA,
      timerEndHoverBackgroundOpacityCTA
    );
    let classes = this.state.timerBackgroundImage
      ? "cdt-timer"
      : "cdt-timer cdt-min-height";
    let cdtTimer = (
      <div
        className={classes}
        style={{ backgroundColor: `#${backgroundColor}` }}
      >
        <div className="cdt-background-image">
          <img src={this.state.timerBackgroundImage} alt={backgroundImageAltText}/>
        </div>
        <div className="cdt-content">
          <div className={`cdt-content-wrapper ${positionTimerText}`}>
            <div className={`cdt-content-first ${positionTimerText}`}>
              {timerText ? (
                <div
                  className="cdt-content-first-text"
                  style={{ color: `#${timerTextColor}` }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: timerText
                    }}
                  />
                </div>
              ) : null}
              {timerCTALabel ? (
                <div className="cdt-content-first-CTA">
                  <CTA
                    ctaHoverBackgroundColor={hoverBackgroundColorCTA}
                    ctaBackgroundColor={backgroundColorCTA}
                    ctaHoverBorderColor={hoverOutlineColorCTA}
                    ctaBorderColor={outlineColorCTA}
                    ctaHoverTextColor={hoverTextColorCTA}
                    ctaTextColor={textColorCTA}
                    ctaAnchorTarget={openInNewTab ? "1" : "0"}
                    ctaText={timerCTALabel}
                    ctaLink={timerCTALink}
                  />
                </div>
              ) : null}
            </div>
            <div className="cdt-timer-wrapper">
              {this.state.loadView === "desktop" ? (
                <DesktopSVG
                  days={countDownDays}
                  hours={countDownHours}
                  minutes={countDownMinutes}
                  seconds={countDownSeconds}
                  daysStartColor={daysGradientStartColor}
                  daysEndColor={daysGradientEndColor}
                  hoursStartColor={hoursGradientStartColor}
                  hoursEndColor={hoursgradientEndColor}
                  minutesStartColor={minutesgradientStartColor}
                  minutesEndColor={minutesGradientEndColor}
                  secondsStartColor={secondsGradientStartColor}
                  secondsEndColor={secondsGradientEndColor}
                  totalDays={this.totalDays}
                />
              ) : (
                <MobileSVG
                  days={countDownDays}
                  hours={countDownHours}
                  minutes={countDownMinutes}
                  seconds={countDownSeconds}
                  startColor={mobileGradientStartColor}
                  endColor={mobileGradientEndColor}
                />
              )}
            </div>
            <div className={`cdt-content-second ${positionTimerText}`}>
              {timerTextSecond ? (
                <div
                  className="cdt-content-second-text"
                  style={{ color: `#${timerTextColorSecond}` }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: timerTextSecond
                    }}
                  />
                </div>
              ) : null}
              {timerCTALabelSecond ? (
                <div className="cdt-content-second-CTA">
                  <CTA
                    ctaHoverBackgroundColor={hoverBackgroundColorCTASecond}
                    ctaBackgroundColor={backgroundColorCTASecond}
                    ctaHoverBorderColor={hoverOutlineColorCTASecond}
                    ctaBorderColor={outlineColorCTASecond}
                    ctaHoverTextColor={hoverTextColorCTASecond}
                    ctaTextColor={textColorCTASecond}
                    ctaAnchorTarget={openInNewTabSecond ? "1" : "0"}
                    ctaText={timerCTALabelSecond}
                    ctaLink={timerCTALinkSecond}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
    let classesEndTimer = timerEndBackgroundImage
      ? "cdt-end-timer"
      : "cdt-end-timer cdt-min-height";
    let cdtEndTimer = (
      <div
        className={classesEndTimer}
        style={{ backgroundColor: `#${timerEndBackgroundColor}` }}
      >
        <div className="cdt-end-background-image">
          <img src={timerEndBackgroundImage} alt={timerEndBackgroundImageAltText}/>
        </div>
        <div className="cdt-end-content">
          {timerEndText ? (
            <div
              className="cdt-end-content-text"
              style={{ color: `#${timerEndTextColor}` }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: timerEndText
                }}
              />
            </div>
          ) : null}
          {timerEndCTALabel ? (
            <div className="cdt-end-content-CTA">
              <CTA
                ctaHoverBackgroundColor={timerEndHoverBackgroundColorCTA}
                ctaBackgroundColor={timerEndBackgroundColorCTA}
                ctaHoverBorderColor={timerEndHoverOutlineColorCTA}
                ctaBorderColor={timerEndOutlineColorCTA}
                ctaHoverTextColor={timerEndHoverTextColorCTA}
                ctaTextColor={timerEndTextColorCTA}
                ctaAnchorTarget={timerEndOpenInNewTab ? "1" : "0"}
                ctaText={timerEndCTALabel}
                ctaLink={timerEndCTALink}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
    let timerContents = "";
    if (!useOnlyTimerEnd && !this.state.timerEnded) {
      if (!this.state.timerEnded) {
        timerContents = cdtTimer;
      }
    } else {
      timerContents = cdtEndTimer;
    }
    return (
      <div className="count-down-timer">
        {this.state.showTimerContent ? (
          <>
            <div
              className={`cdt-player-wrapper ${
                showVideo ? "cdt-display" : "cdt-no-display"
              }`}
            >
              <ReactPlayer
                className="cdt-react-player"
                url={videoLink}
                frameBorder="0"
                controls={true}
                autoPlay={true}
                height="100%"
                width="100%"
                playing={showVideo ? true : false}
                onEnded={this.showEndTimer}
              />
              <div className="cdt-skip-video" onClick={this.skipVideo}>
                Skip Video
              </div>
            </div>
            <div
              className={`cdt-wrapper ${
                showVideo ? "cdt-no-display" : "cdt-display"
              }`}
            >
              {timerContents}
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default CountDownTimer;
