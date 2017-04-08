import React from "react";
import { connect } from "react-redux";
import { ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import Reorder from "material-ui/svg-icons/action/reorder";
import TodoListItemPopover from "./TodoListItemPopover";

import { SortableElement, SortableHandle } from "react-sortable-hoc";

import { toggleActiveTodo } from "../actions";

import "./TodoListItem.css";

const DragHandle = SortableHandle(() => <Reorder className="reorder tdl-reorder"/>);

const SortableTodoListItem = SortableElement(({todo, toggleActive}) => {
  return(
    <ListItem
      primaryText={todo.text}
      style={{
        color: todo.finished ? "lightgrey" : ""
      }}
      leftCheckbox={
        <Checkbox 
          onCheck={(evt, checked) => toggleActive(todo.id)}
          checked={todo.active}
          disabled={todo.finished}
        />
      }
      rightIconButton={
          <TodoListItemPopover
            id={todo.id}
            finished={todo.finished}
          />
      }
    >
      <DragHandle />
    </ListItem>
  )
});

export default SortableTodoListItem;

/*function TodoListItem(props) {
  return(
    <SortableTodoListItem
      todo={props.todo}
      index={props.index}
      toggleActive={props.toggleActive}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    toggleActive: (id) => dispatch(toggleActiveTodo(id))
  }
}

export default connect(null, mapDispatchToProps)(TodoListItem);*/
