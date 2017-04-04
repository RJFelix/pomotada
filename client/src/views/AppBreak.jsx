import React from "react";
import Timer from "../components/Timer";

export default function AppBreak(props) {
  return(
    <div
      className="content no-tabs"
    >
      <Timer />
      <p>Take a break - you've earned it!</p>
    </div>
  )
}