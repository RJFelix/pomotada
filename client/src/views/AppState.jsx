import React from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import { APPSTATE } from "../actions";
import AppDefault from "./AppDefault";
import AppWork from "./AppWork";
import AppRest from "./AppRest";
import AppBreak from "./AppBreak";
import AppSettings from "./AppSettings";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./AppState.css";

function AppState(props) {
  const programStateToComponent = {
    [APPSTATE.DEFAULT]: <AppDefault />,
    [APPSTATE.WORK]: <AppWork />,
    [APPSTATE.REST]: <AppRest />,
    [APPSTATE.BREAK]: <AppBreak />,
    [APPSTATE.SETTINGS]: <AppSettings />
  }

  return(
    <ReactCSSTransitionGroup
      transitionName="transition"
      transitionEnterTimeout={400}
      transitionLeaveTimeout={400}
    >
      <Paper
        className="main-paper"
        key={props.currentKey}
      >
        {programStateToComponent[props.appState]}
      </Paper>
    </ReactCSSTransitionGroup>
  )
}

function mapStateToProps(state) {
  // construct a key to uniquely identify the current state
  // to prevent unwanted transitions and ensure transitions fire
  // between two different AppWork views
  let key = state.currentProgramIndex;
  if(state.appState === APPSTATE.SETTINGS) {
    key += 0.1;
  } else if(state.appState === APPSTATE.DEFAULT) {
    key += 0.2;
  }
  return {
    appState: state.appState,
    currentKey: key
  }
}

export default connect(mapStateToProps)(AppState);