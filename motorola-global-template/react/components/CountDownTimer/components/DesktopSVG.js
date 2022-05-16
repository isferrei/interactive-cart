import React from "react";
import "./DesktopSVG.global.css";

const DesktopSVG = props => {
  const {
    days,
    hours,
    minutes,
    seconds,
    daysStartColor,
    daysEndColor,
    hoursStartColor,
    hoursEndColor,
    minutesStartColor,
    minutesEndColor,
    secondsStartColor,
    secondsEndColor,
    totalDays
  } = props;
  let dataDesktopSvg = [];
  let xIndex = 20;
  let strokeDashArray = Math.floor(2 * Math.PI * 30);
  const dataMapper = {
    1: "days",
    2: "hours",
    3: "minutes",
    4: "seconds"
  };
  for (let i = 1; i <= 4; i++) {
    dataDesktopSvg.push(
      <>
        <defs>
          <linearGradient
            id={`desktop-gradient${i}`}
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
          >
            <stop
              stop-color={
                i === 1
                  ? `#${daysStartColor}`
                  : i === 2
                  ? `#${hoursStartColor}`
                  : i === 3
                  ? `#${minutesStartColor}`
                  : i === 4
                  ? `#${secondsStartColor}`
                  : null
              }
              offset="10%"
              stop-opacity="1"
            />
            <stop
              stop-color={
                i === 1
                  ? `#${daysEndColor}`
                  : i === 2
                  ? `#${hoursEndColor}`
                  : i === 3
                  ? `#${minutesEndColor}`
                  : i === 4
                  ? `#${secondsEndColor}`
                  : null
              }
              offset="90%"
              stop-opacity="1"
            />
          </linearGradient>
        </defs>
        <text
          class="text value"
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
          class="text label"
          text-anchor="middle"
          x={xIndex * i + "%"}
          y="68%"
          dy=".35em"
          fill="white"
        >
          {dataMapper[i]}
        </text>
        <circle
          class="circle dashed"
          r="30"
          cx={xIndex * i * 4}
          cy="40"
          stroke-dasharray="1, 5"
        />
        <circle
          class="circle gradient animated"
          r="30"
          cx={xIndex * i * 4}
          cy="40"
          fill="none"
          stroke={`url(#desktop-gradient${i})`}
          transform={"rotate(-90 " + (xIndex * i * 4 - 200) + " 0)"}
          style={{
            strokeDashoffset:
              i === 1
                ? Math.floor(
                    totalDays ? (strokeDashArray * days) / totalDays : 0
                  ) + "px"
                : i === 2
                ? Math.floor((strokeDashArray * hours) / 24) + "px"
                : i === 3
                ? Math.floor((strokeDashArray * minutes) / 60) + "px"
                : i === 4
                ? Math.floor((strokeDashArray * seconds) / 60) + "px"
                : null,
            strokeDasharray: strokeDashArray + "px"
          }}
        />
      </>
    );
  }
  return (
    <svg class="timer large" viewBox="0 0 400 80">
      {dataDesktopSvg}
    </svg>
  );
};

export default DesktopSVG;
