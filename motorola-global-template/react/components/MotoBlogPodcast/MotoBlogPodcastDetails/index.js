import { Component } from "react";
import "./MotoBlogPodcastDetails.global.css";
import MotoBlogShare from "./MotoBlogShare/index";
import {
  handleResize,
  debounce
} from "../../ComponentRenderer/common/js/deviceDetection";

class MotoBlogPodcastDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDevice: handleResize()
    };
  }

  componentDidMount() {
    this.setState({ checkDevice: handleResize() });
    window.addEventListener(
      "resize",
      debounce(() => {
        this.setState({ checkDevice: handleResize() });
      }, 500)
    );
  }

  static schema = {
    title: "Motorola Blog - Podcast Details",
    description: "Motorola Blog - Podcast Details",
    type: "object",
    properties: {
      showPodcastDetails: {
        type: "boolean",
        title: "Show Podcast Details",
        default: false
      },
      podcastListPageTitle: {
        type: "string",
        title: "Podcast List Page Title",
        description: "Enter Podcast List Page Title",
        default: "Motorola Podcast"
      },
      podcastListingPagePath: {
        description: "Podcast Listing Page Path",
        title: "Podcast Listing Page Path",
        type: "string"
      },
      podcastTitle: {
        type: "string",
        title: "Podcast Title",
        description: "Enter Podcast Title",
        default: ""
      },
      podcastTranscript: {
        type: "string",
        title: "Podcast Transcript",
        widget: {
          "ui:widget": "textarea"
        }
      },
      blogHomePagePath: {
        description: "Blog Homepage Path",
        title: "Blog Homepage Path",
        type: "string"
      },
      podcastId: {
        type: "string",
        title: "Podcast Id",
        description: "Ex: 71mvGXupfKcmO6jlmOJQTP"
      },
      socialShareText: {
        type: "string",
        title: "Social Share - text",
        default: ""
      }
    }
  };

  render() {
    const {
      showPodcastDetails,
      podcastListPageTitle,
      podcastTitle,
      blogHomePagePath,
      podcastTranscript,
      podcastId,
      socialShareText,
      podcastListingPagePath
    } = this.props;

    const {
      checkDevice: { isMobile, isTablet, isDesktop, isWide }
    } = this.state;

    if (!showPodcastDetails) {
      return null;
    }

    // Max 45 characters for mobile, post that will add ...
    // Home, > and " " takes 10 chars.
    let allowedPodcastTitle = "";
    if (
      isMobile &&
      podcastTitle.length > 0 &&
      podcastListPageTitle.length > 0
    ) {
      allowedPodcastTitle =
        podcastTitle.length > 35 - podcastListPageTitle.length
          ? podcastTitle.slice(0, 35 - podcastListPageTitle.length) + "..."
          : podcastTitle;
    }

    return (
      <>
        <div className="moto-blog-podcast-details">
          <div className="mbpd-navigation-breadcrumb">
            <a
              className="mbpd-home-link"
              href={
                blogHomePagePath && blogHomePagePath != ""
                  ? blogHomePagePath
                  : "javascript:void(0);"
              }
            >
              Home
            </a>
            <span className="mbpd-separator">&#62;</span>
            <a
              className="mbpd-breadcrumb-podcast-list-title"
              href={
                podcastListingPagePath && podcastListingPagePath != ""
                  ? podcastListingPagePath
                  : "javascript:void(0);"
              }
            >
              {podcastListPageTitle}
            </a>
            <span className="mbpd-separator">&#62;</span>
            <span className="mbpd-breadcrumb-podcast-title">
              {allowedPodcastTitle !== "" ? allowedPodcastTitle : podcastTitle}
            </span>
          </div>
          <div className="mbpd-podcast-play-section">
            <iframe
              src={"https://open.spotify.com/embed-podcast/episode/" + podcastId}
              width="100%"
              height="232"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
              tabIndex="-1"
            ></iframe>
          </div>
          <div className="mbpd-transcript">
            <div
              dangerouslySetInnerHTML={{
                __html: podcastTranscript
              }}
            />
          </div>
        </div>
        <div className="mbpd-social">
          <MotoBlogShare socialShareText={socialShareText} />
        </div>
      </>
    );
  }
}

export default MotoBlogPodcastDetails;
