import { Component } from "react";
import Modal from "react-modal";
import {
  handleChangeGlobal,
  validateFormGlobal,
  sendFormGlobal,
  prepareAccountUrl,
  accountsTest
} from "../Common/Handlers";
import Radium, { StyleRoot } from "radium";
import schemaProperties from "../Common/schemaProperties.json";
import radiumStyles from "../Common/radiumStyles.json";
import FormGroupInputText from "../components/FormGroupInputText/index.jsx";
import FormGroupYesNo from "../components/FormGroupYesNo/index.jsx";
import FormGroupCheckbox from "../components/FormGroupCheckbox/index.jsx";
import "./MotoRegistrationModal.global.css";
import Cookies from "universal-cookie";
import "../Common/SpinnerLine.global.css";

Modal.setAppElement("body");

class MotoRegModalContent extends Component {
  constructor(props) {
    super(props);

    let self = this;

    let optInDefault;
    if (props.optIn) {
      switch (props.optIn.defaultValue) {
        case "Y":
          optInDefault = true;
          break;
        case "N":
          optInDefault = false;
          break;
        default:
          optInDefault = "";
      }
    } else {
      optInDefault = "";
    }

    const ageCheckValue =
      (props.ageCheck && props.ageCheck.defaultValue) || false;

    this.state = {
      modalIsOpen: false,
      showForm: true,
      showSpinner: false,
      submitButtonEnabled: true,
      isActive: props.isActive || false,
      form: {
        firstName: "",
        lastName: "",
        email: "",
        optIn: optInDefault,
        ageConfirm: ageCheckValue
      },
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        optIn: "",
        ageConfirm: ""
      }
    };

