import React from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { Tabs, Tab } from "material-ui/Tabs";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import { setAppState, setProgram, APPSTATE } from "../actions";
import IconButton from "material-ui/IconButton";
import ArrowUpward from "material-ui/svg-icons/navigation/arrow-upward";
import ArrowDownward from "material-ui/svg-icons/navigation/arrow-downward";
import Close from "material-ui/svg-icons/navigation/close";
import MoreVert from "material-ui/svg-icons/navigation/more-vert";
import AddStepDialog from "../components/AddStepDialog";

import formatTime from "../util/FormatTime";

class AppSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      program: this.props.currentProgram,
      addStepDialogOpen: false
    }
  }

  handleSaveProgram = () => {
    this.props.saveProgram(this.state.program);
    this.props.closeSettings();
  }

  handleSaveGeneral = () => {
    this.props.closeSettings();
  }

  handleMoveUp = (idx) => {
    let newProgram = this.state.program.slice();
    const itemToMove = newProgram[idx];
    newProgram[idx] = newProgram[idx - 1];
    newProgram[idx - 1] = itemToMove;
    this.setState({
      program: newProgram
    });
  }

  handleMoveDown = (idx) => {
    let newProgram = this.state.program.slice();
    const itemToMove = newProgram[idx];
    newProgram[idx] = newProgram[idx + 1];
    newProgram[idx + 1] = itemToMove;
    this.setState({
      program: newProgram
    });
  }

  handleOpenOptions = (idx) => {

  }

  handleOpenAddStepDialog = () => {
    this.setState({
      addStepDialogOpen: true
    });
  }

  handleCloseAddStepDialog = () => {
    this.setState({
      addStepDialogOpen: false
    });
  }

  handleAddStepDialogSubmit = (step) => {
    this.setState({
      program: this.state.program.concat(new Array(step))
    });
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
                      onTouchTap={() => this.handleMoveUp(idx)}
                    >
                      <ArrowUpward />
                    </IconButton>
                    <IconButton
                      tooltip="Options"
                      onTouchTap={() => this.handleOpenOptions(idx)}
                    >
                      <MoreVert />
                    </IconButton> 
                    <IconButton
                      tooltip="Move Down"
                      onTouchTap={() => this.handleMoveDown(idx)}
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
              label="Add Step"
              onTouchTap={this.handleOpenAddStepDialog}
            />
            <AddStepDialog
              open={this.state.addStepDialogOpen}
              onRequestClose={this.handleCloseAddStepDialog}
              onAddStep={this.handleAddStepDialogSubmit}
            />
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
    closeSettings: () => dispatch(setAppState(APPSTATE.DEFAULT)),
    saveProgram: (program) => dispatch(setProgram(program))
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

export default connect(mapStateToProps, mapDispatchToProps)(AppSettings);