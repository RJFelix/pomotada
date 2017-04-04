import React from "react";
import Paper from "material-ui/Paper";
import { APPSTATE } from "../actions";
import AppDefault from "./AppDefault";
import AppWork from "./AppWork";
import AppRest from "./AppRest";
import AppBreak from "./AppBreak";
import AppSettings from "./AppSettings";

import "./AppState.css";

export default function AppState(props) {
  return(
    <Paper
     className="main-paper"
    >
      { props.state === APPSTATE.WORK &&
      <AppWork />
      }
      { props.state === APPSTATE.DEFAULT &&
      <AppDefault />
      }
      { props.state === APPSTATE.REST &&
      <AppRest />
      }
      { props.state === APPSTATE.BREAK &&
      <AppBreak />
      }
      { props.state === APPSTATE.SETTINGS &&
      <AppSettings />
      }
    </Paper>
  )
}