import React from "react";
import "./MobileSVG.global.css";

const MobileSVG = props => {
  const { days, hours, minutes, seconds, startColor, endColor } = props;
  let dataMobileSvg = [];
  let xIndex = 20;
  const dataMapper = {
    1: "days",
    2: "hours",
    3: "minutes",
    4: "seconds"
  };

  for (let i = 1; i <= 4; i++) {
    dataMobileSvg.push(
      <>
        <text
          class="gif"
          text-anchor="middle"
          x={xIndex * i + "%"}
          y="45%"
          dy=".35em"
        >
          {i === 1
            ? days
            : i === 2
            ? hours
            : i === 3
            ? minutes
            : i === 4
            ? seconds
            : null}
        </text>
        <text
          class="label"
          text-anchor="middle"
          x={xIndex * i + "%"}
          y="70%"
          dy=".35em"
        >
          {dataMapper[i]}
        </text>
        {i <= 3 ? (
          <>
            <rect width="3" height="3" x={xIndex * i + 10 + "%"} y="40%" />
            <rect width="3" height="3" x={xIndex * i + 10 + "%"} y="50%" />
          </>
        ) : null}
      </>
    );
  }

  return (
    <svg class="timer small" viewBox="0 0 350 75">
      <defs>
        <linearGradient id="mobile-gradient" gradientUnits="userSpaceOnUse">
          <stop stop-color={`#${startColor}`} offset="10%" stop-opacity="1" />
          <stop stop-color={`#${endColor}`} offset="90%" stop-opacity="1" />
        </linearGradient>
      </defs>

      <g fill="url(#mobile-gradient)">{dataMobileSvg}</g>
    </svg>
  );
};

export default MobileSVG;
