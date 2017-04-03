import React from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { Tabs, Tab } from "material-ui/Tabs";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import { setAppState, APPSTATE } from "../actions";
import IconButton from "material-ui/IconButton";
import ArrowUpward from "material-ui/svg-icons/navigation/arrow-upward";
import ArrowDownward from "material-ui/svg-icons/navigation/arrow-downward";
import Close from "material-ui/svg-icons/navigation/close";
import MoreVert from "material-ui/svg-icons/navigation/more-vert";

class AppSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      program: this.props.currentProgram
    }
  }

  handleSaveProgram = () => {
    this.props.closeSettings();
  }

  handleSaveGeneral = () => {
    this.props.closeSettings();
  }

  handleMoveUp = (idx) => {

  }

  handleMoveDown = (idx) => {

  }

  handleOpenOptions = (idx) => {

  }

  render() {
    return(
      <div>
        <Tabs>
          <Tab label="Program">
            <Table
              selectable={false}
            >
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>
                    Status
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Duration
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Task
                  </TableHeaderColumn>
                  <TableHeaderColumn>
                    Actions
                  </TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
              {this.state.program.map((step, idx) => 
                <TableRow
                  key={idx}
                >
                  <TableRowColumn>
                    {appStateToString(step.appState)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {step.time > 0 ? formatTime(step.time) : "---"}
                  </TableRowColumn>
                  <TableRowColumn>
                    { step.appState === APPSTATE.WORK ? "TBD" : "---"}
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      tooltip="Move Up"
                      onTouchTap={this.handleMoveUp(idx)}
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton
                      tooltip="Options"
                      onTouchTap={this.handleOpenOptions(idx)}
                    >
                      <MoreVert />
                    </IconButton>
                    <IconButton
                      tooltip="Move Down"
                      onTouchTap={this.handleMoveDown(idx)}
                    >
                      <ArrowDownward />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
              )}
              {this.state.program[this.state.program.length - 1].appState !== APPSTATE.DEFAULT &&
                <TableRow>
                  <TableRowColumn>
                    Repeat from the beginning
                  </TableRowColumn>
                  <TableRowColumn>
                    ---
                  </TableRowColumn>
                  <TableRowColumn>
                    ---
                  </TableRowColumn>
                </TableRow>
              }
              </TableBody>
            </Table>
            <RaisedButton
            label="Save and return"
            onTouchTap={this.handleSaveProgram}
            />   
          </Tab>
          <Tab label="General">
            <RaisedButton
            label="Save and return"
            onTouchTap={this.handleSaveGeneral}
            />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    closeSettings: () => dispatch(setAppState(APPSTATE.DEFAULT))
  }
}

function mapStateToProps(state) {
  return {
    currentProgram: state.program
  }
}

function appStateToString(state) {
  const stateStrings = {
    [APPSTATE.DEFAULT]: "Stop work",
    [APPSTATE.WORK]: "Work",
    [APPSTATE.REST]: "Short rest",
    [APPSTATE.BREAK]: "Take a break"
  }

  return state in stateStrings ? stateStrings[state] : `ERROR: state ${state} invalid`;
}

function formatTime(seconds) {
  const SECONDS_IN_HOUR = 3600; 
  const hoursPortion = Math.floor(seconds / SECONDS_IN_HOUR);
  const secondsLeftOver = seconds - (SECONDS_IN_HOUR * hoursPortion);
  const minutesPortion = Math.floor(secondsLeftOver / 60);
  const secondsPortion = seconds % 60;

  const returnString =
    (hoursPortion > 0 ? hoursPortion + ":" : "") +
    withLeadingZero(minutesPortion) + ":" +
    withLeadingZero(secondsPortion);

  return returnString;
}

function withLeadingZero(num) {
  return(
    (num >= 10 ? num : "0" + num).toString()
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings);