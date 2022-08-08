import React, { useEffect } from "react";
import './my-account-wrapper.global.css';
import { useRuntime } from "vtex.render-runtime";
import { path } from "ramda";

const BLOCKER_STATUS = "window-to-cancel";

export default ({ children }) => {
  const runtime = useRuntime();
  useEffect(() => {
    window.addEventListener("DOMNodeInserted", e => {
      hideSingleOrderCancelButton(e);
      hideOrdersCancelButton(e);
      hideStatusTimeline(e);
    });

    return () => {};
  });

  const hideSingleOrderCancelButton = e => {
    if (__RUNTIME__.account !== "motorolaus" && __RUNTIME__.account !== "motorolasandbox") return;
    if (runtime.page !== "store.account") return;
    if (!e.target.querySelector) return;
    const status = e.target.querySelector(
      ".vtex-my-orders-app-3-x-orderDetails time div span"
    );
    if (!status) return;
    if (!status.innerText) return;
    console.log("my account status", status);
    const cancelButton = status
      .closest(".vtex-my-orders-app-3-x-orderDetails")
      .querySelector("div > div:nth-child(2) > ul > li:nth-child(2)");
    if (!cancelButton) return;
    console.log("my account cancelButton", cancelButton);

    if (
      status.innerText
        .toLowerCase()
        .split(" ")
        .join("-") === BLOCKER_STATUS
    ) {
      cancelButton.style.display = "none";
    }
  };

  const hideOrdersCancelButton = e => {
    if (
      __RUNTIME__.account !== "motorolaus" && 
      __RUNTIME__.account !== "motorolasandbox" &&
      __RUNTIME__.account !== "motorolacaen" && 
      __RUNTIME__.account !== "motorolacafr" && 
      __RUNTIME__.account !== "motorolacasandbox"
      ) {
      return
    };
    if (runtime.page !== "store.account") return;
    if (!e.target.querySelectorAll) return;
    const orderCards = e.target.querySelectorAll(
      ".vtex-my-orders-app-3-x-orderCard"
    );
    if (!orderCards.length) return;
    for (var i = 0; i < orderCards.length;i++) {
      const orderCard = orderCards[i];
      if (!orderCard) continue;
      console.log('orderCard', orderCard.getAttribute('status'));
      if (orderCard.getAttribute('status') === BLOCKER_STATUS) continue;
      const cancelButton = orderCard.querySelector(
        ".myo-cancel-btn"
      );
      if (!cancelButton) continue;
      cancelButton.style.display = "none";
    }
  };

  const hideStatusTimeline = e => {
    if (__RUNTIME__.account !== "motorolaus" && __RUNTIME__.account !== "motorolasandbox") return;
    if (runtime.page !== "store.account") return;
    if (!e.target.querySelector) return;
    const statusTimeline = e.target.querySelector(".vtex-my-orders-app-3-x-orderDetails .myo-progress-bar .myo-progress-bar");
    if (!statusTimeline) return;
    console.log('statusTimeline', statusTimeline)
    statusTimeline.style.display = "none";
    const parentProgressBar = path(["parentNode", "parentNode"], statusTimeline);
    console.log("parentProgressBar", parentProgressBar);
    if (!parentProgressBar) return;
    parentProgressBar.classList.remove("h4-plus");
    if (statusTimeline.parentNode.querySelector(".cby-timeline-link")) return;
    statusTimeline.parentNode.insertAdjacentHTML(
      "beforeend",
      '<div class="cby-timeline-link">To check your order status, <a target="_blank" href="https://motorola-global-portal.custhelp.com/app/mcp/track-my-stuff-landing">click here</a>.</div>'
    );
  }

  return children;
};
