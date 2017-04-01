import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import { APPSTATE } from "./actions";

import Topper from "./components/Topper.jsx";
import AppDefault from "./views/AppDefault";
import AppWork from "./views/AppWork";
import AppRest from "./views/AppRest";
import AppBreak from "./views/AppBreak";


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Topper />
          { this.props.appState === APPSTATE.WORK &&
          <AppWork />
          }
          { this.props.appState === APPSTATE.DEFAULT &&
          <AppDefault />
          }
          { this.props.appState === APPSTATE.REST &&
          <AppRest />
          }
          { this.props.appState === APPSTATE.BREAK &&
          <AppBreak />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    appState: state.appState
  }
}

export default connect(mapStateToProps)(App);