    this.customStyles = {
      modalContent: {
        overflow: "auto",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        fontSize: "14px",
        backgroundColor: "#30384c",

        "@media only screen and (min-width: 768px)": {
          backgroundSize: "125% 100%",
          backgroundPositionX: "right",
          backgroundImage: `url(${props.formBackgroundImageUrlTablet})`,
          boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
          width: "600px"
        },

        "@media only screen and (min-width: 934px)": {
          width: "900px"
        },

        "@media only screen and (min-width: 1058px)": {
          backgroundSize: "100% 100%",
          backgroundImage: `url(${props.formBackgroundImageUrl})`,
          width: "1050px"
        }
      },
      modalCloseButton: {
        padding: "0",
        cursor: "pointer",
        background: "transparent",
        border: "0",
        WebkitAppearance: "none",
        margin: "20px 20px 0 0",
        opacity: "1",
        float: "right",
        position: "absolute",
        right: "0",
        zIndex: "1000",

        "@media only screen and (min-width: 768px)": {
          margin: "30px 30px 0 0"
        }
      },
      modalCloseButtonImage: {
        width: "30px",
        height: "30px",
        cursor: "pointer",
        verticalAlign: "middle",
        border: "0"
      },
      modalBody: {
        "@media only screen and (min-width: 768px)": {
          padding: "0 40px 0 0"
        },

        "@media only screen and (min-width: 992px)": {
          padding: "0 60px 0 0"
        }
      },
      modalBodyInvisible: {
        visibility: "hidden"
      },
      formBodyWrapper: {
        marginTop: "23px",

        "@media only screen and (max-width: 413px)": {
          marginTop: "10px"
        },

        "@media only screen and (min-width: 768px)": {
          marginTop: "29px"
        },

        "@media only screen and (min-width: 992px)": {
          marginTop: "91px"
        }
      },
      rowMarginFix: {
        marginLeft: "0",
        marginRight: "0"
      },
      formHeader: {
        display: "none",

        "@media only screen and (min-width: 768px)": {
          margin: "0 150px 13px 0",
          display: "block"
        },

        "@media only screen and (min-height: 320px) and (min-width: 568px)": {
          margin: "0 300px 13px 0",
          display: "block"
        },

        "@media only screen and (min-height: 375px) and (min-width: 812px)": {
          margin: "0 50px 13px 0",
          display: "block"
        },

        "@media only screen and (min-height: 800px) and (min-width: 1280px)": {
          margin: "0 150px 13px 0",
          display: "block"
        },

        "@media only screen and (min-height: 834px) and (min-width: 1112px)": {
          margin: "0 150px 13px 0",
          display: "block"
        },

        "@media only screen and (min-height: 1024px) and (min-width: 768px)": {
          margin: "0 50px 13px 0",
          display: "block"
        },

        "@media only screen and (min-height: 1024px) and (min-width: 1366px)": {
          margin: "0 150px 13px 0",
          display: "block"
        }
      },
      formDescription: {
        margin: "26px 0 10px",

        "@media only screen and (max-width: 413px)": {
          margin: "10px 0"
        }
      },
      formGroup: {
        marginBottom: "15px"
      },
      cta: {
        color: `${(props.ctaButton && props.ctaButton.color) || "#FFFFFF"}`,
        border: `1px solid ${(props.ctaButton && props.ctaButton.borderColor) ||
          "#FFFFFF"}`,
        float: "right",

        ":hover": {
          backgroundColor: `${(props.ctaButton &&
            props.ctaButton.bgColorHover) ||
            "rgba(48,56,76,1.0)"}`,
          border: `1px solid ${(props.ctaButton &&
            props.ctaButton.borderColorHover) ||
            "#FFFFFF"}`
        }
      },
      disableEvents: {
        pointerEvents: "none"
      },
      footerDisclaimer: {
        marginTop: "22px",
        marginBottom: "31px",
        fontSize: "11px",
        opacity: ".4",

        "@media only screen and (max-width: 413px)": {
          marginTop: "10px",
          marginBottom: "16px"
        }
      },
      errorMessage: {
        bottom: "-16px"
      },
      thankYouContent: {
        backgroundImage: `url(${(this.props.thankYou &&
          this.props.thankYou.backgoundImageUrl) ||
          ""})`,
        position: "absolute",
        top: "0",
        bottom: "0",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formHandler = this.formHandler.bind(this);

    this.cookies = new Cookies();

    if (this.state.isActive) {
      let timer = setInterval(function() {
        if (window && window.localStorage) {
          clearInterval(timer);
          const regSent = window.localStorage.getItem("regsent");
          if (!regSent) {
            self.startTimer();
          }
        }
      }, 100);
    }

    setTimeout(() => {
      if (window.localStorage.getItem("test") === "1") {
        accountsTest(this.cookies.get("vtex_binding_address"));
      }
    }, 3000);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  startTimer() {
    setTimeout(() => {
      this.setState({ modalIsOpen: true });
    }, (this.props.timeout || 0) * 1000);
  }

  formHandler(event) {
    let self = this;
    event.preventDefault();

    const { isValid, errors } = validateFormGlobal(this.state, this.props);
    this.setState({ errors });

    if (!isValid) {
      return;
    }

    const accountUrl = prepareAccountUrl(
      this.cookies.get("vtex_binding_address")
    );
    this.setState({ submitButtonEnabled: false, showSpinner: true });

    sendFormGlobal(this.state.form, {
      ...this.props,
      accountUrl
    })
      .then(function(response) {
        let contentComponent = document.querySelector(".modalComponentContent");
        contentComponent.scrollTop = 0;
        self.setState({ showForm: false, showSpinner: false });
        window.localStorage.setItem("regsent", "1");
      })
      .catch(function(error) {
        self.setState({ submitButtonEnabled: true, showSpinner: false });
        console.log(error);
      });
  }

  handleChange(event) {
    let { name, value } = event.target;
    const newState = handleChangeGlobal(this.state, this.props, name, value);
    this.setState(newState);
  }

  getFormContent() {
    
    const privacyPolicy = {
      marginTop: "22px",
      marginBottom: "31px",
      fontSize: "11px",
      opacity: "0.4"
    };

    const ppLink = {
      color: "#ffffff",
      textDecoration: "underline"
    };
    
    const {disclaimerSummary} = this.props;

    const externalStylesRadioText = {};
    const externalStylesCheckbox = {};

    return (
      <div>
        <div
          className="col-sm-offset-5 col-sm-7 col-md-offset-6 col-md-6"
          style={
            this.state.showForm
              ? this.customStyles.modalBody
              : [
                  this.customStyles.modalBody,
                  this.customStyles.modalBodyInvisible
                ]
          }
        >
          <div style={this.customStyles.formBodyWrapper}>
            <form id="regform" onSubmit={this.formHandler}>
              <div className="row" style={this.customStyles.formHeader}>
                <div className="col-xs-12">
                  <img src={this.props.logoImageUrl} alt={this.props.logoImageAltText}/>
                </div>
              </div>
              <div className="row" style={this.customStyles.formDescription}>
                <div className="col-xs-12">{this.props.formDescription}</div>
              </div>
              <div className="row" style={this.customStyles.rowMarginFix}>
                <div className="col-xs-12 col-sm-6">
                  <FormGroupInputText
                    id="firstName"
                    placeholder={
                      (this.props.firstName &&
                        this.props.firstName.placeholder) ||
                      ""
                    }
                    value={this.state.form.firstName}
                    onChange={this.handleChange}
                    errorMessage={this.state.errors.firstName}
                    externalStyles={externalStylesRadioText}
                  />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <FormGroupInputText
                    id="lastName"
                    placeholder={
                      (this.props.lastName &&
                        this.props.lastName.placeholder) ||
                      ""
                    }
                    value={this.state.form.lastName}
                    onChange={this.handleChange}
                    errorMessage={this.state.errors.lastName}
                    externalStyles={externalStylesRadioText}
                  />
                </div>
              </div>
              <div className="row" style={this.customStyles.rowMarginFix}>
                <div className="col-xs-12">
                  <FormGroupInputText
                    id="email"
                    placeholder={
                      (this.props.email && this.props.email.placeholder) || ""
                    }
                    value={this.state.form.email}
                    onChange={this.handleChange}
                    errorMessage={this.state.errors.email}
                    externalStyles={externalStylesRadioText}
                  />
                </div>
              </div>
              <div className="row" style={this.customStyles.rowMarginFix}>
                <div className="col-xs-12">
                  <FormGroupYesNo
                    name="optIn"
                    idYes="optInYes"
                    idNo="optInNo"
                    checkedYes={this.state.form.optIn}
                    checkedNo={
                      this.state.form.optIn !== "" && !this.state.form.optIn
                    }
                    onChange={this.handleChange}
                    labelMain={
                      (this.props.optIn && this.props.optIn.labelMain) || ""
                    }
                    labelYes={
                      (this.props.optIn && this.props.optIn.labelYes) || ""
                    }
                    labelNo={
                      (this.props.optIn && this.props.optIn.labelNo) || ""
                    }
                    errorMessage={this.state.errors.optIn}
                    externalStyles={externalStylesRadioText}
                  />
                </div>
              </div>
              <div className="row" style={this.customStyles.rowMarginFix}>
                <div className="col-xs-12">
                  <FormGroupCheckbox
                    name="ageConfirm"
                    checked={this.state.form.ageConfirm}
                    onChange={this.handleChange}
                    label={
                      (this.props.ageCheck && this.props.ageCheck.label) || ""
                    }
                    errorMessage={this.state.errors.ageConfirm}
                    externalStyles={externalStylesCheckbox}
                  />
                </div>
              </div>
              <div className="row" style={this.customStyles.rowMarginFix}>
                <div className="col-xs-12">
                  <div style={radiumStyles.formElement}>
                    <button
                      type="submit"
                      key="submitFormBtn"
                      value="Register"
                      style={[
                        radiumStyles.cta,
                        this.customStyles.cta,
                        this.state.submitButtonEnabled
                          ? ""
                          : this.customStyles.disableEvents
                      ]}
                    >
                      {this.props.ctaButton && this.props.ctaButton.mainLabel}
                    </button>
                  </div>
                  
                </div>
                <div className="col-xs-12"><div style={privacyPolicy}>
                    {this.props.disclaimerSummary && (
                      <div>
                        {disclaimerSummary.label} 
                        <a style={ppLink} href={disclaimerSummary.urlLink} target="_blank">
                          {disclaimerSummary.urlText === "" ? disclaimerSummary.urlLink : disclaimerSummary.urlText}
                        </a>
                      </div>
                    )}
                  </div></div>
              </div>
              <div className="row" style={this.customStyles.rowMarginFix}>
                <div className="col-xs-12">
                  <div style={this.customStyles.footerDisclaimer}>
                    {this.props.disclaimer}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {!this.state.showForm && this.getThanksContent()}
      </div>
    );
  }

  getThanksContent() {
    return (
      <div
        className="thanksContent"
        style={[
          radiumStyles.thankYouContent,
          this.customStyles.thankYouContent
        ]}
      >
        <div style={radiumStyles.thankYouTitle}>
          {this.props.thankYou && this.props.thankYou.header}
        </div>
        <div style={radiumStyles.thankYouDescription}>
          <span>
            {this.props.thankYou && this.props.thankYou.subHeaderFirstRow}
          </span>
          <p>{this.props.thankYou && this.props.thankYou.subHeaderSecondRow}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="MotoRegModal" className="modal">
        {this.state.showSpinner && (
          <div className="loadingBackdrop">
            <div className="loader"></div>
          </div>
        )}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick={false}
          className={
            this.state.showForm
              ? "modalComponentContent"
              : "modalComponentThanksContent"
          }
          overlayClassName="modalComponentOverlay"
          contentLabel="Registration modal"
        >
          <div style={this.customStyles.modalContent}>
            <button
              type="button"
              key="closeModalBtn"
              onClick={this.closeModal}
              style={this.customStyles.modalCloseButton}
            >
              <img
                src={this.props.closeBtnUrl}
                alt={this.props.closeBtnImageAltText}
                style={this.customStyles.modalCloseButtonImage}
              />
            </button>
            {this.state.showForm && (
              <div style={radiumStyles.mobileImage}>
                <img src={this.props.mobileImage} 
                  alt={this.props.formBackgroundImageAltText} />
              </div>
            )}
            {this.getFormContent()}
          </div>
        </Modal>
      </div>
    );
  }
}

MotoRegModalContent = Radium(MotoRegModalContent);

class MotoRegModal extends Component {
  static schema = {
    title: "Moto Registration Modal",
    description: "Moto Modal with registration form",
    type: "object",
    properties: {
      isActive: {
        type: "boolean",
        title: "Activate modal"
      },
      timeout: {
        type: "integer",
        title: "Timeout before open modal (seconds)"
      },
      ...schemaProperties,
      closeBtnUrl: {
        type: "string",
        title: "Close Button Image Url"
      },
      closeBtnImageAltText: {
        default: "",
        title: "Close button image alt text",
        type: "string"
      },
    }
  };

  render() {
    return (
      <StyleRoot>
        <MotoRegModalContent {...this.props}></MotoRegModalContent>
      </StyleRoot>
    );
  }
}

export default MotoRegModal;
