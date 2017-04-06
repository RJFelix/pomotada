import React from "react";
import Timer from "../components/Timer";
import CategoryTab from "../components/CategoryTab";

export default function AppRest(props) {
  return(
    <div
      className="content no-tabs"
    >
      <h1
        style={{
          textAlign: "center"
        }}
      >Take a short rest!</h1>
      <p
        style={{
          textAlign: "center"
        }}
      >And select your next task.</p>
      <Timer />
      <CategoryTab />
    </div>
  )
}