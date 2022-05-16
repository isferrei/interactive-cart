import React, { useEffect, useState, useRef } from "react";
import { loadReCaptcha } from "react-recaptcha-google";
import { useRuntime } from "vtex.render-runtime";
import axios from "axios";
import "./MotoStoreWrapper.global.css";
import "./SimpleGrid.min.global.css";
import { getRootPath } from "../../utils/helpers";
const MotoStoreWrapper = props => {
  const [scLoaded, setScLoaded] = useState(false);
  const { children } = props;
  const { navigate } = useRuntime();
  const motoStoreWrapperRef = useRef(null);
  useEffect(() => {
    loadReCaptcha();
  }, []);

  useEffect(() => {
    redirectSc();
  }, []);


  const redirectSc = async () => {
    if (!scLoaded) {
      setScLoaded(true);
      const session = (
        await axios({
          url: `${getRootPath}/api/sessions?items=*`
        })
      ).data;
      console.log("session", session);
      const {
        namespaces: {
          store: { channel }
        }
      } = session;
      const sc = channel.value;
      if (
        sc.toString() === "5" &&
        session.namespaces.profile.isAuthenticated.value == "false"
      ) {
        navigate({
          to: `${getRootPath}/login`
        });
      }
    }
  };
  return <div ref={motoStoreWrapperRef}>{children}</div>;
};

export default MotoStoreWrapper;
