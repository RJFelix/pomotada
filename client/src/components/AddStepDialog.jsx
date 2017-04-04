import React from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";

import DurationField from "./DurationField";
import { APPSTATE } from "../actions";

import "./AddStepDialog.css";

class AddStepDialog extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      open: this.props.open,
      typeDropdownValue: APPSTATE.WORK,
      durationValue: 0,
      categoryDropdownValue: 0,
      todoDropdownValue: 0
    }
    this.state = this.initialState;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open !== this.state.open) {
      this.setState({
        open: nextProps.open
      })
    }
  }

  handleRequestClose = () => {
    this.setState(this.initialState);
    this.props.onRequestClose();
  }

  handleSubmit = () => {
    this.props.onAddStep({
      appState: this.state.typeDropdownValue,
      time: this.state.durationValue,
      category: this.state.categoryDropdownValue,
      todo: this.state.todoDropdownValue
    });
    this.setState(this.initialState);
    this.props.onRequestClose();
  }

  handleTypeDropdownChange = (evt, key, val) => {
    this.setState({
      typeDropdownValue: val
    });
  }

  handleDurationChange = (evt, val) => {
    this.setState({
      durationValue: val
    });
  }

  handleCategoryDropdownChange = (evt, key, val) => {
    this.setState({
      categoryDropdownValue: val
    })
  }

  handleTodoDropdownChange = (evt, key, val) => {
    this.setState({
      todoDropdownValue: val
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
      />
    ];
    return(
      <Dialog
        open={this.state.open}
        title="Add Step"
        modal={false}
        actions={actions}
        onRequestClose={this.handleRequestClose}
      >
        <div
          className="dialog-row"
        >
          <div
           className="dialog-left-column"
          >
            <label
              className="dialog-label"
            >
              Type
            </label>
          </div>
          <DropDownMenu
            value={this.state.typeDropdownValue}
            onChange={this.handleTypeDropdownChange}
          >
            <MenuItem
              value={APPSTATE.WORK}
              primaryText="Work"
            />
            <MenuItem
              value={APPSTATE.REST}
              primaryText="Short rest"
            />
            <MenuItem
              value={APPSTATE.BREAK}
              primaryText="Long break"
            />
            <MenuItem
              value={APPSTATE.DEFAULT}
              primaryText="End program"
            />
          </DropDownMenu>
        </div>
        { this.state.typeDropdownValue !== APPSTATE.DEFAULT &&
        <div
          className="dialog-row"
        >
          <div
            className="dialog-left-column"
          >
            <label
              className="dialog-label"
              htmlFor="DurationField"
            >
              Duration
            </label>
          </div>
          <DurationField
            value={this.state.durationValue}
            onChange={this.handleDurationChange}
          />
        </div>
        }
        { this.state.typeDropdownValue === APPSTATE.WORK &&
        <div>
          <div
            className="dialog-row"
          >
            <div
              className="dialog-left-column"
            >
              <label
                className="dialog-label"
              >
                Category
              </label>
            </div>
            <DropDownMenu
              value={this.state.categoryDropdownValue}
              onChange={this.handleCategoryDropdownChange}
            >
              { this.props.categories.map((cat) =>
                <MenuItem
                  key={cat.id}
                  value={cat.id}
                  primaryText={cat.title}
                />
              )}
            </DropDownMenu>
          </div>
          <div
            className="dialog-row"
          >
            <div
             className="dialog-left-column"
            >
              <label
                className="dialog-label"
              >
                Task
              </label>
            </div>
            <DropDownMenu
              value={this.state.todoDropdownValue}
              onChange={this.handleTodoDropdownChange}
            >
              { this.props.todos.filter((todo) => (todo.category === this.state.categoryDropdownValue) && !todo.finished).map((todo) =>
                <MenuItem
                  key={todo.id}
                  value={todo.id}
                  primaryText={todo.text}
                />          
              )}
            </DropDownMenu>
          </div>
        </div>
        }       
      </Dialog>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    todos: state.todos
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStepDialog);