import { ListItem } from "material-ui/List";
import React from "react";

export default function TodoListItem(props) {
  return(
    <ListItem
      primaryText={props.text}
    />
  )
}