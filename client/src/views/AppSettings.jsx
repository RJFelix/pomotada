import React from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { Tabs, Tab } from "material-ui/Tabs";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import { setAppState, setProgram, APPSTATE } from "../actions";
import IconButton from "material-ui/IconButton";
import MoreVert from "material-ui/svg-icons/navigation/more-vert";
import Reorder from "material-ui/svg-icons/action/reorder";

import AddStepDialog from "../components/AddStepDialog";

import { SortableContainer, SortableElement, SortableHandle, arrayMove } from "react-sortable-hoc";

import formatTime from "../util/FormatTime";

const DragHandle = SortableHandle(() => <Reorder />);

const SortableProgramRow = SortableElement(({step, idx, handlers}) => {
  return(
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
          tooltip="Options"
          onTouchTap={() => handlers.handleOpenOptions(idx)}
        >
          <MoreVert />
        </IconButton> 
        <DragHandle /> 
      </TableRowColumn>
    </TableRow>
  )
});

const SortableProgramTable = SortableContainer(({program, handlers}) => {
  return(
    <Table selectable={false}>
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
        {program.map((step, idx) => 
          <SortableProgramRow
            key={idx}
            idx={idx}
            handlers={handlers}
            index={idx}
            step={step}
          />
        )}
      </TableBody>
    </Table>
  )
});



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

  onSortEnd = ({oldIndex, newIndex}) => {
    let newProgram = this.state.program;
    this.setState({
      program: arrayMove(newProgram, oldIndex, newIndex)
    });
  }

  render() {
    console.log(JSON.stringify(this.state.program));
    return(
      <div>
        <Tabs>
          <Tab label="Program">
            <div className="content">
              <SortableProgramTable
                program={this.state.program}
                handlers={{
                  handleMoveUp: this.handleMoveUp,
                  handleOpenOptions: this.handleOpenOptions,
                  handleMoveDown: this.handleMoveDown
                }}
                onSortEnd={this.onSortEnd}
                useDragHandle={true}
              />
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
            </div>   
          </Tab>
          <Tab label="General">
            <div className="content">
              <p>No more settings... yet.</p>
              <RaisedButton
              label="Save and return"
              onTouchTap={this.handleSaveGeneral}
              />
            </div>
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