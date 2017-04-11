import React from "react";
import CategoryTab from "../components/CategoryTab";
import styles from "./States.css";

export default function AppDefault() {
  return(
    <div className={styles.content}    >
      <CategoryTab />
    </div>
  )
}