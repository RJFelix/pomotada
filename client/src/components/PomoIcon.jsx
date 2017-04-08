import React from "react";

import "./PomoIcon.css";

export default function PomoIcon(props) {
  return(
    <span className="pomo-img-container">
      <img
        src="tomato.svg"
        width="18px"
        height="18px"
        className="pomo-img"
        alt="Pomodoro"
      />
    </span>
  )
}