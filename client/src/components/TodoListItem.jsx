import { ListItem } from "material-ui/List";
import React from "react";
import CompleteTodo from "./CompleteTodo";
import RemoveTodo from "./RemoveTodo";

export default function TodoListItem(props) {
  let tempPomoCounter = " ";
  for(let i = 0; i < props.pomoCount; i++) {
    tempPomoCounter += "*";
  }
  return(
    <ListItem
      style={{
        color: props.finished ? "lightgrey" : "",
      }}
    >
      <span>
        <CompleteTodo
          id={props.id}
        />
        <RemoveTodo
          id={props.id}
        />
        {props.text + tempPomoCounter}    
      </span>
    </ListItem>
  )
}