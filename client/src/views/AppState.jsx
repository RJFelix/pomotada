import React from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import { advanceProgram, confirmStateChange, APPSTATE } from "../actions";
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
    [APPSTATE.WORK]: <AppWork key={props.currentKey} />,
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
  let key = state.currentProgramIndex;
  if(state.appState === APPSTATE.SETTINGS) {
    key += 0.1;
  } else if(state.apPState === APPSTATE.DEFAULT) {
    key += 0.2;
  }
  return {
    appState: state.appState,
    currentKey: key
  }
}

export default connect(mapStateToProps)(AppState);