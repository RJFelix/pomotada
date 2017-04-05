import React from "react";
import Paper from "material-ui/Paper";
import { APPSTATE } from "../actions";
import AppDefault from "./AppDefault";
import AppWork from "./AppWork";
import AppRest from "./AppRest";
import AppBreak from "./AppBreak";
import AppSettings from "./AppSettings";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./AppState.css";

export default function AppState(props) {
  return(
    <ReactCSSTransitionGroup
      transitionName="transition"
      transitionEnterTimeout={400}
      transitionLeaveTimeout={400}
    >
      { props.state === APPSTATE.WORK &&
      <Paper
        className="main-paper"
        key={APPSTATE.WORK}
      >
        <AppWork />
      </Paper>
      }
      { props.state === APPSTATE.DEFAULT &&
      <Paper
        className="main-paper"
        key={APPSTATE.DEFAULT}
      >
        <AppDefault />
      </Paper>
      }
      { props.state === APPSTATE.REST &&
      <Paper
        className="main-paper"
        key={APPSTATE.REST}
      >
        <AppRest />
      </Paper>
      }
      { props.state === APPSTATE.BREAK &&
      <Paper
        className="main-paper"
        key={APPSTATE.BREAK}
      >
        <AppBreak />
      </Paper>
      }
      { props.state === APPSTATE.SETTINGS &&
      <Paper
        className="main-paper"
        key={APPSTATE.SETTINGS}
      >
        <AppSettings />
      </Paper>
      }
    </ReactCSSTransitionGroup>
  )
}