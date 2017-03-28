import React, { Component } from 'react';
import './App.css';
import Timer from "./components/Timer.jsx";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TodoList from "./components/TodoList.jsx";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Timer 
            initialTime={3610}  
          />
          <TodoList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
