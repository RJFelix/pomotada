import React from "react";
import Timer from "../components/Timer";
import { connect } from "react-redux";
import { stopTimer } from "../actions";
import styles from "./States.css";

function AppWork(props) {
  return(
    <div
      className={[styles.content, styles.noTabs].join(" ")}
    >
      <h1
        style={{
          textAlign: "center"
        }}
      >{props.activeTask}</h1>
      <Timer />
    </div>
  )
}

function mapStateToProps(state) {
  const task = state.todos.find((todo) => todo.active);
  let taskText;
  if(task) {
    taskText = task.text;
  } else {
    taskText = "No task selected!";
  }
  return {
    activeTask: taskText
  }
}

function mapDispatchToProps(dispatch) {
  return {
    stopWork: () => {
      dispatch(stopTimer());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWork);