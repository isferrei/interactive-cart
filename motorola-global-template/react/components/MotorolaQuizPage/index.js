import "./motorolaQuizPage.global.css";
import QuizQuestion from "./components/QuizQuestion/index";
import { useState, useEffect } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  LinkedinShareButton
} from "react-share";
import { imageAccountPath } from "../ComponentRenderer/common/js/globalConstants";

const facebookIcon = imageAccountPath + "mqp-w-facebook.svg";
const twitterIcon = imageAccountPath + "mqp-w-twitter.svg";
const instaIcon = imageAccountPath + "mqp-w-instagram.svg";
const LinkedinIcon = imageAccountPath + "mqp-w-linkedin-in.svg";

const MotorolaQuizPage = props => {
  const [formData, setFormData] = useState({});
  const [unAnsweredQuestions, setUnAnsweredQuestions] = useState([]);
  const [showError, setShowError] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    let answeredQuestions = Object.keys(formData).length;
    if (
      answeredQuestions !== props.questions.length &&
      answeredQuestions >= 0
    ) {
      setIsError(true);
      let unAnsweredQuestions = [];
      props.questions.map((index, i) => {
        if (!formData.hasOwnProperty(i)) {
          unAnsweredQuestions.push(i);
        }
      });
      setUnAnsweredQuestions(unAnsweredQuestions);
    } else {
      setIsError(false);
      setShowError(false);
      setUnAnsweredQuestions([]);
    }
  };

  const findTragetUrl = () => {
    let countSierra = Object.values(formData).filter(item => {
      return item === "Sierra";
    }).length;
    let countBerlin = Object.values(formData).filter(item => {
      return item === "Berlin";
    }).length;
    let countKyoto = Object.values(formData).filter(item => {
      return item === "Kyoto";
    }).length;

    let targetURL;
    countSierra >= countBerlin && countSierra >= countKyoto
      ? (targetURL = props.firstResponseURL)
      : countSierra <= countBerlin && countBerlin >= countKyoto
      ? (targetURL = props.secondResponseURL)
      : (targetURL = props.thirdResponseURL);
    return targetURL;
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    validateForm();
    if (!isError) {
      setShowError(false);
      let targetURL = findTragetUrl();
      window.location.href = targetURL;
    } else {
      setShowError(true);
    }
  };

  const fetchAnswers = (answer, index) => {
    setFormData({ ...formData, [index]: answer });
  };

  return (
    <div
      className="motorola-quiz-page"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className="mqp-header-container">
        <div className="mqp-header-image">
          <img src={props.headerImage} alt={props.headerTitle} />
        </div>
        <div className="mqp-header-logo">
          <img src={props.headerLogoImage} alt="Header Logo" />
        </div>
        <div className="mqp-title">{props.headerTitle}</div>
        <div className="mqp-sub-title">{props.subTitle}</div>
      </div>
      <div className="mqp-questions-container">
        <form onSubmit={formSubmitHandler}>
          {props.questions.map((question, index) => {
            let errorState =
              unAnsweredQuestions &&
              unAnsweredQuestions.length > 0 &&
              unAnsweredQuestions.indexOf(index);
            return (
              <QuizQuestion
                data={question}
                index={index}
                key={index}
                fetch={fetchAnswers}
                error={showError && errorState !== -1 ? true : false}
              />
            );
          })}
          <div className="mqp-cta">
            <input type="submit" value={props.ctaText} disabled={showError} />
            {showError ? (
              <div className="mqp-error-message">{props.errorMessage}</div>
            ) : null}
          </div>
        </form>
      </div>
      {props.showShare ? (
        <div className="mqp-share-wrapper">
          <div className="mqp-share-title">{props.shareText}</div>
          <div className="mqp-share-icons-container">
            <span className="mqp-share-social-icons">
              <FacebookShareButton
                url={
                  window && window.location && window.location.href
                    ? window.location.href
                    : ""
                }
              >
                <img src={facebookIcon} alt="Facebook Icon" />
              </FacebookShareButton>
            </span>
            <span className="mqp-share-social-icons">
              <TwitterShareButton
                url={
                  window && window.location && window.location.href
                    ? window.location.href
                    : ""
                }
              >
                <img src={twitterIcon} alt="Twitter Icon" />
              </TwitterShareButton>
            </span>
            <span className="mqp-share-social-icons">
              <InstapaperShareButton
                url={
                  window && window.location && window.location.href
                    ? window.location.href
                    : ""
                }
              >
                <img src={instaIcon} alt="Instagram Icon" />
              </InstapaperShareButton>
            </span>
            <span className="mqp-share-social-icons">
              <LinkedinShareButton
                url={
                  window && window.location && window.location.href
                    ? window.location.href
                    : ""
                }
              >
                <img src={LinkedinIcon} alt="Linkedin Icon" />
              </LinkedinShareButton>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

MotorolaQuizPage.schema = {
  title: "Motorola Quiz",
  description: "Configuration for Quiz",
  type: "object",
  properties: {
    headerImage: {
      description: "Upload the header image",
      title: "Header Image",
      type: "string",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    headerLogoImage: {
      description: "Upload the header logo image",
      title: "Header Logo",
      type: "string",
      widget: {
        "ui:widget": "image-uploader"
      }
    },
    headerTitle: {
      description: "Enter the title",
      title: "Title",
      type: "string",
      default: ""
    },
    subTitle: {
      description: "Enter the sub title",
      title: "Sub Title",
      type: "string",
      default: ""
    },
    backgroundColor: {
      description:
        "Enter the background color code of the page(in #000A13 format)",
      title: "Background color",
      type: "string",
      default: "#000A13"
    },
    questions: {
      title: "Questions",
      type: "array",
      minItems: 1,
      items: {
        title: "Question",
        type: "object",
        properties: {
          question: {
            default: "",
            type: "string",
            title: "Question"
          },
          answers: {
            title: "Answers",
            type: "array",
            minItems: 1,
            maxItems: 4,
            items: {
              title: "Answer Image",
              type: "object",
              properties: {
                answerImage: {
                  description: "Answer Image",
                  title: "Answer image",
                  type: "string",
                  widget: {
                    "ui:widget": "image-uploader"
                  }
                },
                answerLabel: {
                  description: "Answer Label",
                  title: "Answer Label",
                  type: "string",
                  default: ""
                },
                choiceValue: {
                  description: "Value to which this choice corresponds to",
                  title: "Choice Value",
                  type: "string",
                  default: ""
                }
              }
            }
          }
        }
      }
    },
    ctaText: {
      description: "Enter the CTA text",
      title: "CTA text",
      type: "string",
      default: ""
    },
    errorMessage: {
      description:
        "Enter the error message will be shown if all the questions are not answered",
      title: "Enter error message",
      type: "string",
      default: ""
    },
    showShare: {
      description: "Show social share",
      title: "Show social share",
      type: "boolean",
      default: false
    },
    shareText: {
      description: "Enter the share text",
      title: "Share title",
      type: "string",
      default: ""
    },
    firstResponseURL: {
      description: "Enter the response URL for Sierra",
      title: "Sierra response URL",
      type: "string",
      default: ""
    },
    secondResponseURL: {
      description: "Enter the response URL for Berlin",
      title: "Berlin response URL",
      type: "string",
      default: ""
    },
    thirdResponseURL: {
      description: "Enter the response URL for Kyoto",
      title: "Kyoto response URL",
      type: "string",
      default: ""
    }
  }
};

export default MotorolaQuizPage;
