import React from "react";
import { connect } from "react-redux";
import { ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import TodoListItemPopover from "./TodoListItemPopover";

import { toggleActiveTodo } from "../actions";

function TodoListItem(props) {
  let tempPomoCounter = " ";
  for(let i = 0; i < props.pomoCount; i++) {
    tempPomoCounter += "*";
  }
  return(
    <ListItem
      primaryText={props.text}
      style={{
        color: props.finished ? "lightgrey" : ""
      }}
      leftCheckbox={
        <Checkbox 
          onCheck={(evt, checked) => props.toggleActive(props.id)}
          checked={props.active}
          disabled={props.finished}
        />
      }
      rightIconButton={
        <TodoListItemPopover
          id={props.id}
          finished={props.finished}
        />
      }
    />
  )
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    toggleActive: (id) => dispatch(toggleActiveTodo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListItem);
