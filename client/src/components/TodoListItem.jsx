import React from "react";
import { ListItem } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import Reorder from "material-ui/svg-icons/action/reorder";
import TodoListItemPopover from "./TodoListItemPopover";
import PomoIcon from "./PomoIcon";
import { SortableElement, SortableHandle } from "react-sortable-hoc";

import "./TodoListItem.css";

const DragHandle = SortableHandle(() => <Reorder className="reorder tdl-reorder"/>);

const SortableTodoListItem = SortableElement(({todo, toggleActive}) => {
  let pomos = [];
  for(let i = 0; i < todo.pomoCount; i++) {
    pomos.push([<PomoIcon />]);
  }
  return(
    <ListItem   
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
      {todo.text}
      {pomos}
      <DragHandle />
    </ListItem>
  )
});

export default SortableTodoListItem;
