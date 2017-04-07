import React from "react";
import Timer from "../components/Timer";
import CategoryTab from "../components/CategoryTab";
import { connect } from "react-redux";

function AppRest(props) {
  return(
    <div
      className="content no-tabs"
    >
      <h1
        style={{
          textAlign: "center"
        }}
      >Take a short rest!</h1>
      {props.shouldSelectTask &&
      <p
        style={{
          textAlign: "center"
        }}
      >And select your next task.</p>
      }
      <Timer />
      {props.shouldSelectTask &&
      <CategoryTab inRest={true} />
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    shouldSelectTask: state.shouldSelectTask
  }
}

export default connect(mapStateToProps)(AppRest);