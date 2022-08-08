import "./ArrowUp.global.css";
import React from "react";
import $ from "jquery";
import scrollup from './assets/scrollup.png'

export default function ArrowUp() {
  let loading = true;

  setTimeout(() => {
    loading = false;
  }, 1500);

  const movePage = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  window.onscroll = () => {
    const top = $(window).scrollTop();
    if (top > 200) {
      document.getElementById("arrowUp").style.visibility = "visible";
    } else {
      document.getElementById("arrowUp").style.visibility = "hidden";
    }
  };

  return (
    <div
      id="arrowUp"
      onClick={() => movePage()}
      className={loading ? "dn" : "db"}
    >
    </div>
  );
}
