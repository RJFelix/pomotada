import React from "react";
import Timer from "../components/Timer";
import CategoryTab from "../components/CategoryTab";

export default function AppRest(props) {
  return(
    <div
      className="content no-tabs"
    >
      <Timer />
      <p>Select your next task!</p>
      <CategoryTab />
    </div>
  )
}