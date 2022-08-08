import React, { Fragment } from "react";
import axios from "axios";
import "./motoMarketing.global.css";
import MarketingPages from "./components/MarketingPages";
import {
  dataEntity,
  schemaName,
  cookieUrl,
  route
} from "./marketingPageHelpers";

class MotoMarketing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonObj: null
    };
  }

  static schema = {
    title: "Image settings",
    description: "Image load settings",
    type: "object",
    properties: {
      heroComponentImageSource: {
        type: "boolean",
        title: "Enable to pull image from current account(for NPI purposes)",
        default: false
      }
    }
  };

  callAPI = () => {
    if (cookieUrl && route && window.motoDataLayer !== undefined) {
      let getAccountName = "motorola" + window.motoDataLayer.locale;
      try {
        axios.get(cookieUrl).then(respons => {
          if (respons.data.namespaces.cookie.VtexIdclientAutCookie.value) {
            let schemaExistsCheckUrl = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/dataentities/${dataEntity}/schemas/${schemaName}`;
            axios
              .get(schemaExistsCheckUrl, {
                headers: {
                  VtexIdclientAutCookie:
                    respons.data.namespaces.cookie.VtexIdclientAutCookie.value
                }
              })
              .then(response => {
                if (response.status === 200) {
                  let searchUrl = `${window.location.origin + (("undefined" != typeof __RUNTIME__ && null !== __RUNTIME__ ? __RUNTIME__.rootPath : void 0) || "")}/api/dataentities/${dataEntity}/search?_where=pathAlias="${
                    route[1].substr(1).split("?")[0]
                  }"&_schema=${schemaName}&_fields=_all`;
                  axios
                    .get(searchUrl, {
                      headers: {
                        VtexIdclientAutCookie:
                          respons.data.namespaces.cookie.VtexIdclientAutCookie
                            .value
                      }
                    })
                    .then(respo => {
                      if (respo.status === 200) {
                        if (
                          respo != null &&
                          respo != undefined &&
                          respo.data &&
                          respo.data.length > 0
                        ) {
                          let jsonResponse = JSON.parse(
                            respo.data[0].pageContents
                          );
                          this.setState({ jsonObj: jsonResponse });
                        }
                      }
                    });
                }
              });
          }
        });
      } catch (error) {
        let errorMessage = error.response
          ? `${error.message} <br> ${error.response.data}`
          : error.message;
        this.setState({ loader: false });
        this.setState({ showErrorStatus: errorMessage });
        return false;
      }
    } else {
      setTimeout(this.callAPI, 1000);
    }
  };

  componentDidMount() {
    this.callAPI();
  }

  render = () => {
    const {
      heroComponentImageSource
    } = this.props;

    return (
      <>
        <div className="moto-marketing-wrapper">
          <MarketingPages jsonObj={this.state.jsonObj} heroComponentImageSrc={heroComponentImageSource} />
        </div>
      </>
    );
  };
}

export default MotoMarketing;