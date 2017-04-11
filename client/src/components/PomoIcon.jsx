import React from "react";

import styles from "./PomoIcon.css";

export default function PomoIcon() {
  return(
    <span className={styles.container}>
      <img
        src="tomato.svg"
        width="18px"
        height="18px"
        alt="Pomodoro"
      />
    </span>
  )
}