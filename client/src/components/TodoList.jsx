import { List } from "material-ui/List";
import TodoListItem from "./TodoListItem";
import { connect } from "react-redux";
import React from "react";

function TodoList(props) {
  return(
    <List>
      {props.todos.map(todo =>
        <TodoListItem
          key={todo.id}
          text={todo.text}
        />
      )}
    </List>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodoList);