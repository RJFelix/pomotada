import React from "react";
import Timer from "../components/Timer";

export default function AppBreak(props) {
  return(
    <div
      className="content no-tabs"
    >
      <h1
        style={{
          textAlign: "center"
        }}
      >Take a break!</h1>
      <p
        style={{
          textAlign: "center"
        }}
      >You've earned it.</p>
      <Timer />
    </div>
  )
}