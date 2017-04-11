import React, { Component } from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Topper from "./components/Topper";
import LeftMenu from "./components/LeftMenu";
import AppState from "./views/AppState";

import Theme from "./themes/default";
import getMuiTheme from "material-ui/styles/getMuiTheme";

const appTheme = getMuiTheme(Theme);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      windowHeight: 0
    };
  }

  componentDidMount() {
    this.updateWindowHeight();
    window.addEventListener("resize", this.updateWindowHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowHeight);
  }

  updateWindowHeight = () => {
    this.setState({ windowHeight: window.innerHeight })
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={appTheme}>
        <div>
          <Topper />
          <LeftMenu
            windowHeight={this.state.windowHeight}
           />
          <AppState />  
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
