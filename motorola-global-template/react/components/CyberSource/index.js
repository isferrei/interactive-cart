import React from "react";
import useRuntime from "../useRuntime";


const ORG_ID = "k8vif92e";
let MERCHANT_ID = "";

class CyberSource extends React.Component {
  componentDidMount() {
    const { culture } = this.props.runtime;
    MERCHANT_ID = (culture.locale == "en-US" || culture.locale == "es-US") ?  "motpcsmotd" : "motorolacavtex";
    // if (__RUNTIME__.account !== "motorolaus") return;
    const sessionId =
      localStorage.getItem("DEVICE_FINGERPRINT_SESSION_ID") ||
      "TESTECYBERSOURCE";
    this.cyberSource1(sessionId);
    this.cyberSource2(sessionId);
  }

  cyberSource1(sessionId) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://h.online-metrix.net/fp/tags.js?org_id=${ORG_ID}&session_id=${MERCHANT_ID}${sessionId}`;
    document.head.appendChild(script);
  }

  cyberSource2(sessionId) {
    const noScript = document.createElement("noscript");
    const iframe = document.createElement("iframe");
    iframe.style =
      "width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;";
    iframe.src = `https://h.online-metrix.net/fp/tags?org_id=${ORG_ID}&session_id=${MERCHANT_ID}${sessionId}`;
    noScript.appendChild(iframe);
    document.body.appendChild(noScript);
  }

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default useRuntime(CyberSource);