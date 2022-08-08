import React, { useState, useEffect } from "react";
import { useProduct } from "vtex.product-context";
import Modal3DRenderSeek from "./Modal3DRenderSeek";
import "./Modal3DRender.global.css";

const Modal3DRender = props => {
  const [product, setProduct] = useState({});
  const context = useProduct();

  useEffect(() => {
    setProduct(context.product);
    loadSeekSDK();
  }, [context]);

  const detectLocation = location => {
    let regex = /\/p$/i;
    let text = location.pathname;
    let matches = text.toString().match(regex);
    let seekUrl = "https://view.seekxr.com/" + props.seekToken + "/seek.min.js";

    // Not a pdp.
    if (matches == null) {
      let seekScriptLoaded = document.querySelector(`script[src="${seekUrl}"]`);
      if (seekScriptLoaded) {
        seekScriptLoaded.remove();
      }
    }
  };

  useEffect(() => {
    detectLocation(window.location);
    return () => {
      detectLocation(window.location);
    };
  }, [window.location]);

  const loadSeekSDK = () => {
    let seekUrl = "https://view.seekxr.com/" + props.seekToken + "/seek.min.js";

    let seekScriptLoaded = document.querySelector(`script[src="${seekUrl}"]`);

    if (seekScriptLoaded == null) {
      let seekScript = document.createElement("script");
      seekScript.src = seekUrl;
      document.body.appendChild(seekScript);
    }
  };

  return (
    <>
      <Modal3DRenderSeek
        modelKey={props.modelKey}
      />
    </>
  );
};

Modal3DRender.schema = {
  title: "3D/AR Experience",
  description: "3D/AR account level settings",
  type: "object",
  properties: {
    seekToken: {
      default: "",
      title: "Seek TOKEN",
      type: "string",
      description: "Token of the Seek account. Example: motorola"
    }
  }
};

export default Modal3DRender;
