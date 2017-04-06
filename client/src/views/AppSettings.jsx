import React from "react";
import { connect } from "react-redux";
import FlatButton from "material-ui/RaisedButton";
import { Tabs, Tab } from "material-ui/Tabs";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import { setAppState, setProgram, APPSTATE } from "../actions";
import IconButton from "material-ui/IconButton";
import MoreVert from "material-ui/svg-icons/navigation/more-vert";
import Reorder from "material-ui/svg-icons/action/reorder";

import AddStepDialog from "../components/AddStepDialog";

import { SortableContainer, SortableElement, SortableHandle, arrayMove } from "react-sortable-hoc";

import formatTime from "../util/FormatTime";

import "./AppSettings.css";

const DragHandle = SortableHandle(() => <Reorder className="reorder"/>);

const SortableProgramRow = SortableElement(({step, idx, handlers, categories, todos}) => {

  // builds string in format [category]: [task]
  const taskText = () => {
    let categoryPortion, todoPortion;
    if((typeof step.todo !== typeof undefined)) {
      if(typeof step.todo === typeof 1) {
        const thisTodo = todos.find(todo => step.todo === todo.id);
        todoPortion = `${thisTodo.text}`;
        categoryPortion = `${categories.find(cat => cat.id === thisTodo.category).title}`;
      } else if(step.todo === APPSTATE.TASK.FIRST) {
        todoPortion = "First open task";
      } else if(step.todo === APPSTATE.TASK.RANDOM) {
        todoPortion = "Random task";
      } else if(step.todo === APPSTATE.TASK.SELECT) {
        todoPortion = "Select a task";
      }
    } else {
      todoPortion = "---";
    }
    if(!categoryPortion && (typeof step.category !== typeof undefined)) {
      if(typeof step.category === typeof 1) {
        categoryPortion = `${categories.find(cat => step.category === cat.id).title}`;
      } else if(step.category === APPSTATE.TASK.ANY) {
        categoryPortion = "Any category";
      } else if(step.category === APPSTATE.TASK.RANDOM) {
        categoryPortion = "Random category";
      }
    } else {
      categoryPortion = categoryPortion || "---";
    }
    return `${categoryPortion}: ${todoPortion}`;
  }
  console.log(`Step ${idx}: time is ${step.time}`);
  return(
    <TableRow
      key={idx}
    >
      <TableRowColumn>
        {appStateToString(step.appState)}
      </TableRowColumn>
      <TableRowColumn
        style={{
          width: "15%"
        }}
      >
        {step.time > 0 ? formatTime(step.time) : "---"}
      </TableRowColumn>
      <TableRowColumn
        style={{
          width: "50%"
        }}
      >
        { step.appState === APPSTATE.WORK ? taskText() : "---"}
      </TableRowColumn>
      <TableRowColumn
        style={{
          width: "15%",
          paddingLeft: "0"
        }}
      >
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

const SortableProgramTable = SortableContainer(({program, handlers, categories, todos}) => {
  return(
    <Table selectable={false}>
      <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            style={{
              width: "15%"
            }}
          >
            Duration
          </TableHeaderColumn>
          <TableHeaderColumn
            style={{
              width: "50%"
            }}
          >
            Task
          </TableHeaderColumn>
          <TableHeaderColumn
            style={{
              width: "15%"
            }}
          >
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
            categories={categories}
            todos={todos}
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
                categories={this.props.categories}
                todos={this.props.todos}
                onSortEnd={this.onSortEnd}
                useDragHandle={true}
              />
              <div
                style={{
                  paddingTop: "24px"
                }}
              >
                <FlatButton
                label="Save and return"
                onTouchTap={this.handleSaveProgram}
                primary={true}
                />
                <FlatButton
                  label="Add Step"
                  onTouchTap={this.handleOpenAddStepDialog}
                />
                <AddStepDialog
                  open={this.state.addStepDialogOpen}
                  onRequestClose={this.handleCloseAddStepDialog}
                  onAddStep={this.handleAddStepDialogSubmit}
                />                
              </div>
            </div>   
          </Tab>
          <Tab label="General">
            <div className="content">
              <p>No more settings... yet.</p>
              <FlatButton
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
    currentProgram: state.program,
    categories: state.categories,
    todos: state.todos
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