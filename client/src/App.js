import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import { APPSTATE } from "./actions";

import Topper from "./components/Topper";
import LeftMenu from "./components/LeftMenu";
import AppState from "./views/AppState";


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Topper />
          <LeftMenu />
          <AppState
            state={this.props.appState}
          />  
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
