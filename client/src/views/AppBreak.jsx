import React from "react";
import Timer from "../components/Timer";
import styles from "./States.css";

export default function AppBreak() {
  return(
    <div
      className={[styles.content, styles.noTabs].join(" ")}
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