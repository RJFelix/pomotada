import React from "react";
import Paper from "material-ui/Paper";
import { advanceProgram, confirmStateChange, APPSTATE } from "../actions";
import AppDefault from "./AppDefault";
import AppWork from "./AppWork";
import AppRest from "./AppRest";
import AppBreak from "./AppBreak";
import AppSettings from "./AppSettings";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./AppState.css";

const programStateToComponent = {
  [APPSTATE.DEFAULT]: <AppDefault />,
  [APPSTATE.WORK]: <AppWork />,
  [APPSTATE.REST]: <AppRest />,
  [APPSTATE.BREAK]: <AppBreak />,
  [APPSTATE.SETTINGS]: <AppSettings />
}

export default function AppState(props) {
  return(
    <ReactCSSTransitionGroup
      transitionName="transition"
      transitionEnterTimeout={400}
      transitionLeaveTimeout={400}
    >
      <Paper
        className="main-paper"
        key={Math.random()}
      >
        {programStateToComponent[props.state]}
      </Paper>
    </ReactCSSTransitionGroup>
  )
}

